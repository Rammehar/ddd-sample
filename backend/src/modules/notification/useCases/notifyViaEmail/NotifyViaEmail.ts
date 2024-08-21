import { UseCase } from "../../../../shared/core/UseCase";
import { logger } from "../../../../shared/infra/Logger";
import { IMailService } from "../../services/mail";

interface Request {
  options: any;
}

export class NotifyViaEmailUseCase implements UseCase<Request, Promise<void>> {
  private mailService: IMailService;

  constructor(mailService: IMailService) {
    this.mailService = mailService;
  }

  async execute(req: Request): Promise<void> {
    try {
      await this.mailService.sendMail(req.options);
      logger.info("Mail send successfully");
    } catch (err) {
      logger.error(err);
    }
  }
}
