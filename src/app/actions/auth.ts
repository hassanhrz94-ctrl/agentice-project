"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/auth";
import { createUser, getUserByEmail } from "@/lib/users-store";
import { hashPassword, comparePassword } from "@/lib/password";

// ─── Signup ──────────────────────────────────────────────────────────────────
export async function signupAction(prevState, formData) {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  // Validate
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email address.";
  if (password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  else if (!/[a-zA-Z]/.test(password))
    errors.password = "Password must contain at least one letter.";
  else if (!/[0-9]/.test(password))
    errors.password = "Password must contain at least one number.";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match.";

  if (Object.keys(errors).length) return { errors };

  // Check duplicate
  const existing = getUserByEmail(email);
  if (existing)
    return { errors: { email: "An account with this email already exists." } };

  // Create user
  const hashedPassword = await hashPassword(password);
  const user = createUser({ name, email, hashedPassword });
  if (!user)
    return { errors: { email: "Failed to create account. Please try again." } };

  await createSession(user);
  redirect("/dashboard");
}

// ─── Login ───────────────────────────────────────────────────────────────────
export async function loginAction(prevState, formData) {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const errors: Record<string, string> = {};
  if (!email) errors.email = "Email is required.";
  if (!password) errors.password = "Password is required.";
  if (Object.keys(errors).length) return { errors };

  const user = getUserByEmail(email);
  if (!user)
    return { errors: { email: "No account found with this email address." } };

  const valid = await comparePassword(password, user.hashedPassword);
  if (!valid)
    return { errors: { password: "Incorrect password. Please try again." } };

  await createSession(user);
  redirect("/dashboard");
}

// ─── Logout ──────────────────────────────────────────────────────────────────
export async function logoutAction() {
  await deleteSession();
  redirect("/");
}
