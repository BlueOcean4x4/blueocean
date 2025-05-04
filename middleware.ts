// Import from the correct location based on Clerk v4
import { authMiddleware } from "@clerk/nextjs/server"

export default authMiddleware({
  publicRoutes: ["/", "/schedule", "/accommodation", "/sponsors", "/api/trpc/(.*)", "/api/submit-booking", "/success"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
