import { jwtVerify } from "@kinde-oss/kinde-node-express";
import { kindeConfig } from "../../../../config";

const jwtVerifier = jwtVerify(kindeConfig.issuerBaseUrl, { audience: "" });
export { jwtVerifier };
