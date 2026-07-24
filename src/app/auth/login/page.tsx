"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[28px] p-8 md:p-10 shadow-2xl">
        {/* Icon */}
        <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <i className="fas fa-futbol text-secondary text-2xl" />
        </div>

        <h1 className="text-3xl font-extrabold text-white text-center mb-1">
          Welcome back
        </h1>
        <p className="text-white/50 text-sm text-center mb-8">
          Sign in to your FootyThreads account
        </p>

        {/* Server error message */}
        {state?.errors?.server && (
          <div className="bg-accent/20 border border-accent/40 text-accent text-sm rounded-xl p-3 mb-4 flex items-center gap-2">
            <i className="fas fa-exclamation-circle" />
            {state.errors.server}
          </div>
        )}

        <form action={action} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-white/70 text-sm font-medium block mb-1.5" htmlFor="login-email">
              Email address
            </label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`w-full bg-white/8 border ${
                  state?.errors?.email
                    ? "border-accent/70 focus:border-accent"
                    : "border-white/15 focus:border-secondary"
                } text-white placeholder-white/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200 bg-white/[0.08]`}
              />
            </div>
            {state?.errors?.email && (
              <p className="text-accent text-xs mt-1.5 flex items-center gap-1">
                <i className="fas fa-circle-exclamation" />
                {state.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-white/70 text-sm font-medium" htmlFor="login-password">
                Password
              </label>
            </div>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className={`w-full bg-white/[0.08] border ${
                  state?.errors?.password
                    ? "border-accent/70 focus:border-accent"
                    : "border-white/15 focus:border-secondary"
                } text-white placeholder-white/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200`}
              />
            </div>
            {state?.errors?.password && (
              <p className="text-accent text-xs mt-1.5 flex items-center gap-1">
                <i className="fas fa-circle-exclamation" />
                {state.errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="login-submit"
            disabled={pending}
            className="w-full bg-secondary text-primary font-bold py-3.5 rounded-xl hover:bg-secondary-light transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2 mt-2 shadow-[0_8px_24px_rgba(217,164,4,0.3)]"
          >
            {pending ? (
              <>
                <i className="fas fa-spinner animate-spin" /> Signing in…
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt" /> Sign In
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Signup link */}
        <p className="text-center text-white/50 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-secondary font-semibold hover:text-secondary-light transition-colors"
          >
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}
