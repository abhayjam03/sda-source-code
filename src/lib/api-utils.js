import { NextResponse } from 'next/server';

// Success response helper
export function successResponse(data, message = 'Success', status = 200) {
  return NextResponse.json({
    success: true,
    message,
    data
  }, { status });
}

// Error response helper
export function errorResponse(message, error = 'ERROR', status = 400) {
  return NextResponse.json({
    success: false,
    message,
    error
  }, { status });
}

// Validation error response
export function validationError(message) {
  return errorResponse(message, 'VALIDATION_ERROR', 400);
}

// Authentication error response
export function authError(message) {
  return errorResponse(message, 'AUTHENTICATION_ERROR', 401);
}

// Authorization error response
export function forbiddenError(message) {
  return errorResponse(message, 'FORBIDDEN', 403);
}

// Not found error response
export function notFoundError(message) {
  return errorResponse(message, 'NOT_FOUND', 404);
}

// Method not allowed error response
export function methodNotAllowedError() {
  return errorResponse('Method not allowed', 'METHOD_NOT_ALLOWED', 405);
}

// Internal server error response
export function internalServerError(message = 'Internal server error') {
  return errorResponse(message, 'INTERNAL_SERVER_ERROR', 500);
}

// Database error response
export function databaseError(message = 'Database operation failed') {
  return errorResponse(message, 'DATABASE_ERROR', 500);
}

// Rate limit error response
export function rateLimitError(message = 'Too many requests') {
  return errorResponse(message, 'RATE_LIMIT_EXCEEDED', 429);
} 