export type PackageTier = {
  name: "Starter" | "Standard" | "Premium";
  bestFor: string;
  priceLabel: string;
  pkr: string;
  usd: string;
  delivery: string;
  revisions: string;
  features: string[];
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  tagline: string;
  intro: string;
  whoFor: string[];
  benefits: string[];
  whatsIncluded: string[];
  process: string[];
  sampleWork: string;
  startingPkr: string;
  startingUsd: string;
  deliveryEstimate: string;
  packages: PackageTier[];
  faqs: { q: string; a: string }[];
};

export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  visual: "content" | "image" | "video" | "social" | "presentation" | "branding" | "automation" | "seo";
  brief: string;
  objective: string;
  solution: string;
  deliverables: string[];
  isDemo: true;
};

export type LegalPage = {
  slug: string;
  title: string;
  sections: { h: string; b: string }[];
};

export type ConditionalField = {
  key: string;
  label: string;
  type: "text" | "select";
  options?: string[];
  placeholder?: string;
};
