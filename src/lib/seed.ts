import { db } from "./db";
import { category, product } from "./schema";
import { nanoid } from "nanoid";

export async function seedDatabase() {
  try {
    // Check if categories already exist
    const existingCategories = await db.select().from(category);
    if (existingCategories.length > 0) {
      console.log("Database already seeded");
      return;
    }

    // Create categories
    const categories = [
      {
        id: nanoid(),
        name: "AI Automation",
        slug: "ai-automation",
        description: "Cutting-edge AI-powered automation solutions to streamline your business operations",
        displayOrder: 1,
      },
      {
        id: nanoid(),
        name: "Hosting Solutions",
        slug: "hosting",
        description: "Reliable, scalable hosting packages for your web applications",
        displayOrder: 2,
      },
      {
        id: nanoid(),
        name: "Custom Automations",
        slug: "custom-automations",
        description: "Tailored automation solutions designed specifically for your business needs",
        displayOrder: 3,
      },
      {
        id: nanoid(),
        name: "Content Creation",
        slug: "content-creation",
        description: "AI-powered content generation and creative services",
        displayOrder: 4,
      },
    ];

    await db.insert(category).values(categories);
    console.log("Categories created");

    // Create sample products for AI Automation
    const aiCategory = categories[0];
    const aiProducts = [
      {
        id: nanoid(),
        categoryId: aiCategory.id,
        name: "AI Email Assistant",
        slug: "ai-email-assistant",
        shortDescription: "Automate email responses and inbox management with AI",
        fullDescription: "Our AI Email Assistant uses advanced natural language processing to automatically categorize, prioritize, and respond to emails. Save hours every week while maintaining professional communication with your clients and partners.",
        price: "299.00",
        featured: true,
        active: true,
        displayOrder: 1,
      },
      {
        id: nanoid(),
        categoryId: aiCategory.id,
        name: "Document Intelligence Suite",
        slug: "document-intelligence",
        shortDescription: "Extract insights from documents automatically with AI",
        fullDescription: "Transform your document processing with AI-powered extraction, classification, and analysis. Handle invoices, contracts, reports, and more with unprecedented speed and accuracy.",
        price: "499.00",
        featured: true,
        active: true,
        displayOrder: 2,
      },
      {
        id: nanoid(),
        categoryId: aiCategory.id,
        name: "Customer Service Bot",
        slug: "customer-service-bot",
        shortDescription: "24/7 AI-powered customer support automation",
        fullDescription: "Provide instant, accurate responses to customer inquiries around the clock. Our AI customer service bot learns from your knowledge base and continuously improves its responses.",
        price: "399.00",
        featured: false,
        active: true,
        displayOrder: 3,
      },
    ];

    // Create sample products for Hosting
    const hostingCategory = categories[1];
    const hostingProducts = [
      {
        id: nanoid(),
        categoryId: hostingCategory.id,
        name: "Professional Hosting",
        slug: "professional-hosting",
        shortDescription: "High-performance hosting for business websites",
        fullDescription: "Premium hosting with 99.9% uptime guarantee, SSL certificates, daily backups, and dedicated support. Perfect for business websites and applications that demand reliability.",
        price: "49.00",
        featured: true,
        active: true,
        displayOrder: 1,
      },
      {
        id: nanoid(),
        categoryId: hostingCategory.id,
        name: "Enterprise Cloud Hosting",
        slug: "enterprise-cloud-hosting",
        shortDescription: "Scalable cloud infrastructure for growing businesses",
        fullDescription: "Enterprise-grade cloud hosting with auto-scaling, load balancing, and advanced security features. Built for applications that need to handle variable traffic and scale on demand.",
        price: "199.00",
        featured: false,
        active: true,
        displayOrder: 2,
      },
    ];

    // Create sample products for Custom Automations
    const customCategory = categories[2];
    const customProducts = [
      {
        id: nanoid(),
        categoryId: customCategory.id,
        name: "Custom Workflow Automation",
        slug: "custom-workflow-automation",
        shortDescription: "Bespoke automation solutions for your unique processes",
        fullDescription: "We design and implement custom automation workflows tailored to your specific business processes. From data entry to complex multi-step operations, we'll automate it for you.",
        price: "1999.00",
        featured: true,
        active: true,
        displayOrder: 1,
      },
      {
        id: nanoid(),
        categoryId: customCategory.id,
        name: "API Integration Service",
        slug: "api-integration",
        shortDescription: "Connect your tools and automate data flow",
        fullDescription: "Seamlessly integrate your business tools and automate data synchronization. We handle complex API integrations so your systems work together effortlessly.",
        price: "999.00",
        featured: false,
        active: true,
        displayOrder: 2,
      },
    ];

    // Create sample products for Content Creation
    const contentCategory = categories[3];
    const contentProducts = [
      {
        id: nanoid(),
        categoryId: contentCategory.id,
        name: "AI Content Generator",
        slug: "ai-content-generator",
        shortDescription: "Create high-quality content at scale with AI",
        fullDescription: "Generate blog posts, social media content, product descriptions, and more with our AI-powered content creation tool. Maintain your brand voice while producing content 10x faster.",
        price: "149.00",
        featured: true,
        active: true,
        displayOrder: 1,
      },
      {
        id: nanoid(),
        categoryId: contentCategory.id,
        name: "Video Script Generator",
        slug: "video-script-generator",
        shortDescription: "AI-powered video script writing for any platform",
        fullDescription: "Create engaging video scripts for YouTube, TikTok, Instagram, and more. Our AI understands platform-specific best practices and generates scripts optimized for viewer engagement.",
        price: "199.00",
        featured: false,
        active: true,
        displayOrder: 2,
      },
    ];

    const allProducts = [...aiProducts, ...hostingProducts, ...customProducts, ...contentProducts];
    await db.insert(product).values(allProducts);
    console.log("Products created");

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
