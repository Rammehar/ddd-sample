import { kindeConfig } from "./kindeConfig";

const isProduction = process.env.IS_PRODUCTION === "true";

const appConfig = {
  rolesList: {
    User: Number(process.env.USER_ROLE_VALUE),
    Admin: Number(process.env.ADMIN_ROLE_VALUE),
    Trainer: Number(process.env.TRAINER_ROLE_VALUE),
    Trainee: Number(process.env.TRAINEE_ROLE_VALUE),
    Employee: Number(process.env.EMP_ROLE_VALUE),
  },
  nodeMailerEmail: process.env.NODE_MAILER_EMAIL,
  nodeMailerPass: process.env.NODE_MAILER_EMAIL_PASS,
  fromMail: "no-reply@skillrisers.com",
  sendEmailBaseUrl: isProduction ? "https://skillrisers.com" : "http://localhost:3000",
  origin: isProduction
    ? ["https://skillrisers.com", "https://www.skillrisers.com"]
    : ["http://localhost:3000"],
};

const awsConfig = {
  awsPublicBucket: isProduction ? process.env.PUBLIC_BUCKET_NAME_PROD : process.env.DEV_BUCKET,
  awsPrivateBucket: isProduction ? process.env.PRIVATE_BUCKET_NAME_PROD : process.env.DEV_BUCKET,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
  sqsUrl: process.env.BULK_EMAIL_QUEUE_URL,
  assignmentSubmissionQueueUrl: isProduction
    ? process.env.ASSIGNMENT_SUBMISSION_QUEUE_URL
    : process.env.ASSIGNMENT_SUBMISSION_QUEUE_URL_DEV,
};

const authConfig = {
  secret: process.env.APP_SECRET,
  dbUrl: isProduction ? process.env.DB_URL_PROD : process.env.DB_URL_DEV,
  tokenExpiryTime: 2592000, // seconds
  refreshTokenExpiryTime: 2592000, // seconds 2592000 (720 hours)
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  issuer: isProduction ? "https://skillrisers.com" : "http://localhost:3000",
  redisServerPort: 6379,
  redisServerURL: "",
  redisConnectionString: "",
};

const vimeoConfig = {
  vimeoClientIdentifier: process.env.VIMEO_CLIENT_IDENTIFIER,
  vimeoClientSecret: process.env.VIMEO_CLIENT_SECRET,
  vimeoAccessToken: process.env.VIMEO_ACCESS_TOKEN,
};

const razorpayConfig = {
  keyId: isProduction ? process.env.KEY_ID : process.env.TEST_KEY_ID,
  keySecret: isProduction ? process.env.KEY_SECRET : process.env.TEST_KEY_SECRET,
  afterPaymentRedirectUrl: isProduction
    ? "https://skillrisers.com/home/my-courses"
    : "http://localhost:3000/home/my-courses",
  webhookSecret: process.env.WEBHOOK_SECRET,
};

export { authConfig, razorpayConfig, isProduction, appConfig, awsConfig, vimeoConfig, kindeConfig };
