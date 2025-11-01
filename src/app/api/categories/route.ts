import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { category } from "@/lib/schema";

export async function GET() {
  try {
    const categories = await db
      .select()
      .from(category)
      .orderBy(category.displayOrder);

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
