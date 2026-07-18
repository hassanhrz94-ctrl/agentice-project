"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    bio: "",
    phone: "",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app this would call a Server Action to update the DB.
    // For this demo we simply show a success state.
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-extrabold text-primary border-l-[8px] border-secondary pl-5 mb-8">
        <i className="fas fa-user-edit text-secondary mr-3" />
        My Profile
      </h1>

      {/* Avatar */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-secondary text-3xl font-bold shadow-custom">
          {form.name.charAt(0).toUpperCase() || "?"}
        </div>
        <div>
          <p className="font-bold text-primary text-lg">{form.name}</p>
          <p className="text-customGray-dark/60 text-sm">{form.email}</p>
          <span className="mt-1 inline-block text-xs bg-secondary/15 text-secondary font-semibold px-2.5 py-0.5 rounded-full">
            Member
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-custom p-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-primary block mb-1.5" htmlFor="profile-name">
            Full Name
          </label>
          <input
            id="profile-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-customGray-medium/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-primary block mb-1.5" htmlFor="profile-email">
            Email Address
          </label>
          <input
            id="profile-email"
            name="email"
            type="email"
            value={form.email}
            disabled
            className="w-full border border-customGray-medium/40 bg-customGray-light rounded-xl px-4 py-2.5 text-sm text-customGray-dark/50 cursor-not-allowed"
          />
          <p className="text-xs text-customGray-dark/40 mt-1">
            Email cannot be changed.
          </p>
        </div>
        <div>
          <label className="text-sm font-semibold text-primary block mb-1.5" htmlFor="profile-phone">
            Phone Number
          </label>
          <input
            id="profile-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            className="w-full border border-customGray-medium/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-primary block mb-1.5" htmlFor="profile-bio">
            Bio
          </label>
          <textarea
            id="profile-bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us about your football passion…"
            className="w-full border border-customGray-medium/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          id="profile-save"
          className={`w-full py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
            saved
              ? "bg-green-600 text-white"
              : "bg-primary text-white hover:bg-accent hover:scale-[1.02]"
          }`}
        >
          {saved ? (
            <>
              <i className="fas fa-check-circle" /> Saved!
            </>
          ) : (
            <>
              <i className="fas fa-save" /> Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}
