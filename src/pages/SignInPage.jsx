import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.22em] text-emerald">
          Daniela Studio
        </p>
        <h1 className="mb-8 text-center font-display text-3xl font-extrabold tracking-tight">
          CRM login
        </h1>
        <p className="mb-6 text-center text-sm text-muted">
          Team access only — no public registration.
        </p>
        <div className="flex justify-center">
          <SignIn
            routing="path"
            path="/sign-in"
            fallbackRedirectUrl="/"
            appearance={{
              variables: {
                colorPrimary: '#10b981',
                colorBackground: '#0e1612',
                colorText: '#e8efe9',
                colorInputBackground: '#070a09',
                colorInputText: '#e8efe9',
                borderRadius: '0px',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
