import { mailService } from "../../services";
import { NotifyViaEmailUseCase } from "./NotifyViaEmail";

const notifyViaEmailUseCase = new NotifyViaEmailUseCase(mailService);

export { notifyViaEmailUseCase };
