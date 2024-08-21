import nodeMailer from "nodemailer";
import { appConfig, isProduction } from "../../../../config";
import { logger } from "../../../../shared/infra/Logger";

export interface IMailService {
  sendMail(options: any): Promise<void>;
}
export class MailService implements IMailService {
  transporter: any;

  constructor() {
    this.init();
  }

  private init() {
    this.transporter = nodeMailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: appConfig.nodeMailerEmail,
        pass: appConfig.nodeMailerPass,
      },
      logger: !isProduction,
    });
  }

  async sendMail(options: any): Promise<void> {
    // send mail with defined transport object
    // eslint-disable-next-line no-param-reassign
    options.headers = {
      "X-SES-CONFIGURATION-SET": "app-config-set",
    };
    try {
      const info = await this.transporter.sendMail(options);
      logger.info(info);
    } catch (err) {
      logger.error(err);
    }
  }
}
