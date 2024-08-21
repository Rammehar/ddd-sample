import { AWS } from "../../../services/aws";

export interface IAWSS3Reader {
  readFileFromS3AsStream(objectKey: string): Promise<NodeJS.ReadableStream>;
  getPreSignedUrl(
    objectKey: string,
    expirationSeconds: number
  ): Promise<string>;
}

export class AWSS3Reader implements IAWSS3Reader {
  private s3: AWS.S3;

  private bucketName: string;

  constructor(bucketName: string) {
    this.s3 = new AWS.S3();
    this.bucketName = bucketName;
  }

  async readFileFromS3AsStream(
    objectKey: string
  ): Promise<NodeJS.ReadableStream> {
    const params = {
      Bucket: this.bucketName,
      Key: objectKey,
    };

    try {
      const file = this.s3.getObject(params).createReadStream();
      return file;
    } catch (error) {
      throw new Error(`Error reading file from S3: ${error.message}`);
    }
  }

  async getPreSignedUrl(
    objectKey: string,
    expirationSeconds: number
  ): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: objectKey,
      Expires: expirationSeconds,
    };

    try {
      const url = await this.s3.getSignedUrlPromise("getObject", params);
      return url;
    } catch (error) {
      throw new Error(`Error generating pre-signed URL: ${error.message}`);
    }
  }
}
