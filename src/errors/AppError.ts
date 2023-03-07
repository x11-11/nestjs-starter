// Require our core node modules.
import util from 'util';
// Export the factory function for the custom error object. The factory function lets
// the calling context create new AppError instances without calling the [new] keyword.
// I create the new instance of the AppError object, ensureing that it properly
// extends from the Error class.
export function createAppError(message, name, statusCode, details) {
  // NOTE: We are overriding the "implementationContext" so that the createAppError()
  // function is not part of the resulting stacktrace.
  return new AppError(message, name, statusCode, details, createAppError);
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I am the custom error object for the application. The settings is a hash of optional
// properties for the error instance:
// --
// * name: I am the name of error being thrown.
// * message: I am the reason the error is being thrown.
// * statusCode: I am a custom error code associated with this type of error.
// --
// The implementationContext argument is an optional argument that can be used to trim
// the generated stacktrace. If not provided, it defaults to AppError.
export class AppError extends Error {
  public isAppError: boolean;
  public retryable: boolean;
  public name: string;
  public message: string;
  public statusCode: number;
  public code: number;
  public details: any;
  public implementationContext: any;

  constructor(
    message: string,
    name?: string,
    statusCode?: number,
    details?: any,
    implementationContext?: any,
  ) {
    super(message || 'An error occurred.');
    // Each of the following properties can be optionally passed-in
    // as part of the Settings argument.
    this.name = name || 'AppError';
    this.message = message || 'An error occurred.';
    this.code = this.statusCode = statusCode || 500;

    // This is just a flag that will indicate if the error is a custom AppError. If this
    // is not an AppError, this property will be undefined, which is a Falsey.
    this.isAppError = true;

    this.details = details || {}; //extra meta

    this.retryable = this.details.retryable || false;
    // Capture the current stacktrace and store it in the property "this.stack". By
    // providing the implementationContext argument, we will remove the current
    // constructor (or the optional factory function) line-item from the stacktrace; this
    // is good because it will reduce the implementation noise in the stack property.
    // --
    // Read More: https://code.google.com/p/v8-wiki/wiki/JavaScriptStackTraceApi#Stack_trace_collection_for_custom_exceptions
    this.implementationContext = implementationContext;
    Error.captureStackTrace(this, this.implementationContext || AppError);
  }
}

util.inherits(AppError, Error);
