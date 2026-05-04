import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import { CommandPalette } from "@/components/CommandPalette";

import {Navbar} from "@/components/Navbar"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zimbabwe Statistical Sciences Association app",
  description: "The official professional body representing statisticians, data scientists, and quantitative researchers in Zimbabwe.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <CommandPalette />

        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}

