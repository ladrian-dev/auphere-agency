/**
 * Small editorial icons used inside agent role cards. One per role key
 * across all verticals. Designed to feel consistent — single-stroke,
 * 24px, rounded line caps. New roles can be added by extending the map.
 */

interface Props {
  role: string;
  size?: number;
}

export function RoleIcon({ role, size = 22 }: Props) {
  const Icon = ROLE_ICONS[role] ?? GenericAgentIcon;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <Icon />
    </svg>
  );
}

const ROLE_ICONS: Record<string, () => React.ReactElement> = {
  voiceReceptionist: () => (
    <g>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </g>
  ),
  whatsappBookings: () => (
    <g>
      <path d="M4 20l1.5-4a8 8 0 1 1 3 3L4 20Z" />
      <path d="M9 11c.5 1.5 2 3 3.5 3.5" />
    </g>
  ),
  reminders: () => (
    <g>
      <path d="M12 3v3" />
      <path d="M6 9a6 6 0 0 1 12 0v4l2 3H4l2-3Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </g>
  ),
  waitlist: () => (
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </g>
  ),
  reviewCapture: () => (
    <g>
      <path d="M12 3l2.5 5.5L20 9l-4.2 3.8L17 19l-5-3-5 3 1.2-6.2L4 9l5.5-.5Z" />
    </g>
  ),
  leadQualifier: () => (
    <g>
      <path d="M11 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
      <path d="M11 9l-5 3 5 3" />
      <path d="M6 12h7" />
    </g>
  ),
  consultBooking: () => (
    <g>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <path d="M9 14l2 2 4-4" />
    </g>
  ),
  prepReminders: () => (
    <g>
      <path d="M4 6h12a4 4 0 0 1 0 8h-2" />
      <path d="M4 6v12" />
      <path d="M16 14l-4 4-2-2" />
    </g>
  ),
  reEngagement: () => (
    <g>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 4v5h-5" />
    </g>
  ),
  humanHandoff: () => (
    <g>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
      <path d="M16 8l3 3-3 3" />
      <path d="M19 11h-7" />
    </g>
  ),
  whatsappAssistant: () => (
    <g>
      <path d="M4 20l1.5-4a8 8 0 1 1 3 3L4 20Z" />
      <circle cx="10" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="13" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </g>
  ),
  refillManager: () => (
    <g>
      <path d="M8 3h8v3a4 4 0 0 1-4 4 4 4 0 0 1-4-4Z" />
      <path d="M9 21h6" />
      <path d="M12 10v11" />
    </g>
  ),
  photoPrescription: () => (
    <g>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="12" cy="13" r="3.5" />
      <path d="M7 6l1.5-2h7L17 6" />
    </g>
  ),
  serviceCapture: () => (
    <g>
      <path d="M4 10l8-6 8 6v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1Z" />
    </g>
  ),
  pharmacistEscalation: () => (
    <g>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
      <path d="M18 5v6M15 8h6" />
    </g>
  ),

  /* ── nail-salon ─────────────────────────────────────────── */
  priceFaq: () => (
    <g>
      <path d="M7 4h10l3 5-8 11-8-11Z" />
      <path d="M12 9v4M12 16v.5" />
    </g>
  ),
  technicianMatching: () => (
    <g>
      <circle cx="7" cy="8" r="2.5" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M3 19c0-2.5 2-4 4-4s4 1.5 4 4" />
      <path d="M13 19c0-2.5 2-4 4-4s4 1.5 4 4" />
      <path d="M9.5 8h5" />
    </g>
  ),
  loyaltyCapture: () => (
    <g>
      <path d="M12 20s-7-4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6-7 10-7 10Z" />
      <path d="M18 4l1 2 2 .3-1.5 1.4.4 2L18 8.7l-1.9 1 .4-2L15 6.3 17 6Z" />
    </g>
  ),

  /* ── spa ────────────────────────────────────────────────── */
  upsell: () => (
    <g>
      <path d="M5 18l5-6 4 4 5-9" />
      <path d="M14 7h5v5" />
    </g>
  ),
  giftCards: () => (
    <g>
      <rect x="3" y="9" width="18" height="11" rx="1.5" />
      <path d="M3 13h18" />
      <path d="M12 9v11" />
      <path d="M8.5 9c-2 0-2.5-3 0-3 1.5 0 3.5 3 3.5 3M15.5 9c2 0 2.5-3 0-3-1.5 0-3.5 3-3.5 3" />
    </g>
  ),

  /* ── dental-clinic ──────────────────────────────────────── */
  recallReactivation: () => (
    <g>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
      <circle cx="14" cy="13" r="2.2" />
      <path d="M14 15.2v2.3" />
    </g>
  ),
  insurancePrecheck: () => (
    <g>
      <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6Z" />
      <path d="M8.5 12l2.5 2.5L16 9.5" />
    </g>
  ),
  emergencyTriage: () => (
    <g>
      <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z" />
      <path d="M12 11v2" />
    </g>
  ),

  /* ── physiotherapy ──────────────────────────────────────── */
  sessionReminders: () => (
    <g>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <path d="M15 14a3 3 0 0 0-6 0v2l-1 2h8l-1-2Z" />
    </g>
  ),
  hepReminders: () => (
    <g>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v6" />
      <path d="M12 9l-5 3 4 3" />
      <path d="M12 9l5 3-4 3" />
      <path d="M9 14l-2 6M15 14l2 6" />
    </g>
  ),
  packageManagement: () => (
    <g>
      <path d="M4 7l8-4 8 4-8 4Z" />
      <path d="M4 7v10l8 4 8-4V7" />
      <path d="M12 11v10" />
      <path d="M8 9v5" />
    </g>
  ),

  /* ── veterinary ─────────────────────────────────────────── */
  vaccinationReminders: () => (
    <g>
      <path d="M15 3l6 6" />
      <path d="M12 6l6 6-7 7c-2 2-5 2-7 0s-2-5 0-7Z" />
      <path d="M8 14l2 2" />
    </g>
  ),
  multiPetManagement: () => (
    <g>
      <ellipse cx="7" cy="14" rx="2.5" ry="3" />
      <ellipse cx="4" cy="9" rx="1.5" ry="2" />
      <ellipse cx="10" cy="9" rx="1.5" ry="2" />
      <ellipse cx="17" cy="14" rx="2.5" ry="3" />
      <ellipse cx="14" cy="9" rx="1.5" ry="2" />
      <ellipse cx="20" cy="9" rx="1.5" ry="2" />
    </g>
  ),
  vetEscalation: () => (
    <g>
      <ellipse cx="9" cy="10" rx="3" ry="3.5" />
      <ellipse cx="6" cy="6" rx="1.5" ry="2" />
      <ellipse cx="12" cy="6" rx="1.5" ry="2" />
      <path d="M18 4v6M15 7h6" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
    </g>
  ),

  /* ── language-school ────────────────────────────────────── */
  enrollmentQualifier: () => (
    <g>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4v2h6V4" />
      <path d="M8 11l2 2 4-4" />
      <path d="M8 17h8" />
    </g>
  ),
  trialBooking: () => (
    <g>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <path d="M12 12l1.5 3 3 .4-2.2 2 .5 3-2.8-1.5L9.2 20.4l.5-3-2.2-2 3-.4Z" />
    </g>
  ),
  parentFaq: () => (
    <g>
      <circle cx="8" cy="7" r="2.5" />
      <path d="M3 16c0-2.5 2-4 5-4s5 1.5 5 4" />
      <path d="M14 5h7v6h-4l-2 2v-2h-1Z" />
    </g>
  ),
  retentionReminders: () => (
    <g>
      <path d="M12 20s-7-4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 4-3 7-5 8.5" />
      <path d="M20 14l1 4-4-1" />
    </g>
  ),
  multilingualSupport: () => (
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9Z" />
    </g>
  ),
};

function GenericAgentIcon() {
  return (
    <g>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 10h6M9 14h4" />
    </g>
  );
}
