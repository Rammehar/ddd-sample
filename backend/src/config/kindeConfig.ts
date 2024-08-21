import { GrantType } from "@kinde-oss/kinde-node-express";

const kindeConfig = {
  clientId: process.env.KINDE_CLIENT_ID,
  issuerBaseUrl: process.env.KINDE_ISSUER_URL,
  siteUrl: process.env.KINDE_SITE_URL,
  secret: process.env.KINDE_CLIENT_SECRET,
  redirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
  scope: "openid profile email",
  grantType: GrantType.AUTHORIZATION_CODE, //or CLIENT_CREDENTIALS or PKCE
  unAuthorisedUrl: "http://localhost:3000/unauthorised",
  postLogoutRedirectUrl: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
};
export { kindeConfig };
