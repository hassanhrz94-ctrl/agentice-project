"use client";

import { createContext, useContext, useState } from "react";
import { logoutAction } from "@/app/actions/auth";

const AuthContext = createContext(null);

/**
 * Wrap the app with this provider. Pass the initial user from the server
 * (read via getSession() in a Server Component layout).
 */
export function AuthProvider({ children, initialUser = null }) {
  const [user, setUser] = useState(initialUser);

  async function logout() {
    setUser(null);
    // logoutAction deletes the cookie and calls redirect('/') server-side.
    await logoutAction();
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth state from any client component.
 * Must be used inside <AuthProvider>.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>.");
  return ctx;
}
