/* eslint-disable no-unused-expressions */
import fs from "fs";
import request from "request";
import { Response, NextFunction } from "express";

import { authConfig, isProduction } from "../../../../config";

interface UploadCredentialsFromVDOCipher {
  clientPayload: {
    policy: string;
    key: string;
    uploadLink: string;
    "x-amz-signature": string;
    "x-amz-algorithm": string;
    "x-amz-credential": string;
  };
  videoId: string;
}

export class VdoCipherMiddleWare {
  private endRequest(status: any, message: string, res: any): any {
    return res.status(status).send({ message });
  }

  public async getUploadCredentials(
    filename: string
  ): Promise<UploadCredentialsFromVDOCipher> {
    return new Promise((resolve, reject) => {
      const options = {
        method: "PUT",
        url: "https://dev.vdocipher.com/api/videos",
        // qs: {
        //   title: filename,
        //   folderId: isProduction
        //     ? "dc2a61121e9a46d8ac5d3075ef203369"
        //     : "242c4684fe4242e3876aa65b3073203b", //   production and development folderid
        // },
        qs: {
          title: filename,
          folderId: isProduction
            ? "dc2a61121e9a46d8ac5d3075ef203369"
            : "f23fc8a034c34c61bb13c57404e489a3", //   production and development folderid
        },
        headers: {
          Authorization: `Apisecret ${authConfig.vdoCipherSecret}`,
        },
      };
      // eslint-disable-next-line func-names
      request(options, function (error, response, body) {
        // eslint-disable-next-line no-unused-expressions
        error ? reject(JSON.parse(error)) : resolve(JSON.parse(body));
      });
    });
  }

  private async uploadVideo(
    cred: UploadCredentialsFromVDOCipher,
    filename: string,
    tempPath: string,
    progressCB: any
  ) {
    return new Promise((resolve, reject) => {
      const options = {
        method: "POST",
        url: cred.clientPayload.uploadLink,
        headers: { "content-type": "multipart/form-data" },
        formData: {
          policy: cred.clientPayload.policy,
          key: cred.clientPayload.key,
          "x-amz-signature": cred.clientPayload["x-amz-signature"],
          "x-amz-algorithm": cred.clientPayload["x-amz-algorithm"],
          "x-amz-date": cred.clientPayload["x-amz-date"],
          "x-amz-credential": cred.clientPayload["x-amz-credential"],
          success_action_status: "201",
          success_action_redirect: "",
          file: {
            value: fs.createReadStream(tempPath).on("data", progressCB),
            options: {
              filename: filename,
              contentType: null,
            },
          },
        },
      };
      request(options, (error, response, body) => {
        error ? reject(error) : resolve(body);
      });
    });
  }

  public upload() {
    return async (req: any, res: Response, next: NextFunction) => {
      if (req.files) {
        const file = req.files.lectureVideo;
        let bytes = 0;
        const size = fs.lstatSync(file.tempFilePath)?.size;

        const progressCB = (chunk: string | Buffer) => {
          bytes += chunk.length;
          const percentage = ((bytes / size) * 100).toFixed(2);
        };
        // now try to upload
        try {
          const cred: UploadCredentialsFromVDOCipher =
            await this.getUploadCredentials(file.name);

          if (cred.clientPayload.uploadLink) {
            await this.uploadVideo(
              cred,
              file.name,
              file.tempFilePath,
              progressCB
            );
          } else {
            return this.endRequest(409, "Upload link not found.", res);
          }
          req.body.videoId = cred.videoId;
          req.body.title = file.name;
          req.body.status = "processing";
          req.body.assetType = "VDOCipherVideo";
          // after succeed in upload move to next for database update
          return next();
        } catch (err) {
          return this.endRequest(500, err, res);
        }
      }
      return this.endRequest(403, "File not found.", res);
    };
  }

  public async generateOTP(videoId: string, email: string) {
    return new Promise((resolve, reject) => {
      const options = {
        method: "POST",
        url: `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Apisecret ${authConfig.vdoCipherSecret}`,
        },
        body: {
          ttl: 1800,
          ipGeoRules: JSON.stringify([
            {
              action: "false",
              ipSet: [],
              countrySet: [],
            },
            {
              action: "true",
              ipSet: [],
              countrySet: ["IN"],
            },
          ]),
          annotate: JSON.stringify([
            {
              type: "rtext",
              text: `${email}`,
              alpha: "0.60",
              color: "0xFF0000",
              size: "15",
              interval: "5000",
            },
          ]),
        },
        json: true,
      };

      request(options, function (error, response, body) {
        error ? reject(error) : resolve(body);
      });
    });
  }

  public async getVideoUploadStatus(videoId: string) {
    return new Promise((resolve, reject) => {
      const options = {
        method: "GET",
        url: "https://dev.vdocipher.com/api/videos/videoId",
        headers: { Accept: "application/json" },
      };
      request(options, function (error, response, body) {
        if (error) {
          return reject(error);
        }
        return resolve(body);
      });
    });
  }

  public async deleteVideo(videoId: string) {
    return new Promise((resolve, reject) => {
      const options = {
        method: "DELETE",
        url: "https://dev.vdocipher.com/api/videos",
        //   qs: { title: fileName },
        qs: { videos: videoId },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Apisecret ${authConfig.vdoCipherSecret}`,
        },
      };
      request(options, function (error, response, body) {
        error ? reject(JSON.parse(error)) : resolve(JSON.parse(body));
      });
    });
  }
}
