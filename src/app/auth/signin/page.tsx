"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInButton } from "@/components/auth/sign-in-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if already signed in
    async function checkAuth() {
      const session = await authClient.getSession();
      if (session.data) {
        router.push("/dashboard");
      }
    }
    checkAuth();
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Freddybeach.com</h1>
          <p className="text-muted-foreground">
            Sign in to view pricing, purchase automation services, and access your dashboard
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Use your Google account to sign in securely
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignInButton />
            <div className="text-center text-sm text-muted-foreground">
              By signing in, you agree to our terms of service and privacy policy
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
