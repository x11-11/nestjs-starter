import { AppError } from './AppError';

export class RetryableError extends AppError {
  constructor(msg, name?, code?) {
    super(msg, name || 'RetryableError', code || 418, { retryable: true });
  }
}
