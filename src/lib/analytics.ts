// ── Analytics & Pixels ──
// Todos os IDs vêm de variáveis de ambiente (.env)
// Nunca hardcoded — seguro para commit no GitHub

export const ANALYTICS = {
  // Google Analytics 4
  GA4_ID: import.meta.env.PUBLIC_GA4_ID ?? "",

  // Meta (Facebook/Instagram) Pixel
  META_PIXEL_ID: import.meta.env.PUBLIC_META_PIXEL_ID ?? "",

  // TikTok Pixel
  TIKTOK_PIXEL_ID: import.meta.env.PUBLIC_TIKTOK_PIXEL_ID ?? "",

  // Google Tag Manager (alternativa ao GA4 directo)
  GTM_ID: import.meta.env.PUBLIC_GTM_ID ?? "",

  // Pinterest Tag
  PINTEREST_TAG_ID: import.meta.env.PUBLIC_PINTEREST_TAG_ID ?? "",
};

// ── Eventos customizados ── (para usar em botões, formulários, etc.)
// Exemplo: trackEvent("contact_form_submit", { source: "contato" })
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  // GA4
  if ((window as any).gtag) {
    (window as any).gtag("event", name, params);
  }

  // Meta Pixel
  if ((window as any).fbq) {
    (window as any).fbq("track", name, params);
  }

  // TikTok
  if ((window as any).ttq) {
    (window as any).ttq.track(name, params);
  }
}

// Eventos pré-definidos (conversões B2B)
export const EVENTS = {
  CONTACT_FORM_SUBMIT: "ContactFormSubmit",
  WHOLESALE_REQUEST: "WholesaleRequest",
  WINE_PAGE_VIEW: "WinePageView",
  VISIT_REQUEST: "VisitRequest",
};
