// ── SEO helpers ──
// Usado por SEOHead.astro para gerar todas as meta tags

export const SITE = {
  name: "Palato do Côa",
  url: "https://www.palatodocoa.com.br",
  locale: "pt_BR",
  country: "BR",
  language: "pt-BR",
  twitter: "@palatodocoa",
  instagram: "@palatodocoa",
  defaultOgImage: "/images/og-default.jpg",
};

export const HREFLANG = [
  { lang: "pt-BR", url: "https://www.palatodocoa.com.br" },
  { lang: "pt-PT", url: "https://www.palatodocoa.pt/pt" },
  { lang: "x-default", url: "https://www.palatodocoa.pt" },
];

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  // Schema.org
  schema?: object;
}

export function buildTitle(title: string): string {
  if (title === SITE.name) return title;
  return `${title} | ${SITE.name}`;
}

export function buildCanonical(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

// ── Schema.org generators ──
export function schemaOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Winery",
    name: "Palato do Côa",
    url: "https://www.palatodocoa.com.br",
    sameAs: [
      "https://www.palatodocoa.pt",
      "https://www.instagram.com/palatodocoa",
      "https://www.facebook.com/palatodocoa",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "PT",
      addressRegion: "Douro Superior",
    },
    description:
      "Vinhos premium do Douro Superior, Portugal. Distribuição para o mercado brasileiro.",
  };
}

export function schemaWine(wine: {
  title: string;
  description: string;
  type: string;
  region: string;
  grapes: string[];
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: wine.title,
    description: wine.description,
    category: `Vinho ${wine.type}`,
    url: wine.url,
    image: wine.image,
    brand: {
      "@type": "Brand",
      name: "Palato do Côa",
    },
    countryOfOrigin: {
      "@type": "Country",
      name: "Portugal",
    },
  };
}

export function schemaBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };
}
