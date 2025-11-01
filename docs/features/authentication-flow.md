# Authentication Flow

## Overview
The application uses Better Auth with Google OAuth for secure authentication. Authentication gates access to pricing, product details, and the dashboard.

## Authentication Provider

**Better Auth** - Modern authentication library for Next.js
- Secure session management
- Google OAuth integration
- Automatic session refresh
- Built-in security features

## Sign-In Flow

### Sign-In Page (`/auth/signin`)
Dedicated sign-in page with:
- Welcome message
- Google OAuth button
- Terms of service notice
- Back to home link

**Features:**
- Auto-redirects if already signed in
- Clean, card-based UI
- Mobile-responsive design

### Protected Routes

Routes that require authentication:
- `/dashboard` - User dashboard
- Purchase functionality - "Buy Now" buttons

### Authentication Gates

**Pricing Visibility:**
- Non-authenticated: Shows lock icon and "Sign in to view pricing"
- Authenticated: Shows actual price and purchase buttons

**Product Details:**
- Non-authenticated: Limited description, prompt to sign in
- Authenticated: Full description, features list, purchase options

**Dashboard Access:**
- Non-authenticated: Shows access required message with sign-in button
- Authenticated: Full dashboard with purchases and account info

## Components

### `SignInButton`
Google OAuth sign-in button
- Handled by Better Auth
- Redirects to Google OAuth flow
- Returns to application after authentication

### `UserProfile`
Displays user avatar and account menu
- Shows user name and email
- Sign out functionality
- Avatar with fallback initials

## Session Management

**Client-Side:**
```typescript
import { authClient } from "@/lib/auth-client";

// Check session
const session = await authClient.getSession();
const isAuthenticated = !!session.data;
```

**Server-Side:**
```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({
  headers: await headers(),
});
```

## Security Features

1. **OAuth Flow** - Secure Google authentication
2. **Session Tokens** - Encrypted session management
3. **CSRF Protection** - Built into Better Auth
4. **Secure Cookies** - HttpOnly, Secure flags
5. **Session Expiration** - Automatic timeout

## Navigation Behavior

**Header Navigation:**
- Logo - Always visible, links to home
- Services - Links to service sections
- Dashboard - Always visible, protected by page
- User Profile - Shows sign-in or user menu
- Theme Toggle - Dark/light mode

**Sticky Header:**
- Fixed position on scroll
- Backdrop blur effect
- Responsive design

## Configuration

**Environment Variables:**
```env
BETTER_AUTH_SECRET=<random-string>
GOOGLE_CLIENT_ID=<google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<google-oauth-secret>
NEXT_PUBLIC_APP_URL=<app-url>
```

**Google OAuth Setup:**
1. Create project in Google Cloud Console
2. Configure OAuth consent screen
3. Create OAuth 2.0 credentials
4. Add authorized redirect URI: `{APP_URL}/api/auth/callback/google`
5. Copy Client ID and Secret to `.env.local`

## User Experience

**First-Time Users:**
1. Browse services (no pricing visible)
2. Click "Sign In" or any purchase button
3. Redirect to `/auth/signin`
4. Click "Sign in with Google"
5. OAuth flow completes
6. Return to application (authenticated)
7. Now see pricing and can purchase

**Returning Users:**
- Automatic session restoration
- Immediate access to protected content
- Session persists across browser sessions

## Future Enhancements
- Email/password authentication option
- Multi-factor authentication
- Social login providers (GitHub, LinkedIn)
- Account linking
- Password reset flow
- Email verification
