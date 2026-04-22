import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Arya Bintana — Web Developer",
  description: "Portfolio Muhammad Arya Bintana, Full-Stack Web Developer Indonesia. ctrlweb.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
