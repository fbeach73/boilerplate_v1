"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: string;
  featured: boolean;
  isAuthenticated: boolean;
}

export function ProductCard({
  name,
  slug,
  shortDescription,
  price,
  featured,
  isAuthenticated,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          {featured && (
            <Badge variant="default" className="ml-2">
              Featured
            </Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2">
          {shortDescription || "Premium automation service"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {isAuthenticated ? (
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">${price}</div>
            <p className="text-sm text-muted-foreground">One-time purchase</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Sign in to view pricing
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/products/${slug}`}>Details</Link>
        </Button>
        {isAuthenticated && (
          <Button asChild className="flex-1">
            <Link href={`/products/${slug}?action=buy`}>Buy Now</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
