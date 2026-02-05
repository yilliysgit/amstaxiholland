// client/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from 'sanity'

// ═══════════════════════════════════════════════════════════════
// LOCALE TYPES
// ═══════════════════════════════════════════════════════════════
import { localeString } from './localeString'
import { localeText } from './localeText'
import { localeSlug } from './localeSlug'
import { localeBlockContent } from './localeBlockContent'

// ═══════════════════════════════════════════════════════════════
// PAGE TYPES (3-tier structuur)
// ═══════════════════════════════════════════════════════════════
import mainServicePage from './mainServicePage'
import subServicePage from './subServicePage'
import servicePage from './servicePage'
import tourServicePage from './tourServicePage'

// ═══════════════════════════════════════════════════════════════
// DOCUMENT TYPES (herbruikbare content)
// ═══════════════════════════════════════════════════════════════
import faqIItem from './faqIItem'            // FAQ items
import review from './review'              // Reviews/testimonials

// ═══════════════════════════════════════════════════════════════
// PAGE BUILDER SECTIONS
// ═══════════════════════════════════════════════════════════════
import voordelenSection from './blockTypes/voordelenSection'
import faqSection from './blockTypes/faqSection'
import galerijSection from './blockTypes/galerijSection'
import ctaSection from './blockTypes/ctaSection'
import stepsSection from './blockTypes/stepsSection'
import highlightsSection from './blockTypes/highlightsSection'
import reviewsSection from './blockTypes/reviewsSection'
import pricingSection from './blockTypes/pricingSection'
import featuresSection from './blockTypes/featuresSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // ───────────────────────────────────────────────────────────
    // Locale fields
    // ───────────────────────────────────────────────────────────
    localeString,
    localeText,
    localeSlug,
    localeBlockContent,

    // ───────────────────────────────────────────────────────────
    // Page types
    // ───────────────────────────────────────────────────────────
    mainServicePage,
    subServicePage,
    servicePage,
    tourServicePage,

    // ───────────────────────────────────────────────────────────
    // Document types (herbruikbaar)
    // ───────────────────────────────────────────────────────────
    faqIItem,           // FAQ items (type: "faqItem")
    review,            // Reviews

    // ───────────────────────────────────────────────────────────
    // Page Builder blocks
    // ───────────────────────────────────────────────────────────
    voordelenSection,
    faqSection,
    galerijSection,
    ctaSection,
    stepsSection,
    highlightsSection,
    reviewsSection,
    pricingSection,
    featuresSection,
  ],
}