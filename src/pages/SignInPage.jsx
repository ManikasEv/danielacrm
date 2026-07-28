import { SignIn } from '@clerk/clerk-react'
import { clerkAppearance, clerkLocalization } from '../lib/clerkAppearance'

export default function SignInPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: '#131316' }}
    >
      <SignIn
        routing="path"
        path="/sign-in"
        fallbackRedirectUrl="/"
        signUpUrl={undefined}
        appearance={clerkAppearance}
        localization={clerkLocalization}
      />
    </div>
  )
}
