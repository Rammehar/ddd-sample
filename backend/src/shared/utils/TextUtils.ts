/* eslint-disable no-plusplus */
import validator from "validator";

import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import UniqueCodeGenerator from "voucher-code-generator";
import parser from "ua-parser-js";
import Cryptr from "cryptr";
import { escapeRegExp } from "lodash";

const { window } = new JSDOM("<!DOCTYPE html>");
const domPurify = DOMPurify(window);

const cryptr = new Cryptr(process.env.CRYPT_SECRET_KEY);

export class TextUtils {
  public static sanitize(unsafeText: string): string {
    return domPurify.sanitize(unsafeText);
  }

  public static validateWebURL(url: string): boolean {
    return validator.isURL(url);
  }

  public static searchSafeQuery(text: string) {
    return escapeRegExp(text);
  }

  public static validateEmailAddress(email: string) {
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public static createRandomNumericString(numberDigits: number): string {
    const chars = "0123456789";
    let value = "";

    for (let i = numberDigits; i > 0; --i) {
      value += chars[Math.round(Math.random() * (chars.length - 1))];
    }

    return value;
  }

  public static generateUniqueCode(): string {
    const uniqueCode = UniqueCodeGenerator.generate({
      length: 6,
      count: 1,
      charset: UniqueCodeGenerator.charset("alphabetic"),
    });

    return uniqueCode[0];
  }

  public static getUserAgent(req): any {
    const ua = parser(req.headers["user-agent"]);
    return ua;
  }

  public static encrypt(userId: string): string {
    const encryptedString = cryptr.encrypt(userId);
    return encryptedString;
  }

  public static decrypt(encryptedString: string): string {
    const decryptedString = cryptr.decrypt(encryptedString);
    return decryptedString;
  }
}
