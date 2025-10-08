import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matt Carroll",
  description: "Co-founder and software engineer specializing in AI infrastructure, distributed systems, and E2E encryption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
