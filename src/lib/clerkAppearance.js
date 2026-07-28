import { dark } from '@clerk/themes'

/** Matches Clerk’s hosted dark sign-in look */
export const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: '#6c47ff',
    colorBackground: '#212126',
    colorInputBackground: '#2a2a30',
    colorInputText: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: '#a1a1aa',
    colorNeutral: '#ffffff',
    borderRadius: '0.5rem',
  },
  elements: {
    rootBox: {
      width: '100%',
      maxWidth: '28rem',
      margin: '0 auto',
    },
    card: {
      backgroundColor: '#212126',
      boxShadow: 'none',
      border: '1px solid #3f3f46',
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
    },
    headerSubtitle: {
      color: '#a1a1aa',
    },
    formButtonPrimary: {
      backgroundColor: '#6c47ff',
      fontSize: '0.95rem',
      fontWeight: '600',
      textTransform: 'none',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#7c5cff',
      },
    },
    formFieldInput: {
      backgroundColor: '#2a2a30',
      borderColor: '#52525b',
    },
    footerAction: {
      display: 'none',
    },
    footerActionLink: {
      display: 'none',
    },
  },
  layout: {
    socialButtonsPlacement: 'bottom',
    showOptionalFields: false,
  },
}

export const clerkLocalization = {
  signIn: {
    start: {
      title: 'Sign in to Daniela CRM',
      subtitle: 'Welcome back! Please sign in to continue',
    },
  },
}
