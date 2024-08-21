import { RequestOptions, Vimeo } from "vimeo";
import { Response, NextFunction } from "express";
import { vimeoConfig } from "../../../../config";
import { logger } from "../../Logger";

export class VimeoMiddleWare {
  private client: Vimeo;

  constructor() {
    this.client = new Vimeo(
      vimeoConfig.vimeoClientIdentifier,
      vimeoConfig.vimeoClientSecret,
      vimeoConfig.vimeoAccessToken
    );
  }

  private endRequest(status: any, message: string, res: any): any {
    return res.status(status).send({ message });
  }

  public async getUploadPresignedLink(size, name) {
    return new Promise((resolve, reject) => {
      const requestOptions: RequestOptions = {
        method: "POST",
        path: "/me/videos",
        query: {
          upload: {
            approach: "tus",
            size,
          },
          name: name,
        },
        headers: {
          Authorization: `bearer ${vimeoConfig.vimeoAccessToken}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      };
      this.client.request(
        requestOptions,
        (error, body, statusCode, headers) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
      );
    });
  }

  private uploadVideo(name: string, tempPath: string) {
    return new Promise((resolve, reject) => {
      this.client.upload(
        tempPath,
        {
          name,
        },
        (uri) => {
          resolve(uri);
        },
        (bytesUploaded, bytesTotal: any) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        },
        (err) => {
          logger.error(err);
          reject(err);
        }
      );
    });
  }

  public upload() {
    return async (req: any, res: Response, next: NextFunction) => {
      if (req.files) {
        const file = req.files.lectureVideo;

        const progressCB = (bytesUploaded: number, bytesTotal: number) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          // req.io.emit("progress", percentage);
        };

        // now try to upload
        try {
          const uri = await this.uploadVideo(file.name, file.tempFilePath);
          await this.setPrivacy(uri as string);
          const data: any = await this.getURI(uri as string);
          req.body.videoId = data.player_embed_url;
          req.body.vimeoUri = data.uri;
          req.body.vimeoPlayerEmbedUrl = data.player_embed_url;
          req.body.title = file.name;
          req.body.status = "processing";
          req.body.assetType = "VimeoVideo";
          // after succeed in upload move to next for database update
          return next();
        } catch (err) {
          logger.error(err);
          return this.endRequest(500, err, res);
        }
      }
      return this.endRequest(403, "File not found.", res);
    };
  }

  private setPrivacy(uri: string) {
    return new Promise((resolve, reject) => {
      this.client.request(
        {
          method: "PATCH",
          path: uri,
          query: {
            privacy: {
              view: "unlisted",
              embed: "public",
              download: false,
              add: false,
              comments: "nobody",
            },
            embed: {
              buttons: {
                like: false,
                watchlater: false,
                share: false,
              },
              logos: {
                vimeo: false,
              },
            },
          },
        },
        (error, body, statusCode, headers) => {
          logger.error(error);
          error ? reject(error) : resolve(body);
        }
      );
    });
  }

  public getURI(uri: string) {
    return new Promise((resolve, reject) => {
      this.client.request(uri, (error, body, statusCode, headers) => {
        logger.error(error);
        error ? reject(error) : resolve(body);
      });
    });
  }

  public deleteVideo(videoId: string) {
    return new Promise((resolve, reject) => {
      this.client.request(
        {
          method: "DELETE",
          path: `/videos/${videoId}`,
        },
        function (error, body, statusCode, headers) {
          if (error) {
            logger.error(error);
            reject(error);
          }

          resolve(body);
        }
      );
    });
  }

  public getUploadVideoLink(uri: string) {
    return new Promise((resolve, reject) => {
      this.client.request(
        `${uri}?fields=link`,
        function (error, body, statusCode, headers) {
          if (error) {
            logger.error(error);
            reject(error);
            return;
          }
          resolve(body);
        }
      );
    });
  }

  public checkTranscodeStatus(uri: string) {
    return new Promise((resolve, reject) => {
      this.client.request(
        `${uri}?fields=transcode.status`,
        function (error, body, statusCode, headers) {
          if (body.transcode.status === "complete") {
            resolve(body);
          } else if (body.transcode.status === "in_progress") {
            resolve(body);
          } else {
            logger.error(error);
            reject(error);
          }
        }
      );
    });
  }
}
