import { AppError } from './app-error';

export class InternalServerError extends AppError {
  constructor() {
    super("Internal Server Error", 500); // Pass message and status code
  }
}
