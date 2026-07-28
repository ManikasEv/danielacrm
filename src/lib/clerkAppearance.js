import { dark } from '@clerk/themes'

/** Embedded CRM sign-in — emerald, no sign-up */
export const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: '#10b981',
    colorBackground: '#131316',
    colorInputBackground: '#1c1c21',
    colorInputText: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: '#a1a1aa',
    colorNeutral: '#ffffff',
    colorDanger: '#f87171',
    borderRadius: '0.5rem',
  },
  elements: {
    rootBox: {
      width: '100%',
      maxWidth: '28rem',
      margin: '0 auto',
    },
    card: {
      backgroundColor: '#1a1a1f',
      boxShadow: 'none',
      border: '1px solid #2e2e35',
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
    },
    headerSubtitle: {
      color: '#a1a1aa',
    },
    formButtonPrimary: {
      backgroundColor: '#10b981',
      color: '#070a09',
      fontSize: '0.95rem',
      fontWeight: '600',
      textTransform: 'none',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#34d399',
      },
    },
    formFieldInput: {
      backgroundColor: '#1c1c21',
      borderColor: '#3f3f46',
    },
    // Hide every sign-up affordance
    footer: {
      display: 'none',
    },
    footerAction: {
      display: 'none',
    },
    footerActionText: {
      display: 'none',
    },
    footerActionLink: {
      display: 'none',
    },
    footerPages: {
      display: 'none',
    },
  },
  layout: {
    socialButtonsPlacement: 'bottom',
    showOptionalFields: false,
    privacyPageUrl: undefined,
    termsPageUrl: undefined,
  },
}

export const clerkLocalization = {
  signIn: {
    start: {
      title: 'Sign in to Daniela CRM',
      subtitle: 'Welcome back! Please sign in to continue',
      actionText: '',
      actionLink: '',
    },
  },
}
