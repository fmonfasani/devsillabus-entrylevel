import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "DevSyllabus",
  description: "Private cohort portal for DevSyllabus",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">{children}</body>
    </html>
  );
}
