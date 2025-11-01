# Freddybeach.com - AI Automation Services Platform

## Overview
This application is a complete transformation from an agentic coding boilerplate into a professional business website for Freddybeach.com, offering AI automation services, hosting solutions, and custom development services.

## Application Architecture

### Technology Stack
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** Better Auth with Google OAuth
- **Icons:** Lucide React

### Key Features
1. **Product Catalog** - Browse automation services organized by category
2. **Authentication-Gated Pricing** - Sign in to view prices and purchase
3. **User Dashboard** - Purchase history and resource access
4. **Responsive Design** - Mobile-first, works on all devices
5. **Dark Mode** - Built-in theme switching

## Application Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page with hero sections
│   ├── auth/
│   │   └── signin/page.tsx        # Sign-in page
│   ├── dashboard/page.tsx          # User dashboard
│   ├── products/
│   │   └── [slug]/page.tsx        # Product detail pages
│   └── api/
│       ├── categories/route.ts     # Category API
│       ├── products/route.ts       # Products API
│       ├── products/[slug]/route.ts # Single product API
│       ├── orders/route.ts         # Orders API
│       └── seed/route.ts           # Database seeding
├── components/
│   ├── product-card.tsx           # Product display component
│   ├── site-header.tsx            # Navigation header
│   ├── site-footer.tsx            # Footer
│   ├── auth/                      # Auth components
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── schema.ts                  # Database schema
│   ├── db.ts                      # Database connection
│   ├── seed.ts                    # Seed data
│   ├── auth.ts                    # Server-side auth
│   └── auth-client.ts             # Client-side auth
└── hooks/
    └── use-diagnostics.ts         # System diagnostics hook
```

## Database Schema

### Core Tables
- `user` - User accounts (from Better Auth)
- `session` - Active sessions (from Better Auth)
- `category` - Service categories
- `product` - Automation services/products
- `productResource` - Files and resources
- `order` - Purchase orders
- `orderItem` - Order line items

See individual feature documentation for detailed schema information.

## Page Routes

### Public Pages
- `/` - Home page with hero and services
- `/products/[slug]` - Individual product pages
- `/auth/signin` - Sign-in page

### Protected Pages
- `/dashboard` - User dashboard (requires auth)

### API Routes
- `/api/categories` - Fetch categories
- `/api/products` - Fetch all products
- `/api/products/[slug]` - Fetch single product
- `/api/orders` - Fetch user orders (requires auth)
- `/api/seed` - Seed database

## User Journey

### First-Time Visitor
1. Lands on home page
2. Sees hero section with value proposition
3. Views featured products (no pricing)
4. Browses services by category
5. Clicks on product for details
6. Sees "Sign in to view pricing" prompts
7. Clicks sign-in button
8. Authenticates with Google
9. Returns to site, now sees pricing
10. Can purchase products

### Authenticated User
1. Lands on home page
2. Sees all pricing information
3. Can click "Buy Now" on products
4. Views dashboard to see purchases
5. Accesses purchased resources
6. Downloads files and documentation

## Design System

### Colors
- Primary: Brand color (defined in Tailwind config)
- Muted: Secondary text and backgrounds
- Destructive: Errors and warnings
- Success: Completed states

### Components
- Cards: Recipe card style for products
- Badges: Featured tags, status indicators
- Buttons: Primary, secondary, outline variants
- Icons: Lucide React for consistent iconography

### Layout Patterns
- Hero sections: Large, gradient backgrounds
- Card grids: 1/2/3 column responsive layouts
- Sticky header: Fixed navigation on scroll
- Two-column layouts: Content + sidebar

## Getting Started

### Initial Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Copy `.env.local` with required variables
4. Run migrations: `npm run db:migrate`
5. Seed database: `curl http://localhost:3000/api/seed`
6. Start dev server: `npm run dev`

### Environment Variables
```env
# Database
POSTGRES_URL=<postgresql-connection-string>

# Authentication
BETTER_AUTH_SECRET=<random-string>
GOOGLE_CLIENT_ID=<google-oauth-id>
GOOGLE_CLIENT_SECRET=<google-oauth-secret>

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Feature Documentation

Detailed documentation for each feature:
- [Product Catalog System](./product-catalog.md)
- [Order Management](./order-management.md)
- [Authentication Flow](./authentication-flow.md)

## Development Workflow

### Adding New Products
1. Use `/api/seed` endpoint or add via database
2. Include category, name, slug, description, price
3. Set `active: true` and optionally `featured: true`
4. Products appear automatically on home page

### Modifying Categories
1. Update `category` table via seed or database
2. Assign appropriate icon in home page `getCategoryIcon`
3. Categories display in `displayOrder` sequence

### Customizing Styling
1. Edit Tailwind config for colors/themes
2. Modify shadcn/ui components in `components/ui`
3. Update page layouts in `app/` directory

## Deployment

### Build Process
```bash
npm run db:migrate  # Apply migrations
npm run build       # Build production bundle
npm start           # Start production server
```

### Environment
- Set production environment variables
- Configure database connection
- Update `NEXT_PUBLIC_APP_URL` to production URL
- Set up Google OAuth redirect URIs

## Future Enhancements

### Phase 1: Core Commerce
- [ ] Checkout flow implementation
- [ ] Payment processing (Stripe/Polar)
- [ ] Email confirmations
- [ ] Invoice generation

### Phase 2: Product Management
- [ ] Admin dashboard for managing products
- [ ] Image uploads
- [ ] Product variants and tiers
- [ ] Inventory tracking

### Phase 3: User Experience
- [ ] Product search and filtering
- [ ] Reviews and ratings
- [ ] Wishlist functionality
- [ ] Recommendation engine

### Phase 4: Marketing
- [ ] Blog/content section
- [ ] SEO optimization
- [ ] Email marketing integration
- [ ] Analytics and tracking

## Support

For issues or questions:
1. Check feature documentation
2. Review API endpoint documentation
3. Inspect database schema
4. Check application logs

## License

All rights reserved - Freddybeach.com
