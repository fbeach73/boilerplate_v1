# Order Management System

## Overview
The order management system tracks purchases and provides users access to their purchase history and resources.

## Database Schema

### Tables

#### `order`
Stores purchase orders
- `id` - Unique identifier
- `userId` - Foreign key to user
- `totalAmount` - Total order amount (decimal)
- `status` - Order status: 'pending', 'completed', 'cancelled'
- Timestamps: `createdAt`, `updatedAt`

#### `orderItem`
Individual items within an order
- `id` - Unique identifier
- `orderId` - Foreign key to order
- `productId` - Foreign key to product
- `productName` - Stored product name (preserved if product deleted)
- `price` - Item price at time of purchase (decimal)
- `quantity` - Number of items
- Timestamp: `createdAt`

## API Endpoints

### GET `/api/orders`
Fetches all orders for the authenticated user
- Authentication: Required
- Returns: Array of orders with nested items
- Sorted by: createdAt (newest first)
- Error: 401 if not authenticated

## Pages

### Dashboard (`/dashboard`)
User dashboard showing purchase history and account info

**Sections:**
1. **Welcome Header** - Personalized greeting
2. **Quick Stats** - Three stat cards:
   - Total Purchases count
   - Total Spent lifetime value
   - Account Status and member since date
3. **Purchase History** - List of orders with:
   - Order ID and date/time
   - Status badge (completed/pending/cancelled)
   - Line items with quantities
   - Total amount
   - Action buttons (Download Resources, View Documentation)
4. **Account Information** - User profile details

**Empty State:**
- Shows when no purchases exist
- Encourages browsing services
- Direct link to services section

## Order States

### Status Values
- `pending` - Order initiated but not completed
- `completed` - Order successfully completed
- `cancelled` - Order was cancelled

### Status Badge Colors
- Completed: Primary (green/blue)
- Pending: Secondary (gray)
- Cancelled: Destructive (red)

## Protected Routes

The dashboard is protected and requires authentication:
- Redirects to sign-in if not authenticated
- Shows access required message
- Maintains intended destination after sign-in

## Resource Access

For completed orders, users can:
- Download associated files
- View documentation
- Access training materials
- Get product resources

Resources are linked to products via the `productResource` table.

## Usage Example

```typescript
// Fetch user orders
const [orders, setOrders] = useState([]);

useEffect(() => {
  if (session) {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }
}, [session]);
```

## Future Enhancements
- Order creation (checkout flow)
- Payment processing integration
- Order status updates
- Email receipts and notifications
- Invoice generation
- Refund processing
- Order filtering and search
