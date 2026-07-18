import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const KEYLEN = 64;

/**
 * Hash a plaintext password using scrypt + random salt.
 * @param {string} password
 * @returns {Promise<string>} `salt:derivedKey` (both hex-encoded)
 */
export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = /** @type {Buffer} */ (await scryptAsync(password, salt, KEYLEN));
  return `${salt}:${buf.toString("hex")}`;
}

/**
 * Compare a plaintext password against a stored hash.
 * Uses constant-time comparison to prevent timing attacks.
 * @param {string} password
 * @param {string} hash  — the value returned by hashPassword
 * @returns {Promise<boolean>}
 */
export async function comparePassword(password, hash) {
  const [salt, key] = hash.split(":");
  if (!salt || !key) return false;
  const keyBuffer = Buffer.from(key, "hex");
  const derived = /** @type {Buffer} */ (
    await scryptAsync(password, salt, KEYLEN)
  );
  return timingSafeEqual(keyBuffer, derived);
}
