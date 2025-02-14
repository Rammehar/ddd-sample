import { logger } from "../infra/Logger";
import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        message: "An unexpected error occurred.",
        error: err,
      } as UseCaseError);
      logger.error(err);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
