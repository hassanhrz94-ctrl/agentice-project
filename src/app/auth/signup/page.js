"use client";

import { useActionState } from "react";
import { signupAction } from "@/app/actions/auth";
import Link from "next/link";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signupAction, undefined);

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[28px] p-8 md:p-10 shadow-2xl">
        {/* Icon */}
        <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <i className="fas fa-user-plus text-secondary text-2xl" />
        </div>

        <h1 className="text-3xl font-extrabold text-white text-center mb-1">
          Create account
        </h1>
        <p className="text-white/50 text-sm text-center mb-8">
          Join FootyThreads and start shopping
        </p>

        <form action={action} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-white/70 text-sm font-medium block mb-1.5" htmlFor="signup-name">
              Full name
            </label>
            <div className="relative">
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className={`w-full bg-white/[0.08] border ${
                  state?.errors?.name
                    ? "border-accent/70 focus:border-accent"
                    : "border-white/15 focus:border-secondary"
                } text-white placeholder-white/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200`}
              />
            </div>
            {state?.errors?.name && (
              <p className="text-accent text-xs mt-1.5 flex items-center gap-1">
                <i className="fas fa-circle-exclamation" />
                {state.errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-white/70 text-sm font-medium block mb-1.5" htmlFor="signup-email">
              Email address
            </label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`w-full bg-white/[0.08] border ${
                  state?.errors?.email
                    ? "border-accent/70 focus:border-accent"
                    : "border-white/15 focus:border-secondary"
                } text-white placeholder-white/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200`}
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
            <label className="text-white/70 text-sm font-medium block mb-1.5" htmlFor="signup-password">
              Password
            </label>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Min. 8 chars with a number"
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

          {/* Confirm password */}
          <div>
            <label className="text-white/70 text-sm font-medium block mb-1.5" htmlFor="signup-confirm">
              Confirm password
            </label>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
              <input
                id="signup-confirm"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Re-enter password"
                className={`w-full bg-white/[0.08] border ${
                  state?.errors?.confirmPassword
                    ? "border-accent/70 focus:border-accent"
                    : "border-white/15 focus:border-secondary"
                } text-white placeholder-white/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200`}
              />
            </div>
            {state?.errors?.confirmPassword && (
              <p className="text-accent text-xs mt-1.5 flex items-center gap-1">
                <i className="fas fa-circle-exclamation" />
                {state.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="signup-submit"
            disabled={pending}
            className="w-full bg-secondary text-primary font-bold py-3.5 rounded-xl hover:bg-secondary-light transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2 mt-2 shadow-[0_8px_24px_rgba(217,164,4,0.3)]"
          >
            {pending ? (
              <>
                <i className="fas fa-spinner animate-spin" /> Creating account…
              </>
            ) : (
              <>
                <i className="fas fa-user-plus" /> Create Account
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

        {/* Login link */}
        <p className="text-center text-white/50 text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-secondary font-semibold hover:text-secondary-light transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
