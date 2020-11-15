class HttpError {
  protected readonly message?: string;

  protected status: number;

  constructor(message?: string) {
    this.message = message;
  }

  getStatus(): number {
    return this.status;
  }
}

class AuthenticationError extends HttpError {
  static STATUS_CODE = 401;

  constructor(message?: string) {
    super(message);

    this.status = 401;
  }
}

export { HttpError, AuthenticationError };
