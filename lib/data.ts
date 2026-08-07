import { Service, PortfolioItem, LegalPage, ConditionalField } from "./types";

export const WHATSAPP_NUMBER = "923342813055"; // +92 334 2813055 — official number, do not change
export const BUSINESS_EMAIL = "hk4878342@gmail.com"; // official business email — do not change

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
export function mailLink(subject?: string) {
  return `mailto:${BUSINESS_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

export const brand = {
  name: "Asiya AI Studio",
  tagline: "Turn Your Ideas Into Professional Digital Work With AI.",
  subtext:
    "Asiya AI Studio helps businesses, entrepreneurs, startups, creators, students, freelancers, educators and coaches transform ideas into professional content, visuals, videos and AI-powered digital solutions — built with AI, refined by hand.",
  email: BUSINESS_EMAIL,
  whatsapp: "+92 334 2813055",
  // Real social URLs go here once accounts exist. Never fill with placeholder/fake links.
  instagram: null as string | null,
  linkedin: null as string | null,
  facebook: null as string | null,
};

export const services: Service[] = [
  {
    slug: "ai-content",
    name: "AI Content Creation",
    shortName: "Content Creation",
    icon: "pen",
    tagline: "Website copy, blogs and product descriptions that sound like you, not like a robot.",
    intro:
      "Every business starts with words — the ones on your homepage, your product pages, your about section. We use AI to move fast through research and first drafts, then rewrite by hand for tone, clarity and accuracy, so what you publish sounds like a real person who understands your business, not a generic AI paragraph.",
    whoFor: [
      "Startups that need a website full of copy before launch",
      "Small businesses replacing outdated or unclear website text",
      "E-commerce stores that need product descriptions at scale",
      "Founders who know their business but don't have time to write",
    ],
    benefits: [
      "Copy written around your actual product, not filled with filler",
      "Consistent tone across every page",
      "Faster turnaround than a traditional copywriter",
      "Built-in clarity check — no jargon, no empty claims",
    ],
    whatsIncluded: [
      "Discovery questions to understand your business and audience",
      "AI-assisted first draft, human-edited second pass",
      "Plain-language copy free of buzzwords",
      "Delivered in an editable document, ready to paste into your site",
    ],
    process: [
      "You share your business details and the pages you need written",
      "We draft the structure and headlines for your approval",
      "Full copy is written and internally reviewed for tone and clarity",
      "You receive the draft and request any changes",
      "Final copy is delivered, formatted and ready to publish",
    ],
    sampleWork:
      "Sample: a 5-page website rewrite for a fictional local bakery — home, about, menu, ordering and contact copy, rewritten from a bare product list into a full brand voice.",
    startingPkr: "3,000",
    startingUsd: "20",
    deliveryEstimate: "2–7 days",
    packages: [
      {
        name: "Starter",
        bestFor: "A single page or a short blog post",
        priceLabel: "Starting at",
        pkr: "PKR 3,000 – 5,000",
        usd: "$20 – 35",
        delivery: "2–3 days",
        revisions: "1 revision",
        features: [
          "Up to 1,000 words",
          "1–3 pages of website copy or 1 blog post",
          "Tone-matched to your brand",
          "Editable document delivery",
        ],
      },
      {
        name: "Standard",
        bestFor: "A small business getting its full site written",
        priceLabel: "Starting at",
        pkr: "PKR 8,000 – 12,000",
        usd: "$50 – 80",
        delivery: "4–5 days",
        revisions: "2 revisions",
        features: [
          "Up to 2,500 words",
          "Up to 5 pages of website copy",
          "Core SEO keywords included",
          "Headline + subheadline options",
        ],
      },
      {
        name: "Premium",
        bestFor: "A full website launch or relaunch",
        priceLabel: "Starting at",
        pkr: "PKR 18,000 – 25,000",
        usd: "$120 – 180",
        delivery: "7 days",
        revisions: "3 revisions",
        features: [
          "8–10 full website pages",
          "Basic keyword research included",
          "Consistent brand voice guide",
          "Priority review calls if needed",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you write in Urdu as well as English?",
        a: "Yes. Let us know your preferred language and audience when you submit your requirements.",
      },
      {
        q: "Can you match an existing brand voice?",
        a: "Yes — share 2–3 examples of writing you like (yours or a reference) and we'll match the tone.",
      },
    ],
  },
  {
    slug: "ai-image-generation",
    name: "AI Image Generation & Design",
    shortName: "Image Generation",
    icon: "image",
    tagline: "Custom AI visuals and Canva-designed graphics built around your brand, not a generic library.",
    intro:
      "From social media graphics to branding assets, we combine AI image generation with hand-finished design in Canva to produce visuals that actually look like they belong to your business — consistent colors, consistent style, no random stock photography.",
    whoFor: [
      "Brands that need a consistent visual style across platforms",
      "Businesses without a designer on the team",
      "Creators who need thumbnails, covers or post graphics regularly",
      "Startups building their first brand identity",
    ],
    benefits: [
      "Original visuals, not recycled stock photography",
      "Consistent colors, style and quality across every asset",
      "Fast turnaround for time-sensitive campaigns",
      "Editable source files so you can reuse the design later",
    ],
    whatsIncluded: [
      "Brand color and style alignment before design begins",
      "AI-generated base visuals, refined and composed by hand",
      "Export in the sizes/platforms you need",
      "Source files for future edits",
    ],
    process: [
      "You share brand colors, references and the graphics you need",
      "We generate and shortlist visual directions",
      "You pick a direction, we finalize the full set",
      "Delivery in ready-to-use formats",
    ],
    sampleWork:
      "Sample: a 10-piece Instagram grid concept for a fictional coffee brand, generated and composed around a single warm, consistent palette.",
    startingPkr: "2,500",
    startingUsd: "18",
    deliveryEstimate: "2–6 days",
    packages: [
      {
        name: "Starter",
        bestFor: "A handful of graphics for one campaign",
        priceLabel: "Starting at",
        pkr: "PKR 2,500 – 4,000",
        usd: "$18 – 28",
        delivery: "2 days",
        revisions: "1 revision",
        features: [
          "5 custom designs",
          "1 platform / format",
          "Brand color matching",
          "PNG + editable Canva file",
        ],
      },
      {
        name: "Standard",
        bestFor: "Ongoing content with a defined look",
        priceLabel: "Starting at",
        pkr: "PKR 7,000 – 9,000",
        usd: "$50 – 65",
        delivery: "4 days",
        revisions: "2 revisions",
        features: [
          "15 custom designs",
          "Basic brand kit (colors + fonts)",
          "Multiple platform sizes",
          "Editable source files",
        ],
      },
      {
        name: "Premium",
        bestFor: "A full brand visual identity",
        priceLabel: "Starting at",
        pkr: "PKR 15,000 – 18,000",
        usd: "$100 – 130",
        delivery: "6 days",
        revisions: "3 revisions",
        features: [
          "30 custom designs",
          "Full brand style guide",
          "All major platform sizes",
          "Reusable design templates",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you design a logo as part of this service?",
        a: "Simple logo concepts can be included in the Premium package — mention it in your project brief.",
      },
      {
        q: "What file formats do I get?",
        a: "PNG and JPG for immediate use, plus the editable Canva file for future changes.",
      },
    ],
  },
  {
    slug: "ai-video",
    name: "AI Video Creation",
    shortName: "Video Creation",
    icon: "video",
    tagline: "Short-form, promotional and explainer videos built with AI tools and edited for real platforms.",
    intro:
      "We produce short-form social videos, product clips and explainer videos using AI video and voice tools, then edit and pace every clip by hand so it actually holds attention — not a stiff AI slideshow.",
    whoFor: [
      "Businesses that need Reels/TikTok/Shorts content regularly",
      "Product owners who need a quick promotional or demo video",
      "Educators and coaches who want explainer-style videos",
      "Brands telling a short story without a full production crew",
    ],
    benefits: [
      "No camera, actors or studio required",
      "Fast turnaround compared to traditional video production",
      "Captions and pacing built for social platforms",
      "Consistent style across a full video series",
    ],
    whatsIncluded: [
      "Script or outline (written or refined from your notes)",
      "AI-generated visuals, voiceover or captions as needed",
      "Editing, pacing and platform-ready export",
      "Revisions on structure and pacing",
    ],
    process: [
      "You share the video's purpose, message and any reference style",
      "We draft a short script/storyboard for approval",
      "Video is produced and edited",
      "You review and request changes",
      "Final video delivered in your required format",
    ],
    sampleWork:
      "Sample: a 30-second product demo concept for a fictional skincare brand — voiceover, on-screen captions and product visuals edited to a single platform-ready clip.",
    startingPkr: "4,000",
    startingUsd: "30",
    deliveryEstimate: "3–8 days",
    packages: [
      {
        name: "Starter",
        bestFor: "One short-form clip",
        priceLabel: "Starting at",
        pkr: "PKR 4,000 – 6,000",
        usd: "$30 – 45",
        delivery: "3 days",
        revisions: "1 revision",
        features: [
          "1 short-form video (15–30 sec)",
          "Captions included",
          "1 platform export",
        ],
      },
      {
        name: "Standard",
        bestFor: "A short campaign or one explainer video",
        priceLabel: "Starting at",
        pkr: "PKR 12,000 – 16,000",
        usd: "$85 – 115",
        delivery: "5 days",
        revisions: "2 revisions",
        features: [
          "3 short-form videos, or",
          "1 explainer video (60–90 sec)",
          "Voiceover included",
          "Multi-platform export",
        ],
      },
      {
        name: "Premium",
        bestFor: "A recurring content batch or a polished product video",
        priceLabel: "Starting at",
        pkr: "PKR 25,000 – 32,000",
        usd: "$180 – 230",
        delivery: "7–8 days",
        revisions: "3 revisions",
        features: [
          "5 short-form videos, or",
          "1 premium video (2–3 min)",
          "Custom voiceover + music",
          "Full platform-size export set",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to record anything myself?",
        a: "No — everything can be produced with AI visuals and voice. If you want to include your own footage, you can add it to your requirements.",
      },
      {
        q: "Which platforms are videos optimized for?",
        a: "Instagram Reels, TikTok, YouTube Shorts and standard 16:9 formats — tell us which ones you need.",
      },
    ],
  },
  {
    slug: "social-media",
    name: "AI Social Media Content",
    shortName: "Social Media Content",
    icon: "share",
    tagline: "Captions, graphics and a posting calendar so your social presence stays consistent.",
    intro:
      "We plan, write and design a batch of ready-to-post social content — captions written in your brand voice, graphics matched to your palette, and a simple calendar so posting stays consistent instead of random.",
    whoFor: [
      "Small businesses that know they should post but rarely do",
      "Founders who don't have time to write captions",
      "Brands that need a consistent look across platforms",
      "Anyone launching a new product or service",
    ],
    benefits: [
      "A full batch of content ready in advance",
      "Consistent visual identity across every post",
      "Captions written for engagement, not just filler text",
      "A simple calendar so you know what to post and when",
    ],
    whatsIncluded: [
      "Caption writing in your brand voice",
      "Matching graphics for each post",
      "A posting calendar / schedule",
      "Platform-specific sizing",
    ],
    process: [
      "You share your brand details, offers and content goals",
      "We plan a content theme and calendar",
      "Captions and graphics are created",
      "You review the batch before final delivery",
    ],
    sampleWork:
      "Sample: a 2-week Instagram content batch for a fictional fitness coach — 10 posts covering tips, offers and motivational content, with a matching visual theme.",
    startingPkr: "5,000",
    startingUsd: "35",
    deliveryEstimate: "3–8 days",
    packages: [
      {
        name: "Starter",
        bestFor: "Testing consistent posting for the first time",
        priceLabel: "Starting at",
        pkr: "PKR 5,000 – 7,000",
        usd: "$35 – 50",
        delivery: "3–4 days",
        revisions: "1 revision",
        features: [
          "10 posts (caption + graphic)",
          "1 platform",
          "Basic posting schedule",
        ],
      },
      {
        name: "Standard",
        bestFor: "Running a consistent monthly presence",
        priceLabel: "Starting at",
        pkr: "PKR 12,000 – 15,000",
        usd: "$80 – 110",
        delivery: "5–6 days",
        revisions: "2 revisions",
        features: [
          "20 posts (caption + graphic)",
          "2 platforms",
          "Content calendar included",
        ],
      },
      {
        name: "Premium",
        bestFor: "A full month of multi-platform content",
        priceLabel: "Starting at",
        pkr: "PKR 22,000 – 28,000",
        usd: "$150 – 200",
        delivery: "7–8 days",
        revisions: "3 revisions",
        features: [
          "30 posts (caption + graphic)",
          "3 platforms",
          "Calendar + hashtag strategy",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you post the content for us?",
        a: "Not yet in Phase 1 — you receive ready-to-post files and a calendar. Scheduled auto-posting is on our roadmap.",
      },
      {
        q: "Can you follow an existing content style?",
        a: "Yes, share a few past posts you liked and we'll keep the new batch consistent with them.",
      },
    ],
  },
  {
    slug: "presentations",
    name: "AI Presentation Design",
    shortName: "Presentation Design",
    icon: "presentation",
    tagline: "Pitch decks and business presentations that look built by a design team.",
    intro:
      "We turn your raw points, data or pitch into a clean, well-structured presentation — clear slide flow, consistent branding and visuals that support your message instead of cluttering it.",
    whoFor: [
      "Founders preparing an investor or client pitch",
      "Businesses presenting proposals or reports",
      "Teams that need a professional deck fast",
      "Students and professionals needing polished academic or business slides",
    ],
    benefits: [
      "A clear, logical slide flow instead of a wall of text",
      "Consistent branding across every slide",
      "Visuals chosen to support each point",
      "Delivered ready to present, no further formatting needed",
    ],
    whatsIncluded: [
      "Content structuring from your notes or draft",
      "Custom-branded slide design",
      "Charts/visuals where useful",
      "Editable file (PowerPoint or Google Slides)",
    ],
    process: [
      "You share your content, goal and any brand guidelines",
      "We structure the slide flow for your approval",
      "Full deck is designed",
      "You review and request adjustments",
      "Final editable file delivered",
    ],
    sampleWork:
      "Sample: a 12-slide investor pitch deck concept for a fictional logistics startup — problem, solution, market, model and ask, laid out in a clean branded template.",
    startingPkr: "3,500",
    startingUsd: "25",
    deliveryEstimate: "2–5 days",
    packages: [
      {
        name: "Starter",
        bestFor: "A short internal or class presentation",
        priceLabel: "Starting at",
        pkr: "PKR 3,500 – 5,000",
        usd: "$25 – 35",
        delivery: "2 days",
        revisions: "1 revision",
        features: [
          "Up to 10 slides",
          "Clean template design",
          "Editable file delivery",
        ],
      },
      {
        name: "Standard",
        bestFor: "A client-facing or business presentation",
        priceLabel: "Starting at",
        pkr: "PKR 8,000 – 10,000",
        usd: "$55 – 75",
        delivery: "3–4 days",
        revisions: "2 revisions",
        features: [
          "Up to 20 slides",
          "Custom brand styling",
          "Charts / data visuals included",
        ],
      },
      {
        name: "Premium",
        bestFor: "An investor pitch or high-stakes presentation",
        priceLabel: "Starting at",
        pkr: "PKR 15,000 – 20,000",
        usd: "$100 – 140",
        delivery: "5 days",
        revisions: "3 revisions",
        features: [
          "Up to 30 slides",
          "Pitch-deck quality visuals",
          "Light slide animations",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you write the content too, or just design it?",
        a: "Both — send your raw notes or bullet points and we'll structure the narrative, or send finished content and we'll design around it.",
      },
      {
        q: "Which software do you deliver in?",
        a: "PowerPoint (.pptx) by default; Google Slides on request.",
      },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Chatbot & Automation",
    shortName: "Chatbot & Automation",
    icon: "bot",
    tagline: "A chatbot that answers your customers on your website and WhatsApp — set up for you, no code needed.",
    intro:
      "We set up a no-code AI chatbot trained on your business information so it can answer common customer questions instantly on your website or WhatsApp, and connect it to lead capture so you never miss an inquiry.",
    whoFor: [
      "Businesses getting repetitive questions on WhatsApp or their website",
      "Service businesses that want to capture leads outside working hours",
      "Online stores needing quick order/FAQ support",
      "Anyone ready to automate the first response to a customer",
    ],
    benefits: [
      "Instant replies to customers, any time of day",
      "Fewer repetitive questions landing on you personally",
      "Leads captured automatically instead of lost in chat",
      "No coding or technical setup required from you",
    ],
    whatsIncluded: [
      "Chatbot trained on your business FAQs and information",
      "Website or WhatsApp integration",
      "Basic conversation flow design",
      "Testing and handover with simple instructions",
    ],
    process: [
      "You share your common questions, services and business info",
      "We build and train the chatbot flow",
      "Chatbot is connected to your website/WhatsApp",
      "We test together and adjust responses",
      "Final handover with usage instructions",
    ],
    sampleWork:
      "Sample: a website FAQ chatbot concept for a fictional online clothing store, answering questions about sizing, delivery and returns automatically.",
    startingPkr: "8,000",
    startingUsd: "60",
    deliveryEstimate: "4–12 days",
    packages: [
      {
        name: "Starter",
        bestFor: "Answering common website FAQs automatically",
        priceLabel: "Starting at",
        pkr: "PKR 8,000 – 12,000",
        usd: "$60 – 90",
        delivery: "4–5 days",
        revisions: "1 revision",
        features: [
          "Website FAQ chatbot",
          "Trained on your business info",
          "Basic setup + handover",
        ],
      },
      {
        name: "Standard",
        bestFor: "Handling customer chats on WhatsApp too",
        priceLabel: "Starting at",
        pkr: "PKR 18,000 – 25,000",
        usd: "$130 – 180",
        delivery: "6–7 days",
        revisions: "2 revisions",
        features: [
          "Website chatbot",
          "WhatsApp integration",
          "Custom conversation flows",
        ],
      },
      {
        name: "Premium",
        bestFor: "Capturing and organizing leads automatically",
        priceLabel: "Starting at",
        pkr: "PKR 35,000 – 50,000",
        usd: "$250 – 350",
        delivery: "10–12 days",
        revisions: "3 revisions",
        features: [
          "Chatbot + WhatsApp",
          "Lead capture form logic",
          "Email / spreadsheet integration",
        ],
      },
    ],
    faqs: [
      {
        q: "Will the chatbot sound robotic?",
        a: "We write and tune the conversation flow so responses sound like your business, with a clear handoff to you for anything it can't answer.",
      },
      {
        q: "Do I need any technical knowledge to use this?",
        a: "No — we handle the setup and give you simple instructions for updating answers later.",
      },
    ],
  },
  {
    slug: "seo-blog-content",
    name: "SEO & AI Blog Content",
    shortName: "SEO & Blog Content",
    icon: "search",
    tagline: "Blog posts written to actually get found on Google, not just to fill a blog page.",
    intro:
      "We research relevant keywords for your business and write blog content around them — structured for readability and search, so your blog becomes something that brings visitors in over time instead of sitting unread.",
    whoFor: [
      "Businesses with a blog that never gets updated",
      "Service businesses that want to rank for local searches",
      "Founders who understand SEO matters but don't have time for it",
      "Anyone building long-term organic traffic instead of only paid ads",
    ],
    benefits: [
      "Content built around real search terms your customers use",
      "Clear structure that both readers and search engines can follow",
      "A repeatable system instead of one-off random posts",
      "No keyword stuffing — content stays readable",
    ],
    whatsIncluded: [
      "Keyword research relevant to your business",
      "SEO-structured blog writing (titles, headings, meta description)",
      "Internal linking suggestions",
      "Delivered ready to publish",
    ],
    process: [
      "You share your business, services and target audience",
      "We research relevant keywords and topics",
      "Blog posts are written and structured for SEO",
      "You review, we finalize and deliver",
    ],
    sampleWork:
      "Sample: a 4-post blog series concept for a fictional home cleaning service, targeting local search terms like service-area and service-type queries.",
    startingPkr: "5,000",
    startingUsd: "35",
    deliveryEstimate: "3–10 days",
    packages: [
      {
        name: "Starter",
        bestFor: "Testing SEO content for the first time",
        priceLabel: "Starting at",
        pkr: "PKR 5,000 – 7,000",
        usd: "$35 – 50",
        delivery: "3–4 days",
        revisions: "1 revision",
        features: [
          "2 SEO blog posts (800–1,000 words)",
          "Basic keyword list",
          "Meta title + description",
        ],
      },
      {
        name: "Standard",
        bestFor: "Building a consistent blog presence",
        priceLabel: "Starting at",
        pkr: "PKR 10,000 – 14,000",
        usd: "$70 – 100",
        delivery: "6 days",
        revisions: "2 revisions",
        features: [
          "4 SEO blog posts",
          "On-page SEO checklist",
          "Internal linking suggestions",
        ],
      },
      {
        name: "Premium",
        bestFor: "A full content push for search visibility",
        priceLabel: "Starting at",
        pkr: "PKR 20,000 – 26,000",
        usd: "$140 – 190",
        delivery: "10 days",
        revisions: "3 revisions",
        features: [
          "8 SEO blog posts",
          "Full keyword research",
          "Content calendar included",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you guarantee a Google ranking?",
        a: "No one can honestly guarantee a specific ranking. We write content built to perform well and follow SEO best practice — results build over time.",
      },
      {
        q: "Can you write for a specific city or service area?",
        a: "Yes — local SEO targeting is part of the keyword research step.",
      },
    ],
  },
];

export const futureServices = [
  "Prompt Engineering Consultation",
  "Digital Marketing Support",
  "Canva Design (Standalone)",
  "AI Business Solutions Consulting",
];

export const processSteps = [
  {
    step: "01",
    title: "Choose Your Service",
    text: "Browse our services and pick the one that matches what you need — content, visuals, video, presentations, automation or SEO.",
  },
  {
    step: "02",
    title: "Select Your Package",
    text: "Each service has Starter, Standard and Premium packages. Compare what's included and choose the one that fits your project and budget.",
  },
  {
    step: "03",
    title: "Submit Your Requirements",
    text: "Fill out the project form with your business details, goals, deadline and any reference files or style preferences.",
  },
  {
    step: "04",
    title: "We Review Your Project",
    text: "We read through your requirements and confirm scope, timeline and price within 24 hours — by email or WhatsApp, whichever you prefer.",
  },
  {
    step: "05",
    title: "Project Development Begins",
    text: "Once confirmed, work starts. A 50% advance is requested before development begins on most projects.",
  },
  {
    step: "06",
    title: "Preview / Draft",
    text: "For most services, you'll see a draft or preview before final delivery, so you can catch anything early.",
  },
  {
    step: "07",
    title: "Revisions",
    text: "Share your feedback and we'll revise within the number of rounds included in your package, within the original project scope.",
  },
  {
    step: "08",
    title: "Final Delivery",
    text: "Once approved, you receive the final files in ready-to-use format, and the remaining balance is settled.",
  },
  {
    step: "09",
    title: "Project Completion",
    text: "We follow up to confirm everything works for you, and you're welcome back any time for your next project.",
  },
];

export const faqs: { q: string; a: string; category: string }[] = [
  {
    category: "Ordering",
    q: "How does the ordering process work?",
    a: "You choose a service and package, submit your requirements through the Start Your Project page, and we confirm scope and timeline before work begins. See the How It Works page for the full journey.",
  },
  {
    category: "Ordering",
    q: "What services do you offer?",
    a: "AI Content Creation, AI Image Generation, AI Video Creation, AI Social Media Content, AI Presentation Design, AI Chatbot & Automation, and SEO & AI Blog Content. See the Services page for details on each.",
  },
  {
    category: "Ordering",
    q: "How do I choose the right package?",
    a: "Starter suits a single, small project. Standard suits an ongoing or slightly larger need. Premium suits a full, high-stakes project. If you're unsure, message us and we'll recommend one.",
  },
  {
    category: "Ordering",
    q: "Can I request custom work outside the packages?",
    a: "Yes. Use the \"Request a Custom Quote\" option on the Pricing page and describe what you need.",
  },
  {
    category: "Timeline",
    q: "How long does a project take?",
    a: "Delivery time depends on the service and package, ranging from 2 days for small projects to about 12 days for larger automation builds. Exact timelines are listed on each service page.",
  },
  {
    category: "Timeline",
    q: "Do you offer urgent/rush delivery?",
    a: "Rush delivery is available on most services for an additional fee, subject to current availability. Mention your deadline when submitting your project.",
  },
  {
    category: "Revisions",
    q: "How many revisions are included?",
    a: "Starter packages include 1 revision, Standard includes 2, and Premium includes 3. Revisions must stay within the original project scope and be requested within 5 days of delivery.",
  },
  {
    category: "Working together",
    q: "Do you work with international clients?",
    a: "Yes. We work with clients in Pakistan and internationally, with pricing shown in both PKR and USD.",
  },
  {
    category: "Working together",
    q: "How do I submit project requirements?",
    a: "Through the Start Your Project page — you'll be asked for your business details, goals, deadline and any reference files.",
  },
  {
    category: "Working together",
    q: "Can I contact you before ordering?",
    a: "Yes, always. Use the Contact page or WhatsApp if you have questions before choosing a service.",
  },
  {
    category: "Delivery & Payment",
    q: "How will I receive my files?",
    a: "Files are delivered digitally by email or WhatsApp in ready-to-use formats (documents, images, video files, or editable design/slide files depending on the service).",
  },
  {
    category: "Delivery & Payment",
    q: "What payment methods are available?",
    a: "Pakistan-based clients can pay via JazzCash, Easypaisa or bank transfer. International clients can pay via Payoneer or bank transfer. Payment details are shared after your project is confirmed.",
  },
  {
    category: "Delivery & Payment",
    q: "What happens after I place an order?",
    a: "We review your requirements, confirm scope and price, request an advance payment, and begin work. You'll be updated at each key step until final delivery.",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "saas-website-copy", title: "SaaS Website Copy Refresh", category: "AI Content", visual: "content",
    brief: "A fictional early-stage SaaS tool had a working product but a homepage still written like an internal spec sheet — dense, jargon-heavy, and unclear about who it was for.",
    objective: "Rewrite the full marketing site so a first-time visitor understands the product and its value within seconds.",
    solution: "AI-assisted first drafts for every page, restructured around one clear benefit per section, then hand-edited for tone and rhythm.",
    deliverables: ["Homepage, features, pricing and about page copy", "Simplified, benefit-first headline system", "SEO-aware meta titles and descriptions"],
    isDemo: true,
  },
  {
    slug: "ai-product-campaign", title: "AI Product Campaign", category: "AI Images", visual: "image",
    brief: "A fictional skincare brand needed launch visuals for a new product line but had no product photography budget yet.",
    objective: "Create professional-looking marketing visuals for a fictional product launch.",
    solution: "AI-generated product visuals composed and refined into a consistent, brand-matched creative set.",
    deliverables: ["Product hero visuals", "Social media creatives (3 sizes)", "One promotional banner"],
    isDemo: true,
  },
  {
    slug: "social-promo-video", title: "Social Media Promo Video", category: "AI Videos", visual: "video",
    brief: "A fictional online store wanted a short launch-day video but had no video production experience or equipment.",
    objective: "Produce one high-energy 30-second promotional clip ready for Reels and TikTok.",
    solution: "AI-generated visuals and voiceover, edited and paced for a short-form vertical format with on-screen captions.",
    deliverables: ["30-second vertical video", "Burned-in captions", "Exports for Reels, TikTok and Shorts"],
    isDemo: true,
  },
  {
    slug: "instagram-content-pack", title: "Instagram Content Pack", category: "Social Media", visual: "social",
    brief: "A fictional fitness coach was posting inconsistently, with no visual theme tying posts together.",
    objective: "Build two weeks of ready-to-post content with a single, recognizable visual identity.",
    solution: "A batch of captions written in the coach's voice, paired with graphics built on one consistent template system.",
    deliverables: ["10 posts (caption + graphic)", "One consistent visual theme", "A simple posting calendar"],
    isDemo: true,
  },
  {
    slug: "ai-business-presentation", title: "AI Business Presentation", category: "Presentations", visual: "presentation",
    brief: "A fictional logistics startup had a strong pitch but a messy, inconsistent slide deck built from copy-pasted templates.",
    objective: "Turn scattered notes into an investor-ready pitch deck with a clear narrative.",
    solution: "Content restructured into a proven pitch-deck flow, then designed with consistent branding and simple data visuals.",
    deliverables: ["12-slide investor deck", "Custom brand styling", "Editable PowerPoint file"],
    isDemo: true,
  },
  {
    slug: "startup-brand-identity", title: "Startup Brand Identity", category: "Branding", visual: "branding",
    brief: "A fictional early-stage startup was about to launch with no defined visual identity — inconsistent colors and no logo direction.",
    objective: "Establish a simple, usable starter brand identity before public launch.",
    solution: "A focused color palette, typography pairing and a basic logo concept, packaged for immediate use.",
    deliverables: ["Starter logo concept", "Color palette + type pairing", "Social media template set"],
    isDemo: true,
  },
  {
    slug: "lead-management-workflow", title: "Lead Management Workflow", category: "AI Automation", visual: "automation",
    brief: "A fictional service business was losing track of inquiries that came in outside working hours.",
    objective: "Make sure no customer inquiry goes unanswered, even overnight.",
    solution: "A trained FAQ chatbot connected to WhatsApp, with lead details automatically organized for morning follow-up.",
    deliverables: ["Website + WhatsApp chatbot", "Automated FAQ responses", "Structured lead capture"],
    isDemo: true,
  },
  {
    slug: "ai-blog-content-strategy", title: "AI Blog Content Strategy", category: "SEO & Blog Content", visual: "seo",
    brief: "A fictional home cleaning service had a blog with four posts from two years ago and no ongoing content plan.",
    objective: "Build a repeatable content system targeting real local search terms.",
    solution: "Keyword research focused on service-area terms, followed by a structured, SEO-formatted post series.",
    deliverables: ["4-post SEO blog series", "Keyword research summary", "Meta titles and descriptions"],
    isDemo: true,
  },
];

export const portfolioCategories = ["All", "AI Content", "AI Images", "AI Videos", "Social Media", "Presentations", "Branding", "AI Automation", "SEO & Blog Content"];

export const orderStatuses = ["New Request", "Under Review", "Client Contacted", "Quote Sent", "Awaiting Confirmation", "Payment Pending", "Payment Received", "Project Scheduled", "In Progress", "Client Review", "Revision", "Completed", "Delivered", "Cancelled"];

export const paymentMethodsReady = [
  { region: "Pakistan", methods: ["EasyPaisa"] },
  { region: "International", methods: ["Payoneer Payment Request", "Visa / Mastercard", "International Bank Transfer"] },
];

export const nodeExplanations: Record<string, string> = {
  "ai-content": "AI-assisted website copy, blogs and content that sound genuinely human.",
  "ai-image-generation": "Professional AI-generated visuals for brands, products and content.",
  "ai-video": "AI-powered promotional, educational and social media video creation.",
  "social-media": "Ready-to-post captions and graphics, planned around a content calendar.",
  presentations: "Pitch decks and business presentations designed to actually persuade.",
  "ai-automation": "No-code chatbots and workflows that respond to customers instantly.",
  "seo-blog-content": "Keyword-researched blog content built to get found on Google.",
};

export const conditionalFieldsConfig: Record<string, ConditionalField[]> = {
  "ai-video": [
    { key: "videoDuration", label: "Video Duration", type: "select", options: ["15–30 sec", "60–90 sec", "2–3 min"] },
    { key: "platform", label: "Platform", type: "select", options: ["Instagram Reels", "TikTok", "YouTube Shorts", "Multiple platforms"] },
    { key: "aspectRatio", label: "Aspect Ratio", type: "select", options: ["9:16 (vertical)", "1:1 (square)", "16:9 (widescreen)"] },
    { key: "voiceover", label: "Voiceover Needed?", type: "select", options: ["Yes", "No"] },
    { key: "language", label: "Language", type: "text", placeholder: "e.g. English, Urdu" },
    { key: "music", label: "Music Preference", type: "text", placeholder: "e.g. upbeat, calm, none" },
    { key: "scriptAvailable", label: "Do you have a script?", type: "select", options: ["Yes, I'll provide it", "No, please write one"] },
    { key: "referenceVideo", label: "Reference Video (link)", type: "text", placeholder: "Link to a style you like" },
  ],
  "ai-image-generation": [
    { key: "imageType", label: "Image Type", type: "text", placeholder: "e.g. product, social post, branding" },
    { key: "dimensions", label: "Dimensions / Platform", type: "text", placeholder: "e.g. 1080x1080, Instagram" },
    { key: "style", label: "Style", type: "text", placeholder: "e.g. minimal, vibrant, realistic" },
    { key: "numberOfImages", label: "Number of Images", type: "text", placeholder: "e.g. 10" },
    { key: "referenceImages", label: "Reference Images (link)", type: "text", placeholder: "Link to images you like" },
    { key: "productInfo", label: "Brand / Product Information", type: "text", placeholder: "What's the product/brand?" },
  ],
  "social-media": [
    { key: "platform", label: "Platform(s)", type: "select", options: ["Instagram", "Facebook", "LinkedIn", "TikTok", "Multiple"] },
    { key: "numberOfPosts", label: "Number of Posts", type: "text", placeholder: "e.g. 10" },
    { key: "contentType", label: "Content Type", type: "text", placeholder: "e.g. tips, promotions, behind-the-scenes" },
    { key: "brandGuidelines", label: "Brand Guidelines Available?", type: "select", options: ["Yes", "No"] },
    { key: "postingFormat", label: "Posting Format", type: "text", placeholder: "e.g. carousel, single image, story" },
  ],
  presentations: [
    { key: "numberOfSlides", label: "Number of Slides", type: "text", placeholder: "e.g. 15" },
    { key: "audience", label: "Audience", type: "text", placeholder: "e.g. investors, internal team, students" },
    { key: "presentationPurpose", label: "Presentation Purpose", type: "text", placeholder: "e.g. pitch, report, training" },
    { key: "brandGuidelines", label: "Brand Guidelines Available?", type: "select", options: ["Yes", "No"] },
    { key: "format", label: "Required Format", type: "select", options: ["PowerPoint (.pptx)", "Google Slides", "PDF"] },
  ],
  "seo-blog-content": [
    { key: "topic", label: "Topic / Niche", type: "text", placeholder: "What should the blog series be about?" },
    { key: "targetKeyword", label: "Target Keyword(s)", type: "text", placeholder: "e.g. home cleaning service Lahore" },
    { key: "audience", label: "Audience", type: "text", placeholder: "Who are these posts for?" },
    { key: "wordCount", label: "Preferred Word Count", type: "text", placeholder: "e.g. 800–1000 words per post" },
    { key: "language", label: "Language", type: "text", placeholder: "e.g. English, Urdu" },
    { key: "websiteUrl", label: "Website URL", type: "text", placeholder: "https://" },
  ],
  "ai-content": [
    { key: "websiteUrl", label: "Existing Website URL (if any)", type: "text", placeholder: "https://" },
    { key: "keyPages", label: "Which Pages Need Copy?", type: "text", placeholder: "e.g. Home, About, Services" },
  ],
  "ai-automation": [
    { key: "channel", label: "Where Should the Chatbot Work?", type: "select", options: ["Website only", "WhatsApp only", "Both"] },
    { key: "currentTools", label: "Current Tools (if any)", type: "text", placeholder: "e.g. none yet, or existing WhatsApp Business" },
  ],
};

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy", title: "Privacy Policy",
    sections: [
      { h: "What we collect", b: "When you contact us or submit a project request, we collect what you provide directly: your name, business/brand name, email, WhatsApp number, country/city, and the project details, requirements and reference files you share." },
      { h: "Why we collect it", b: "This information is used only to understand, quote, deliver and communicate about your project — nothing more." },
      { h: "How it's used", b: "Project details and files are used solely to complete your order. We do not sell, rent or share your information with third parties for marketing purposes." },
      { h: "Third parties", b: "As the studio grows, limited third-party tools may be used for hosting, payment processing or email delivery. Any such provider will only receive the minimum data required to perform its function." },
      { h: "Your files", b: "Reference files and project materials are kept only as long as needed to complete and support your project, and are not redistributed or reused without permission." },
      { h: "Contact", b: `Questions about this policy can be sent to ${BUSINESS_EMAIL}.` },
    ],
  },
  {
    slug: "terms-conditions", title: "Terms & Conditions",
    sections: [
      { h: "Acceptance", b: "By submitting a project request or engaging Asiya AI Studio for services, you agree to these terms." },
      { h: "Services", b: "Asiya AI Studio provides AI-assisted, human-refined digital services as described on the Services and Pricing pages. Scope, delivery time and revisions follow the selected package unless otherwise agreed in writing." },
      { h: "Client responsibilities", b: "You agree to provide accurate project information and timely feedback. Delays in providing requirements or feedback may extend delivery timelines." },
      { h: "Intellectual property", b: "Ownership of final, approved deliverables transfers to the client upon full payment. Asiya AI Studio may showcase completed work in its portfolio unless the client requests otherwise in writing." },
      { h: "Limitation of liability", b: "Asiya AI Studio is not liable for indirect or consequential losses arising from the use of delivered work." },
      { h: "Changes", b: "These terms may be updated as the business grows; the current version always applies to new project requests." },
    ],
  },
  {
    slug: "refund-cancellation-policy", title: "Refund & Cancellation Policy",
    sections: [
      { h: "Before work begins", b: "If a project is cancelled before development has started, the advance payment is refundable minus any administrative cost already incurred." },
      { h: "After work begins", b: "Once development has started, the advance is non-refundable, since AI processing time and human work have already been committed." },
      { h: "After final delivery", b: "Refunds are not offered once final files have been delivered and approved by the client." },
      { h: "Disputes", b: "Any disagreement about delivered work is reviewed case-by-case, in line with the package's included revisions." },
    ],
  },
  {
    slug: "service-delivery-policy", title: "Service Delivery Policy",
    sections: [
      { h: "Delivery timelines", b: "Stated delivery windows begin once requirements are confirmed and (where applicable) the advance payment is received — not from the moment of form submission." },
      { h: "Format", b: "All work is delivered digitally, in the formats specified on each service's page (documents, images, video files, editable design or slide files)." },
      { h: "Delays", b: "If a delay is expected, we communicate it proactively rather than leaving a project silently overdue." },
      { h: "Client feedback", b: "Timely feedback keeps a project on schedule; delayed feedback may push back the final delivery date." },
    ],
  },
  {
    slug: "revision-policy", title: "Revision Policy",
    sections: [
      { h: "Included revisions", b: "Starter packages include 1 revision round, Standard includes 2, and Premium includes 3, unless stated otherwise on a service's pricing." },
      { h: "Scope", b: "Revisions must stay within the original project brief. Requests that change the scope or direction are quoted as additional work." },
      { h: "Timing", b: "Revisions must be requested within 5 days of delivery. After that window, the project is considered complete." },
    ],
  },
];
