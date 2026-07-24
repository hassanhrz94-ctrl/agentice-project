import "./globals.css";
import { getSession } from "@/lib/auth";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "FootyThreads · Premium Jersey Hub",
  description:
    "Premium football jerseys, retro and modern styles worn by legends.",
};

export default async function RootLayout({ children }) {
  // Read session server-side (async cookie — Next.js 16 compatible)
  const user = await getSession();

  return (
    <html lang="en" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-full flex flex-col bg-neutralBg text-[#1a2639]">
        <AuthProvider initialUser={user}>{children}</AuthProvider>
      </body>
    </html>
  );
}
