import { cookies } from "next/headers";
import { createHmac } from "crypto";

const SESSION_COOKIE = "ft_session";
const SECRET =
  process.env.SESSION_SECRET || "footythreads-secret-key-2024-do-not-use-in-prod";

function sign(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

function verify(token) {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const expectedSig = createHmac("sha256", SECRET)
      .update(data)
      .digest("base64url");
    if (sig !== expectedSig) return null;
    return JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

/** Create an HttpOnly session cookie with the user payload. */
export async function createSession(user) {
  const cookieStore = await cookies();
  const token = sign({ id: user.id, email: user.email, name: user.name });

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/** Delete the session cookie (logout). */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** Read and verify the session cookie. Returns null if not authenticated. */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verify(token);
}
