import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { product } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params;
    const { slug } = params;

    const [foundProduct] = await db
      .select()
      .from(product)
      .where(eq(product.slug, slug))
      .limit(1);

    if (!foundProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(foundProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
