import { UserModel } from "../../../shared/infra/database/mongodb/models";
import { MongooseUserRepo } from "./implementations/mongooseUserRepo";

const userRepo = new MongooseUserRepo(UserModel);

export { userRepo };
