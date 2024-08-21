import { AWS } from "../../../services/aws";

export interface IAWSS3Deleter {
  deleteObjectFromS3(objectKey: string): Promise<void>;
}

export class AWSS3Deleter implements IAWSS3Deleter {
  private s3: AWS.S3;

  private bucketName: string;

  constructor(bucketName: string) {
    this.s3 = new AWS.S3();
    this.bucketName = bucketName;
  }

  async deleteObjectFromS3(objectKey: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: objectKey,
    };

    try {
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      throw new Error(`Error deleting object from S3: ${error.message}`);
    }
  }
}
