const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const dbUrl = process.env.DATABASE_URL;

const googleConfig = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
  redirectURI: process.env.REDIRECT_URI,
};

export { baseURL, dbUrl, googleConfig };
