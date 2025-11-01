# Product Catalog System

## Overview
The product catalog system manages automation services and products offered by Freddybeach.com. Products are organized into categories with authentication-gated pricing and details.

## Database Schema

### Tables

#### `category`
Stores product categories (AI Automation, Hosting, Custom Automations, Content Creation)
- `id` - Unique identifier
- `name` - Category display name
- `slug` - URL-friendly identifier
- `description` - Category description
- `displayOrder` - Sort order for display
- Timestamps: `createdAt`, `updatedAt`

#### `product`
Stores individual automation services and products
- `id` - Unique identifier
- `categoryId` - Foreign key to category
- `name` - Product name
- `slug` - URL-friendly identifier
- `shortDescription` - Brief description for cards
- `fullDescription` - Detailed description (auth-gated)
- `price` - Product price (decimal)
- `imageUrl` - Optional product image
- `featured` - Boolean flag for featured products
- `active` - Boolean to show/hide products
- `displayOrder` - Sort order within category
- Timestamps: `createdAt`, `updatedAt`

#### `productResource`
Files and resources accessible after purchase
- `id` - Unique identifier
- `productId` - Foreign key to product
- `name` - Resource name
- `description` - Resource description
- `fileUrl` - URL to file/resource
- `resourceType` - Type: 'file', 'link', 'document', etc.
- Timestamps: `createdAt`, `updatedAt`

## API Endpoints

### GET `/api/products`
Fetches all active products
- Returns: Array of product objects
- Filters: Only active products
- Sorted by: displayOrder

### GET `/api/products/[slug]`
Fetches a single product by slug
- Params: `slug` (string)
- Returns: Single product object
- Error: 404 if not found

### GET `/api/categories`
Fetches all categories
- Returns: Array of category objects
- Sorted by: displayOrder

### GET `/api/seed`
Seeds database with initial categories and products
- Only runs if categories don't exist
- Creates 4 categories with sample products
- Returns: Success/error message

## Components

### `ProductCard`
Recipe card-style component for displaying products
- Props:
  - `id`, `name`, `slug` - Product identifiers
  - `shortDescription` - Brief description
  - `price` - Product price
  - `featured` - Boolean for featured badge
  - `isAuthenticated` - Controls pricing visibility
- Features:
  - Shows lock icon for non-authenticated users
  - Displays price for authenticated users
  - "Details" and "Buy Now" buttons
  - Featured badge for highlighted products

## Pages

### Home Page (`/`)
Multi-section hero-driven landing page:
1. **Hero Section** - Main value proposition
2. **Featured Products** - Top 3 featured services
3. **Category Sections** - Products grouped by category with icons
4. **CTA Section** - Sign-in call-to-action (unauthenticated only)

### Product Detail Page (`/products/[slug]`)
Detailed product information with two-column layout:
- **Left Column**: Product details, features, included items
- **Right Column**: Sticky pricing card with purchase button
- **Auth-gated Content**: Full description only visible when signed in
- **Features List**: What's included with purchase

## Authentication Gating

Pricing and detailed information are hidden from non-authenticated users:
- Product prices show lock icon until sign-in
- Full descriptions require authentication
- "Sign In to Purchase" buttons for non-authenticated users
- "Buy Now" buttons enabled for authenticated users

## Seeding Data

To seed the database with initial products:
```bash
curl http://localhost:3000/api/seed
```

Or visit the endpoint in your browser.

## Usage Example

```typescript
// Fetch products in a component
const [products, setProducts] = useState([]);

useEffect(() => {
  fetch('/api/products')
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);
```

## Future Enhancements
- Image upload for products
- Product search and filtering
- Product reviews and ratings
- Inventory management
- Product variants (tiers, add-ons)
