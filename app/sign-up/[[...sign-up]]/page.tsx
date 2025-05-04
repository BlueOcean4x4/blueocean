import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] py-12">
      <SignUp />
    </div>
  )
}
