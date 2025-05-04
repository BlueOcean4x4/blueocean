import { SignOutButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignOutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <h1 className="text-2xl font-bold mb-6">Sign Out</h1>
      <p className="mb-8 text-center max-w-md">Are you sure you want to sign out from your account?</p>
      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </div>
    </div>
  )
}
