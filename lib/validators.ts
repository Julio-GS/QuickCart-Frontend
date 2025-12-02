/**
 * Validates email format
 * @param email - Email to validate
 * @returns true if valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Object with validation result and error message
 */
export function validatePassword(password: string): {
  isValid: boolean;
  error?: string;
} {
  if (password.length < 8) {
    return {
      isValid: false,
      error: "La contraseña debe tener al menos 8 caracteres",
    };
  }

  return { isValid: true };
}

/**
 * Validates that two passwords match
 * @param password - First password
 * @param confirmPassword - Second password
 * @returns Object with validation result and error message
 */
export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): {
  isValid: boolean;
  error?: string;
} {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: "Las contraseñas no coinciden",
    };
  }

  return { isValid: true };
}

/**
 * Sanitizes user input by removing XSS attack vectors
 * Follows OWASP guidelines for input sanitization
 * @param input - Input to sanitize
 * @returns Sanitized input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove < and > to prevent script tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, ""); // Remove event handlers like onclick=
}

/**
 * Validates and sanitizes URL parameters
 * @param param - URL parameter to validate
 * @returns Sanitized parameter or null if invalid
 */
export function sanitizeUrlParam(param: string | null): string | null {
  if (!param) return null;

  // Remove non-alphanumeric characters except hyphens and underscores
  const sanitized = param.replace(/[^a-zA-Z0-9_-]/g, "");

  // Return null if sanitization removed all characters
  return sanitized.length > 0 ? sanitized : null;
}
