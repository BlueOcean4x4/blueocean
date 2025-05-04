import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Mountain } from "lucide-react";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/components/providers/trpc-provider";
import { NavMenu } from "@/components/nav-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blue Ocean 4x4 Beach & Bush Rally",
  description:
    "Book your spot for the Blue Ocean 4x4 Beach & Bush Rally in Inhambane, Mozambique",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={inter.className}>
          <TRPCProvider>
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
              <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                      <Mountain className="h-8 w-8 text-blue-600" />
                      <span className="ml-2 text-xl font-bold text-blue-600">
                        Blue Ocean 4x4
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <NavMenu />
                  </div>
                </div>
              </div>
            </nav>
            {children}
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
