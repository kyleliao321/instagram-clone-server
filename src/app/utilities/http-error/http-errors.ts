class HttpError extends Error {
  protected status = 500;

  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  getStatus(): number {
    return this.status;
  }
}

class UnauthorizedError extends HttpError {
  static STATUS_CODE = 401;

  constructor(message?: string) {
    super(message);

    this.status = UnauthorizedError.STATUS_CODE;
  }
}

class ForbiddenError extends HttpError {
  static STATUS_CODE = 403;

  constructor(message?: string) {
    super(message);

    this.status = ForbiddenError.STATUS_CODE;
  }
}

class NotFoundError extends HttpError {
  static STATUS_CODE = 404;

  constructor(message?: string) {
    super(message);

    this.status = NotFoundError.STATUS_CODE;
  }
}

class NoContentError extends HttpError {
  static STATUS_CODE = 204;

  constructor(message?: string) {
    super(message);

    this.status = NoContentError.STATUS_CODE;
  }
}

class BadRequestError extends HttpError {
  static STATUS_CODE = 400;

  constructor(message?: string) {
    super(message);

    this.status = BadRequestError.STATUS_CODE;
  }
}

export {
  HttpError,
  UnauthorizedError,
  NoContentError,
  BadRequestError,
  ForbiddenError,
  NotFoundError
};
