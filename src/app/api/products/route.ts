import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { product } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const products = await db
      .select()
      .from(product)
      .where(eq(product.active, true))
      .orderBy(product.displayOrder);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
