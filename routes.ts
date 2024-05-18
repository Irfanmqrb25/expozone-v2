/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/email-verification",
  "/featured",
  /^\/[^\/]+\/[^\/]+$/, // for dynamic routes like /[storeName]/[productName]
  "/discover",
  "/products",
  "/visit",
  "/api/product",
  "/api/uploadthing",
  "/api/midtrans/webhooks",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/error",
  "/auth/forgot-password",
  "/auth/new-password",
];

/**
 * The prefix for API auth routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/featured";
