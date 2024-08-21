import rateLimit from "express-rate-limit";

const limitRequest = ({
  mins,
  maxLimit,
  message,
}: {
  mins: number;
  maxLimit: number;
  message: string;
}) => {
  return rateLimit({
    windowMs: mins * 60 * 1000,
    limit: maxLimit,
    keyGenerator(req: any, res) {
      if (req.decoded) {
        return req.decoded.userId;
      }
      return req.ip;
    },
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See 15 minutes).below.
    handler: (req, res, next, options) =>
      res.status(options.statusCode).send({ message: `${message}` }),
  });
};

export { limitRequest };
