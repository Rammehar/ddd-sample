/* eslint-disable no-new */

import { notifyViaEmailUseCase } from "../useCases/notifyViaEmail";
import { AfterUserCreated } from "./afterUserCreated";

new AfterUserCreated(notifyViaEmailUseCase);
