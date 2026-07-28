import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react'
import CrmShell from './layouts/CrmShell'
import SignInPage from './pages/SignInPage'
import OverviewPage from './pages/OverviewPage'
import TicketsPage from './pages/TicketsPage'
import ClientsPage from './pages/ClientsPage'
import BudgetPage from './pages/BudgetPage'
import SchedulePage from './pages/SchedulePage'
import BrainstormPage from './pages/BrainstormPage'
import ServicesPage from './pages/ServicesPage'

const pk = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function Protected({ children }) {
  return (
    <>
      <SignedIn>
        <CrmShell>{children}</CrmShell>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default function App() {
  if (!pk) {
    return (
      <div className="p-8 text-center text-red-300">
        Missing VITE_CLERK_PUBLISHABLE_KEY
      </div>
    )
  }

  return (
    <ClerkProvider publishableKey={pk}>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route
            path="/"
            element={
              <Protected>
                <OverviewPage />
              </Protected>
            }
          />
          <Route
            path="/tickets"
            element={
              <Protected>
                <TicketsPage />
              </Protected>
            }
          />
          <Route
            path="/clients"
            element={
              <Protected>
                <ClientsPage />
              </Protected>
            }
          />
          <Route
            path="/budget"
            element={
              <Protected>
                <BudgetPage />
              </Protected>
            }
          />
          <Route
            path="/schedule"
            element={
              <Protected>
                <SchedulePage />
              </Protected>
            }
          />
          <Route
            path="/brainstorm"
            element={
              <Protected>
                <BrainstormPage />
              </Protected>
            }
          />
          <Route
            path="/services"
            element={
              <Protected>
                <ServicesPage />
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  )
}
