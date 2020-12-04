class HttpError {
  protected readonly message?: string;

  protected status: number;

  constructor(message?: string) {
    this.message = message;
  }

  getStatus(): number {
    return this.status;
  }

  toString(): string {
    const printedMessage = this.message ?? 'unknonw';
    return `HttpError.${this.constructor.name}: ${printedMessage}`;
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
  ForbiddenError
};
