import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 py-8 md:py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-5 md:p-8 text-center">
          <div className="flex justify-center mb-4 md:mb-6">
            <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-green-500" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Booking Request Received!</h1>
          <p className="text-gray-600 mb-5 md:mb-6 text-sm md:text-base">
            Thank you for your booking request for the Blue Ocean 4x4 Beach & Bush Rally. We have received your
            information and will contact you shortly to confirm your booking and provide payment details.
          </p>
          <div className="space-y-3 md:space-y-4">
            <Link href="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 py-2 md:py-3 text-sm md:text-base">
                Return to Homepage
              </Button>
            </Link>
            <Link href="/schedule">
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-2 md:py-3 text-sm md:text-base"
              >
                View Event Schedule
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-lg md:text-xl font-bold">
                Blue Ocean 4x4 Rally
              </Link>
            </div>
            <div className="text-center md:text-right">
              <p className="mb-2 text-sm md:text-base">© 2025 Blue Ocean 4x4 Beach & Bush Rally</p>
              <p className="text-sm md:text-base">Inhambane, Mozambique</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
