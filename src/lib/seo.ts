// ── SEO helpers ──

export const SITE = {
  name: "Palato do Côa",
  url: "https://www.palatodocoa.com.br",
  locale: "pt_BR",
  country: "BR",
  language: "pt-BR",
  twitter: "@palatodocoa",
  instagram: "@palatodocoa.brasil",
  instagramUrl: "https://www.instagram.com/palatodocoa.brasil",
  defaultOgImage: "/images/og/og-default.jpg",
  // Palavras-chave principais (usadas em Schema.org e meta keywords)
  keywords: {
    b2c: "vinho douro superior, vinhos portugueses no brasil, vinho tinto douro, palato do côa, vinho douro importado, terroir douro superior, vinho xisto douro",
    b2b: "vinho douro superior atacado, vinhos portugueses para restaurantes, importação vinho douro, carta de vinhos douro superior, vinhos portugueses atacado brasil",
    brand: "palato do côa, carloto magalhães, paulo schreck, quinta da saudade, muxagata, vinhas do côa",
  },
};

export const HREFLANG = [
  { lang: "pt-BR", url: "https://www.palatodocoa.com.br" },
  { lang: "pt-PT", url: "https://www.palatodocoa.pt/pt" },
  { lang: "x-default", url: "https://www.palatodocoa.pt" },
];

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  schema?: object | object[];
}

export function buildTitle(title: string): string {
  if (title === SITE.name) return title;
  return `${title} | ${SITE.name}`;
}

export function buildCanonical(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

// ── Schema.org ──

export function schemaOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Winery",
    name: "Palato do Côa",
    alternateName: "Palato do Coa",
    url: "https://www.palatodocoa.com.br",
    logo: `${SITE.url}/favicon.svg`,
    foundingDate: "2007",
    founder: { "@type": "Person", name: "Carloto Magalhães" },
    sameAs: [
      "https://www.palatodocoa.pt",
      "https://www.instagram.com/palatodocoa.brasil",
      "https://www.instagram.com/palatodocoa",
      "https://www.facebook.com/palatodocoa",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Quinta da Saudade, Muxagata",
      addressRegion: "Douro Superior",
      addressCountry: "PT",
    },
    description:
      "Vinhos premium do Douro Superior produzidos na Quinta da Saudade, Muxagata. 100% uvas da propriedade. Distribuição para o mercado brasileiro.",
    keywords: SITE.keywords.b2b + ", " + SITE.keywords.b2c,
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
  year?: number;
  alcohol?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: wine.title,
    description: wine.description,
    category: `Vinho ${wine.type} Douro Superior`,
    url: wine.url,
    image: wine.image ? `${SITE.url}${wine.image}` : undefined,
    brand: {
      "@type": "Brand",
      name: "Palato do Côa",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Palato do Côa",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Douro Superior",
        addressCountry: "PT",
      },
    },
    countryOfOrigin: { "@type": "Country", name: "Portugal" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Região", value: wine.region },
      { "@type": "PropertyValue", name: "Castas", value: wine.grapes.join(", ") },
      ...(wine.year ? [{ "@type": "PropertyValue", name: "Colheita", value: String(wine.year) }] : []),
      ...(wine.alcohol ? [{ "@type": "PropertyValue", name: "Álcool", value: wine.alcohol }] : []),
    ],
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

export function schemaFAQ(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
