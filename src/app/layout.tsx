import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Email Marketing Platform",
  description: "Создавайте красивые email-шаблоны и управляйте рассылками",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ru">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
