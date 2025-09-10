import type { Metadata } from "next";
import { Poppins, Manrope } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import SidebarWrapper from "../app/components/SidebarWrapper";
import ChatbaseWidget from "../app/components/ChatbaseWidget";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Rizky | Portfolio",
    template: "%s | Rizky",
  },
  description: "Personal portfolio built with Next.js and TailwindCSS",
  icons: {
    icon: "/favicon/rizky.ico",               
    shortcut: "/favicon/favicon-32x32.png",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${manrope.variable}`}>
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <SidebarWrapper />
        <main className="pt-16">{children}</main>
        <ChatbaseWidget />
      </body>
    </html>
  );
}
