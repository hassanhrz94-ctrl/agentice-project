/**
 * In-memory user store.
 * Resets on server restart — replace with a real DB for production.
 *
 * We store this on the `globalThis` object so that hot-reloads in dev
 * don't wipe the store between recompiles.
 */

if (!globalThis.__ft_users__) {
  globalThis.__ft_users__ = new Map();
}

const users = globalThis.__ft_users__;

/**
 * Create a new user. Returns null if the email is already taken.
 * @param {{ name: string, email: string, hashedPassword: string }} param0
 * @returns {{ id: string, name: string, email: string, hashedPassword: string, createdAt: string } | null}
 */
export function createUser({ name, email, hashedPassword }) {
  const key = email.toLowerCase();
  if (users.has(key)) return null;

  const user = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name,
    email: key,
    hashedPassword,
    createdAt: new Date().toISOString(),
    bio: "",
    phone: "",
    avatar: null,
  };
  users.set(key, user);
  return user;
}

/**
 * Find a user by email (case-insensitive).
 * @param {string} email
 */
export function getUserByEmail(email) {
  return users.get(email.toLowerCase()) ?? null;
}

/**
 * Find a user by id.
 * @param {string} id
 */
export function getUserById(id) {
  for (const user of users.values()) {
    if (user.id === id) return user;
  }
  return null;
}

/**
 * Update mutable profile fields for a user.
 * @param {string} id
 * @param {{ name?: string, bio?: string, phone?: string }} updates
 */
export function updateUser(id, updates) {
  const user = getUserById(id);
  if (!user) return null;
  const allowed = ["name", "bio", "phone", "avatar"];
  for (const key of allowed) {
    if (updates[key] !== undefined) user[key] = updates[key];
  }
  return user;
}
