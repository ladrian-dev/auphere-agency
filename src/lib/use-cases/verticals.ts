/**
 * Vertical registry · single source of truth for /use-cases/[vertical] pages.
 *
 * Each vertical is identified by a stable English slug (used in the URL across
 * locales — SEO-optimized for global queries). Copy lives in messages/*.json
 * under the `useCases.{vertical}` namespace; this file owns only the typed
 * shape, the ordered list of pain/role/integration/faq/outcome keys per
 * vertical, and the visual accent color for each one.
 */

export const VERTICAL_SLUGS = [
  'barbershop',
  'nail-salon',
  'spa',
  'medspa',
  'dental-clinic',
  'physiotherapy',
  'veterinary',
  'pharmacy',
  'language-school',
] as const;

export type VerticalSlug = (typeof VERTICAL_SLUGS)[number];

export interface VerticalConfig {
  slug: VerticalSlug;
  /**
   * Visual accent color for the vertical — token name from tokens.css.
   * Used on hero gradient stop, role icons and outcome metric color.
   */
  accent: 'bangladesh-green' | 'pine' | 'forest' | 'basil' | 'frog' | 'mint';
  /** Keys for pain points (3-4 items in messages.useCases.{slug}.pain.items.{key}). */
  painKeys: readonly string[];
  /** Keys for agent role cards (4-5 items in messages.useCases.{slug}.roles.items.{key}). */
  roleKeys: readonly string[];
  /** Keys for outcome metrics (3 items in messages.useCases.{slug}.outcomes.items.{key}). */
  outcomeKeys: readonly string[];
  /** Keys for FAQ items (6-8 items in messages.useCases.{slug}.faq.items.{key}). */
  faqKeys: readonly string[];
  /** Integration logos / labels — pure strings (vendor names, no i18n needed). */
  integrations: readonly string[];
  /** Conversation message ids (rendered in order) — copy in messages.useCases.{slug}.conversation.{id}. */
  conversationTurns: readonly { from: 'them' | 'us'; id: string }[];
}

