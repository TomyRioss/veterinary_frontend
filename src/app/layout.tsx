import { ReactNode } from 'react';

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import { routing } from '@/i18n/routing';

import './globals.css';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  const locale = routing.defaultLocale;
  return (
    <ClerkProvider>
      <html className="h-full" lang={locale}>
        <body>
          <SignedOut>
            <div>
              <p>You are not signed in. Please sign in to continue.</p>
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <header>
              <UserButton />
            </header>
            <main>{children}</main>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
