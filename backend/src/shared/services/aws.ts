import AWS from "aws-sdk";
import { awsConfig } from "../../config";

AWS.config.update({
  region: awsConfig.region,
  accessKeyId: awsConfig.awsAccessKey,
  secretAccessKey: awsConfig.awsSecretAccessKey,
});

export { AWS };