export const VERTICAL_CONFIG: Record<VerticalSlug, VerticalConfig> = {
  barbershop: {
    slug: 'barbershop',
    accent: 'bangladesh-green',
    painKeys: ['missedCalls', 'handsBusy', 'noShows', 'reviews'],
    roleKeys: ['voiceReceptionist', 'whatsappBookings', 'reminders', 'waitlist', 'reviewCapture'],
    outcomeKeys: ['noShowReduction', 'callsRecovered', 'reviewLift'],
    faqKeys: ['system', 'voiceQuality', 'walkIn', 'multiLocation', 'pricing', 'launch'],
    integrations: ['Booksy', 'Treatwell', 'Fresha', 'Square', 'Google Calendar', 'WhatsApp Business', 'Google Reviews'],
    conversationTurns: [
      { from: 'them', id: 't1' },
      { from: 'us', id: 't2' },
      { from: 'them', id: 't3' },
      { from: 'us', id: 't4' },
    ],
  },
  'nail-salon': {
    slug: 'nail-salon',
    accent: 'mint',
    painKeys: ['walkInChaos', 'priceQuestions', 'noShows', 'technicianMatch'],
    roleKeys: ['voiceReceptionist', 'whatsappBookings', 'priceFaq', 'technicianMatching', 'loyaltyCapture'],
    outcomeKeys: ['inquiriesHandled', 'occupancyLift', 'noShowReduction'],
    faqKeys: ['technicianPref', 'walkIn', 'multiLanguage', 'integrations', 'pricing', 'launch'],
    integrations: ['Booksy', 'Fresha', 'GlossGenius', 'Square', 'Vagaro', 'WhatsApp Business', 'Google Calendar'],
    conversationTurns: [
      { from: 'them', id: 't1' },
      { from: 'us', id: 't2' },
      { from: 'them', id: 't3' },
      { from: 'us', id: 't4' },
    ],
  },
  spa: {
    slug: 'spa',
    accent: 'mint',
    painKeys: ['afterHoursBookings', 'noShowCost', 'missedCalls', 'upsellLost'],
    roleKeys: ['voiceReceptionist', 'whatsappBookings', 'prepReminders', 'upsell', 'giftCards'],
    outcomeKeys: ['afterHoursCapture', 'noShowReduction', 'upsellLift'],
    faqKeys: ['tone', 'walkIn', 'multiTherapist', 'integrations', 'pricing', 'launch'],
    integrations: ['Mindbody', 'Booker', 'Vagaro', 'Zenoti', 'Mangomint', 'Square', 'WhatsApp Business'],
    conversationTurns: [
      { from: 'them', id: 't1' },
      { from: 'us', id: 't2' },
      { from: 'them', id: 't3' },
      { from: 'us', id: 't4' },
    ],
  },
  medspa: {
    slug: 'medspa',
    accent: 'pine',
    painKeys: ['leadDecay', 'noShows', 'qualification', 'compliance'],
    roleKeys: ['leadQualifier', 'consultBooking', 'prepReminders', 'reEngagement', 'humanHandoff'],
    outcomeKeys: ['leadResponse', 'consultConversion', 'noShowReduction'],
    faqKeys: ['compliance', 'qualification', 'integrations', 'humanEscalation', 'pricing', 'launch'],
    integrations: ['Boulevard', 'Mindbody', 'Vagaro', 'Zenoti', 'GoHighLevel', 'HubSpot', 'Aesthetics Pro', 'Stripe', 'Cal.com'],
    conversationTurns: [
      { from: 'them', id: 't1' },
      { from: 'us', id: 't2' },
      { from: 'them', id: 't3' },
      { from: 'us', id: 't4' },
      { from: 'us', id: 't5' },
    ],
  },
  'dental-clinic': {
    slug: 'dental-clinic',
    accent: 'basil',
    painKeys: ['overdueRecall', 'noShows', 'insuranceFriction', 'afterHours'],
    roleKeys: ['voiceReceptionist', 'recallReactivation', 'insurancePrecheck', 'reminders', 'emergencyTriage'],
    outcomeKeys: ['noShowReduction', 'reactivation', 'recallRevenue'],
    faqKeys: ['insurance', 'recall', 'emergency', 'integrations', 'pricing', 'launch'],
    integrations: ['Dentrix', 'Open Dental', 'Eaglesoft', 'Curve', 'Carestack', 'Dentally', 'Cal.com'],
    conversationTurns: [
      { from: 'them', id: 't1' },
      { from: 'us', id: 't2' },
      { from: 'them', id: 't3' },
      { from: 'us', id: 't4' },
    ],
  },
  physiotherapy: {
    slug: 'physiotherapy',
    accent: 'frog',
    painKeys: ['packageDropoff', 'hepAdherence', 'noShows', 'recall'],
    roleKeys: ['voiceReceptionist', 'sessionReminders', 'hepReminders', 'packageManagement', 'recallReactivation'],
    outcomeKeys: ['noShowReduction', 'adherenceLift', 'packageCompletion'],
    faqKeys: ['hep', 'packageManagement', 'integrations', 'escalation', 'pricing', 'launch'],
    integrations: ['Cliniko', 'Jane App', 'WebPT', 'ClinicSense', 'Mindbody', 'Calendly', 'WhatsApp Business'],
    conversationTurns: [
      { from: 'them', id: 't1' },
      { from: 'us', id: 't2' },
      { from: 'them', id: 't3' },
      { from: 'us', id: 't4' },
    ],
  },
  veterinary: {
    slug: 'veterinary',
    accent: 'forest',
    painKeys: ['afterHoursEmergencies', 'vaccinationsForgotten', 'multiPet', 'noShows'],
    roleKeys: ['voiceReceptionist', 'emergencyTriage', 'vaccinationReminders', 'multiPetManagement', 'vetEscalation'],
    outcomeKeys: ['emergenciesTriaged', 'vaccinationCompliance', 'noShowReduction'],
    faqKeys: ['emergencyTriage', 'multiPet', 'vaccinations', 'integrations', 'pricing', 'launch'],
    integrations: ['AVImark', 'Cornerstone', 'eVetPractice', 'Provet Cloud', 'ezyVet', 'WhatsApp Business'],
    conversationTurns: [
      { from: 'them', id: 't1' },
      { from: 'us', id: 't2' },
      { from: 'them', id: 't3' },
      { from: 'us', id: 't4' },
    ],
  },
  pharmacy: {
    slug: 'pharmacy',
    accent: 'forest',
    painKeys: ['repetitiveQuestions', 'refills', 'whatsappChaos', 'clinicalLine'],
    roleKeys: ['whatsappAssistant', 'refillManager', 'photoPrescription', 'serviceCapture', 'pharmacistEscalation'],
    outcomeKeys: ['questionsHandled', 'adherence', 'responseTime'],
    faqKeys: ['clinicalEscalation', 'integrations', 'photoPrescription', 'compliance', 'pricing', 'launch'],
    integrations: ['Farmatic', 'Unycop Win', 'Nixfarma', 'Bitfarma', 'WhatsApp Business', 'Stripe'],
    conversationTurns: [
      { from: 'them', id: 't1' },
      { from: 'us', id: 't2' },
      { from: 'them', id: 't3' },
      { from: 'us', id: 't4' },
    ],
  },
  'language-school': {
    slug: 'language-school',
    accent: 'pine',
    painKeys: ['trialConversion', 'parentQuestions', 'retention', 'multilingual'],
    roleKeys: ['enrollmentQualifier', 'trialBooking', 'parentFaq', 'retentionReminders', 'multilingualSupport'],
    outcomeKeys: ['trialToEnroll', 'parentQuestionsHandled', 'retentionLift'],
    faqKeys: ['multilingual', 'parentCommunication', 'enrollment', 'integrations', 'pricing', 'launch'],
    integrations: ['Google Calendar', 'Calendly', 'Stripe', 'Mailchimp', 'WhatsApp Business', 'HubSpot'],
    conversationTurns: [
      { from: 'them', id: 't1' },
      { from: 'us', id: 't2' },
      { from: 'them', id: 't3' },
      { from: 'us', id: 't4' },
    ],
  },
};

export function isVerticalSlug(value: string): value is VerticalSlug {
  return (VERTICAL_SLUGS as readonly string[]).includes(value);
}

export function getVerticalConfig(slug: VerticalSlug): VerticalConfig {
  return VERTICAL_CONFIG[slug];
}
