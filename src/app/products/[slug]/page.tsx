"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  fullDescription: string | null;
  price: string;
  featured: boolean;
  categoryId: string;
}

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        // Check authentication
        const session = await authClient.getSession();
        setIsAuthenticated(!!session.data);

        // Fetch product
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-bold">{product.name}</h1>
                {product.featured && (
                  <Badge variant="default">Featured</Badge>
                )}
              </div>
              {product.shortDescription && (
                <p className="text-xl text-muted-foreground">
                  {product.shortDescription}
                </p>
              )}
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-4">About This Service</h2>
              {isAuthenticated ? (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {product.fullDescription || product.shortDescription}
                  </p>
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex items-center gap-3 p-6">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Sign in to view full details</p>
                      <p className="text-sm text-muted-foreground">
                        Access complete service descriptions and technical specifications
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {isAuthenticated && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">What&apos;s Included</h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Full implementation and setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Documentation and training materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>30 days of technical support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Future updates and improvements</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>One-time purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isAuthenticated ? (
                  <div>
                    <div className="text-4xl font-bold text-primary">
                      ${product.price}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      One-time payment
                    </p>
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex items-center gap-2 p-4">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Sign in to view pricing
                      </span>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Button className="w-full" size="lg">
                      Buy Now
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Secure checkout • Instant access
                    </p>
                  </>
                ) : (
                  <Button asChild className="w-full" size="lg">
                    <Link href="/auth/signin">Sign In to Purchase</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
