import { ReadStream } from "fs";
import * as nodeStream from "stream";
import { AWS } from "../../../services/aws";

type S3UploadStream = {
  writeStream: nodeStream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ServerFileUploads {
  export type File = {
    filename: string;
    mimetype: string;
    encoding: string;
    stream?: ReadStream;
  };

  export type UploadedFileResponse = {
    filename: string;
    mimetype: string;
    encoding: string;
    url: string;
    key?: string;
  };

  export interface IUploader {
    singleFileUploadResolver: (
      parent,
      { file }: { file: File },
      contentDisposition?: string
    ) => Promise<UploadedFileResponse>;
    multipleUploadsResolver: (
      parent,
      { files }: { files: File[] },
      contentDisposition?: string
    ) => Promise<UploadedFileResponse[]>;
  }
}

export class AWSS3Uploader implements ServerFileUploads.IUploader {
  private s3: AWS.S3;

  private bucketName: string;

  constructor(bucketName: string) {
    this.s3 = new AWS.S3();
    this.bucketName = bucketName;
  }

  private createUploadStream(
    key: string,
    contentType: string,
    contentDisposition = "inline"
  ): S3UploadStream {
    const pass = new nodeStream.PassThrough();
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: `${this.bucketName}`,
          Key: key,
          Body: pass,
          ContentDisposition: contentDisposition, // if you want to download rather than displaying then use attachment otherwise inline
          ContentType: contentType, // Set the Content-Type
        })
        .promise(),
    };
  }

  private createDestinationFilePath(
    fileName: string,
    mimetype: string,
    encoding: string
  ): string {
    return fileName;
  }

  async singleFileUploadResolver(
    parent,
    { file }: { file: ServerFileUploads.File },
    contentDisposition?: string
  ): Promise<ServerFileUploads.UploadedFileResponse> {
    try {
      const { stream, filename, mimetype, encoding } = file;
      const filePath = this.createDestinationFilePath(
        filename,
        mimetype,
        encoding
      );
      const uploadStream = this.createUploadStream(
        filePath,
        mimetype,
        contentDisposition
      );

      stream.pipe(uploadStream.writeStream);
      const result = await uploadStream.promise;
      return {
        filename,
        mimetype,
        encoding,
        url: result.Location,
        key: result.Key,
      };
    } catch (error) {
      throw new Error("Failed to upload file");
    }
  }

  async multipleUploadsResolver(
    parent,
    { files }: { files: ServerFileUploads.File[] },
    contentDisposition?: string
  ): Promise<ServerFileUploads.UploadedFileResponse[]> {
    try {
      return await Promise.all(
        files.map((f) =>
          this.singleFileUploadResolver(null, { file: f }, contentDisposition)
        )
      );
    } catch (error) {
      throw new Error("Failed to upload files");
    }
  }
}
