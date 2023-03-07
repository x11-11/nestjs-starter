/**
 * Common errors in lucy
 */

export * from './RetryableError';
export * from './AppError';

import { RetryableError } from './RetryableError';
import { AppError } from './AppError';
////////////////////
//retryable errors//
///////////////////
export class MalResultError extends RetryableError {
  constructor(msg) {
    super(msg, 'MalResultError');
  }
}
export class ServiceUnavailableError extends RetryableError {
  constructor(msg) {
    super(msg, 'ServiceUnavailableError', 503);
  }
}
export class GatewayTimeoutError extends RetryableError {
  constructor(msg) {
    super(msg, 'GatewayTimeoutError', 504);
  }
}
////////////////////////
//non-retryable errors//
///////////////////////
export class FatalError extends AppError {
  constructor(msg) {
    super(msg, 'FatalError', 5420);
  }
}

export class InvalidArgumentError extends AppError {
  constructor(msg) {
    super(msg, 'InvalidArgumentError', 400);
  }
}

export class ForBiddenError extends AppError {
  constructor(msg) {
    super(msg, 'ForBiddenError', 403);
  }
}
