import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Mountain } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blue Ocean 4x4 Beach & Bush Rally",
  description: "Book your spot for the Blue Ocean 4x4 Beach & Bush Rally in Inhambane, Mozambique",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Mountain className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-blue-600">Blue Ocean 4x4</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
                <Link href="/schedule" className="text-gray-700 hover:text-blue-600">
                  Schedule
                </Link>
                <Link href="/accommodation" className="text-gray-700 hover:text-blue-600">
                  Accommodation
                </Link>
                <Link href="/sponsors" className="text-gray-700 hover:text-blue-600">
                  Sponsors
                </Link>
                <Link href="/#booking" className="text-gray-700 hover:text-blue-600">
                  Book Now
                </Link>
              </div>
              <div className="md:hidden flex items-center">
                <MobileMenu />
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
