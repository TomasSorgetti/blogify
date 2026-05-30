/**
 * Wraps an async function to catch any errors and pass them to the next middleware.
 * In Express 5, this is technically redundant for route handlers, but it's still
 * useful for clarity and consistency across different Express versions or middleware types.
 * 
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - The wrapped function
 */
export const catchAsync = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsync;
