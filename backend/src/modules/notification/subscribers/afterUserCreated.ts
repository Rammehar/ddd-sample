import { appConfig } from "../../../config";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { logger } from "../../../shared/infra/Logger";
import { UserCreated } from "../../users/domain/events/userCreated";
import { User } from "../../users/domain/user";

import { NotifyViaEmailUseCase } from "../useCases/notifyViaEmail/NotifyViaEmail";

export class AfterUserCreated implements IHandle<UserCreated> {
  private notifyViaEmail: NotifyViaEmailUseCase;

  constructor(notifyViaEmail: NotifyViaEmailUseCase) {
    this.setupSubscriptions();
    this.notifyViaEmail = notifyViaEmail;
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreatedEvent.bind(this), UserCreated.name);
  }

  private craftEmailMessage(user: User, dateTime: Date): any {
    return {
      from: appConfig.fromMail,
      to: `${user.email.value}`,
      subject: "Account Creation",
      html: `<p>Hey Thank you for joining us</p>`,
    };
  }

  private async onUserCreatedEvent(event: UserCreated): Promise<void> {
    const { user, dateTimeOccurred } = event;

    try {
      await this.notifyViaEmail.execute({
        options: this.craftEmailMessage(user, dateTimeOccurred),
      });
      logger.info(
        "[AfterUserCreated]: Successfully executed NotifyViaEmailUseCase   AfterUserCreated"
      );
    } catch (err) {
      logger.error(
        "[AfterUserCreated]: Failed to execute NotifyViaEmailUseCase AfterUserCreated."
      );
    }
  }
}
