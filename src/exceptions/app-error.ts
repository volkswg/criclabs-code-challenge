export class AppError {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode: number) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
