import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.project.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        slug: "automated-invoice-processing",
        title: "Automated Invoice Processing Pipeline",
        client: "E-commerce Store",
        industry: "E-commerce",
        problem:
          "The client spent 3 hours every week manually creating, sending, and tracking invoices. The process was error-prone, caused payment delays, and took the owner away from core business activities. Late invoices were costing them thousands in delayed cash flow each month.",
        solution:
          "We built an end-to-end n8n workflow that automatically generates invoices from WooCommerce order data, sends them via Gmail, logs every entry in Google Sheets with real-time status tracking, and sends Slack alerts for invoices that go overdue beyond 14 days.",
        techStack: JSON.stringify([
          "n8n",
          "Gmail API",
          "Google Sheets",
          "Slack API",
          "WooCommerce",
        ]),
        deliverables: JSON.stringify([
          "Automated invoice generation from order data",
          "Email delivery pipeline with PDF attachments",
          "Google Sheets logging with status tracking",
          "Overdue payment Slack alert system",
          "Error monitoring and Slack notifications",
        ]),
        results:
          "Fully automated — 0 manual hours per week. Invoices now sent within 2 minutes of order completion. Zero missed invoices since launch. Cash flow improved by 23% in the first month due to faster invoice delivery.",
        featured: true,
        published: true,
      },
      {
        slug: "product-price-monitoring-scraper",
        title: "Product Price Monitoring Scraper",
        client: "Retail Business",
        industry: "Retail",
        problem:
          "Staff manually checked competitor websites daily to track prices on 200+ SKUs. This took 2 hours each morning, was never fully accurate, and created a lag of 24+ hours before pricing could be updated. The business was consistently losing sales due to being priced too high on fast-moving lines.",
        solution:
          "We built a Python + Playwright scraper that monitors 5 competitor websites every 4 hours across all 200+ SKUs, stores historical price data in PostgreSQL, and sends instant Slack alerts when a competitor drops below the client's price threshold — along with a suggested response price.",
        techStack: JSON.stringify([
          "Python",
          "Playwright",
          "PostgreSQL",
          "Slack API",
          "Docker",
        ]),
        deliverables: JSON.stringify([
          "Multi-site price scraper with anti-bot handling",
          "PostgreSQL historical price data warehouse",
          "Real-time price alert Slack system",
          "Suggested reprice calculator",
          "Weekly price trend summary report",
        ]),
        results:
          "Real-time competitive intelligence on 200 SKUs refreshed every 4 hours. Saved 2 hrs/day. In the first week, the client identified 3 repricing opportunities that directly recovered the full project cost.",
        featured: true,
        published: true,
      },
      {
        slug: "ai-customer-support-triage",
        title: "AI Customer Support Triage",
        client: "SaaS Company",
        industry: "SaaS",
        problem:
          "Support tickets arrived unrouted into a single shared inbox, causing senior engineers to handle basic billing questions while critical bugs sat unanswered. Average first response time was 8 hours, and the team had no visibility into ticket volume by category.",
        solution:
          "We built a Python + OpenAI pipeline that reads incoming support emails, classifies them by type (bug, billing, feature request, onboarding) and urgency (low/medium/high), routes them to the correct Slack channel with full context, and generates AI-drafted reply suggestions for the 5 most common ticket types.",
        techStack: JSON.stringify([
          "OpenAI API",
          "Python",
          "Slack API",
          "FastAPI",
          "n8n",
        ]),
        deliverables: JSON.stringify([
          "AI ticket classifier with type and urgency scoring",
          "Automated Slack channel routing system",
          "AI-drafted reply suggestions for common issues",
          "Priority escalation for critical bugs",
          "Weekly ticket analytics dashboard",
        ]),
        results:
          "60% faster first response time. Senior engineers completely freed from L1 support tickets. 40% of tickets now auto-resolved or auto-replied with AI drafts, requiring only one-click approval. Customer satisfaction score improved from 3.2 to 4.6 within 6 weeks.",
        featured: true,
        published: true,
      },
    ],
  });

  console.log("✓ 3 seed projects created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
