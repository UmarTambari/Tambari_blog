import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

// Secret key for signing tokens - MUST be in .env.local
const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || "your-secret-key-change-this-in-production"
);

const SALT_ROUNDS = 10; // How secure the password hash is (higher = more secure but slower)

/**
 * Hash a password using bcrypt
 * Why? Never store plain passwords in database!
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plain password with a hashed password
 * Returns true if they match
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Create a JWT token (like a secure session ID)
 * Contains user info and expires in 7 days
 */
export async function createToken(payload: { userId: string; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Encryption algorithm
    .setExpirationTime("7d") // Token expires in 7 days
    .setIssuedAt() // When token was created
    .sign(SECRET_KEY);
}

/**
 * Verify and decode a JWT token
 * Returns the payload if valid, null if invalid/expired
 */
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { userId: string; email: string };
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      console.error("Token expired");
      throw new Error("TokenExpiredError");
    } else if (error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED") {
      console.error("Invalid token signature");
      throw new Error("InvalidSignatureError");
    } else {
      console.error("Token verification failed:", error.message);
      throw new Error("TokenVerificationError");
    }
  }
}

/**
 * Get the current session from cookies
 * This reads the JWT token stored in the browser
 */
export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token) return null;

    return await verifyToken(token);
  } catch (error: any) {
    if (error.message === "TokenExpiredError") {
      console.warn("Session token expired. Consider refreshing.");
      return null;
    }
    console.error("Error getting session:", error.message);
    return null;
  }
}

/**
 * Set session cookie (log user in)
 */
export async function setSession(userId: string, email: string) {
  const token = await createToken({ userId, email });
  const cookieStore = await cookies();
  
  cookieStore.set("admin_session", token, {
    httpOnly: true, // Can't be accessed by JavaScript (security!)
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "lax", // CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: "/", // Available on all pages
  });
}

/**
 * Clear session cookie (log user out)
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}