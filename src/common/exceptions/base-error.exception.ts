export class BaseErrorException extends Error {
  public readonly name: string;

  public readonly isOperational: boolean;

  constructor(name: string, description: string, isOperational: boolean) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;

    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }

  public static isTrustedError(error: unknown): boolean {
    if (error instanceof BaseErrorException) {
      return error.isOperational;
    }

    return false;
  }
}
