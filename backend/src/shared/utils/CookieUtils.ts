import { Response } from "express";
import { isProduction } from "../../config";
import { JWTToken, RefreshToken } from "../../modules/users/domain/jwt";

type TokenType = "access-token" | "refresh-token";

export class CookiesUtils {
  public static accessTokenName = "accessToken";

  public static refreshTokenName = "refreshToken";

  private static getTokenName(tokenType: TokenType): string {
    return tokenType === "access-token"
      ? CookiesUtils.accessTokenName
      : CookiesUtils.refreshTokenName;
  }

  public static setTokenInCookie(
    res: Response,
    tokenType: TokenType,
    token: JWTToken | RefreshToken
  ): void {
    const tokenName = this.getTokenName(tokenType);
    res.cookie(tokenName, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "none",
      domain: isProduction ? "skillrisers.com" : null,
      path: "/",
    });
  }

  public static clearTokenFromCookie(
    res: Response,
    tokenType: TokenType
  ): void {
    const tokenName = this.getTokenName(tokenType);
    res.clearCookie(tokenName, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "none",
      domain: isProduction ? "skillrisers.com" : null,
      path: "/",
    });
  }
}
