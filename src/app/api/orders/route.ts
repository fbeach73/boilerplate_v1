import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { order, orderItem } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Fetch orders with their items
    const userOrders = await db
      .select()
      .from(order)
      .where(eq(order.userId, userId))
      .orderBy(order.createdAt);

    // Fetch order items for all orders
    const ordersWithItems = await Promise.all(
      userOrders.map(async (o) => {
        const items = await db
          .select()
          .from(orderItem)
          .where(eq(orderItem.orderId, o.id));

        return {
          ...o,
          items,
        };
      })
    );

    return NextResponse.json(ordersWithItems);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
