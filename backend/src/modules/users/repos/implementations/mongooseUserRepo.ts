import { logger } from "../../../../shared/infra/Logger";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";
import { UserName } from "../../domain/userName";
import { UserMap } from "../../mappers/userMap";
import { IUserRepo } from "../userRepo";

export class MongooseUserRepo implements IUserRepo {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const user = await this.model
      .findOne({
        username:
          userName instanceof UserName ? (<UserName>userName).value : userName,
        is_deleted: false,
      })
      .lean();
    if (!!user === false) throw new Error("User not found.");
    return UserMap.toDomain(user);
  }

  public async getUserByEmail(email: UserEmail): Promise<User> {
    const user = await this.model
      .findOne({
        email: email.value.toString(),
        is_deleted: false,
      })
      .lean();
    if (!!user === false) throw new Error("User not found.");
    return UserMap.toDomain(user);
  }

  public async exists(userEmail: UserEmail): Promise<boolean> {
    const user = await this.model.findOne({
      email: userEmail.value,
      is_deleted: false,
    });
    return !!user === true;
  }

  public async getUserByUserId(userId: string): Promise<User> {
    const user = await this.model.findOne({ uuid: userId }).lean();
    if (!!user === false) throw new Error("User not found.");
    return UserMap.toDomain(user);
  }

  public async save(user: User): Promise<void> {
    const exists = await this.exists(user.email);
    const rawUser = await UserMap.toPersistence(user);
    try {
      if (!exists) {
        await this.model.create(rawUser);
      } else {
        await this.model.findOneAndUpdate(
          { user_id: user.userId.getStringValue() },
          rawUser
        );
      }
    } catch (err) {
      logger.error(err);
    }
  }
}
