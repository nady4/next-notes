import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NoteProvider } from "@/context/NoteContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Notes App",
  description: "A simple notes app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NoteProvider>{children}</NoteProvider>
      </body>
    </html>
  );
}
