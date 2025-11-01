"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Sparkles, Server, Wrench, Pencil, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: string;
  featured: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Check authentication
        const session = await authClient.getSession();
        setIsAuthenticated(!!session.data);

        // Fetch products and categories
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "ai-automation":
        return <Sparkles className="h-8 w-8" />;
      case "hosting":
        return <Server className="h-8 w-8" />;
      case "custom-automations":
        return <Wrench className="h-8 w-8" />;
      case "content-creation":
        return <Pencil className="h-8 w-8" />;
      default:
        return <Sparkles className="h-8 w-8" />;
    }
  };

  const getProductsByCategory = (categoryId: string) => {
    return products.filter((p) => p.categoryId === categoryId);
  };

  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

  if (loading) {
    return (
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform Your Business with{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                AI Automation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Fredericton New Brunswick&apos;s Premium Automation and AI Services Provider
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline your operations, reduce costs, and scale your business with our cutting-edge
              automation solutions and professional services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              {!isAuthenticated && (
                <Button asChild size="lg" className="text-lg">
                  <Link href="/auth/signin">
                    Sign In to View Pricing <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="#services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Solutions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our most popular automation services designed to deliver immediate value
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services by Category */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4 space-y-20">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.id);
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.id} className="space-y-8">
                <div className="text-center max-w-3xl mx-auto">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10 text-primary">
                      {getCategoryIcon(category.slug)}
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {category.name}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      isAuthenticated={isAuthenticated}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Automate Your Business?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Sign in to view detailed pricing, access exclusive resources, and start transforming
              your business with AI automation today.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link href="/auth/signin">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}
