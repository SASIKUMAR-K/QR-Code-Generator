import { useEffect } from 'react';
import { site } from '../config/site.js';

function upsertMeta(attr, key, content) {
  if (content === undefined || content === null || content === '') return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (el) el.remove();
  if (!data) return;
  let payload = data;
  if (Array.isArray(data)) {
    payload = {
      '@context': 'https://schema.org',
      '@graph': data.map((item) => {
        const rest = { ...item };
        delete rest['@context'];
        return rest;
      }),
    };
  }
  el = document.createElement('script');
  el.type = 'application/ld+json';
  el.id = id;
  el.text = JSON.stringify(payload);
  document.head.appendChild(el);
}

/**
 * Per-page SEO manager: sets <title>, meta description/keywords, canonical,
 * Open Graph + Twitter tags and optional JSON-LD structured data.
 */
export function useSEO({
  title,
  description = site.description,
  keywords = site.keywords,
  path = '/',
  image,
  type = 'website',
  jsonLd,
} = {}) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;
  const url = `${site.url}${path}`;
  const ogImage = image || `${site.url}/icon.png`;

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = site.locale;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);
    upsertMeta('name', 'author', site.name);
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta('name', 'theme-color', site.themeColor);

    upsertLink('canonical', url);

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', site.name);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:locale', site.locale);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    upsertJsonLd('page-jsonld', jsonLd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullTitle, description, url, ogImage, type, JSON.stringify(jsonLd)]);
}

/** Reusable structured-data builders. */
export const structuredData = {
  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: site.locale,
  }),
  webApp: (name, description, path = '/') => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: name || `${site.name} — ${site.tagline}`,
    url: `${site.url}${path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    description: description || site.description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }),
  faq: (items) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }),
};
