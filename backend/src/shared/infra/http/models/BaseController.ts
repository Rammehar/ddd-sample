import * as express from "express";

export abstract class BaseController {
  protected abstract executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<void | any>;

  public async execute(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      this.fail(res, "An unexpected error occurred");
    }
  }

  public static jsonResponse(
    res: express.Response,
    code: number,
    message: string
  ) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: express.Response, dto?: T) {
    if (dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    }
    return res.sendStatus(200);
  }

  public redirect(res: express.Response, path: string) {
    res.redirect(path);
  }

  public sse<T>(res: express.Response, dto?: T) {
    if (dto) {
      res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      });

      res.write("event: message\n");
      res.write(`data: ${JSON.stringify(dto)}`);
      res.write("\n\n");
      res.flush();
      // return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message || "Unauthorized");
  }

  public unauthorized(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message || "Unauthorized");
  }

  public paymentRequired(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message || "Payment required");
  }

  public forbidden(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message || "Forbidden");
  }

  public notFound(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message || "Not found");
  }

  public conflict(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message || "Conflict");
  }

  public tooMany(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      429,
      message || "Too many requests"
    );
  }

  public todo(res: express.Response) {
    return BaseController.jsonResponse(res, 400, "TODO");
  }

  public unProcessable(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      422,
      message || "Unprocessed missing something!"
    );
  }

  public fail(res: express.Response, error: Error | string) {
    return res.status(500).json({
      message: error.toString(),
    });
  }
}
