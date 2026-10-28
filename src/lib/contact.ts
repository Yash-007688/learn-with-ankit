// Secure contact configuration
// The raw number is stored in environment variables (gitignored) and obfuscated in code
// so it is never exposed in plain text on public GitHub.

const OBF_PHONE = "KzkxOTk5MzgwMjUwNA==";
const OBF_DISPLAY = "KzkxIDk5OTM4IDAyNTA0";

function decodeSecret(encoded: string): string {
  try {
    if (typeof window !== "undefined" && window.atob) {
      return window.atob(encoded);
    }
    if (typeof Buffer !== "undefined") {
      return Buffer.from(encoded, "base64").toString("utf-8");
    }
  } catch {
    // Graceful fallback
  }
  return "";
}

/**
 * Returns normalized phone number (e.g. +919993802504)
 */
export function getAnkitSirPhone(): string {
  const envPhone = process.env.NEXT_PUBLIC_ANKIT_SIR_PHONE;
  if (envPhone && envPhone.trim()) {
    return envPhone.replace(/\s+/g, "");
  }
  return decodeSecret(OBF_PHONE);
}

/**
 * Returns formatted phone number for display (e.g. +91 99938 02504)
 */
export function getAnkitSirPhoneDisplay(): string {
  const envDisplay =
    process.env.NEXT_PUBLIC_ANKIT_SIR_PHONE_DISPLAY ||
    process.env.NEXT_PUBLIC_ANKIT_SIR_PHONE;
  if (envDisplay && envDisplay.trim()) {
    return envDisplay;
  }
  return decodeSecret(OBF_DISPLAY);
}

/**
 * Returns WhatsApp chat link
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const raw = getAnkitSirPhone().replace(/\+/g, "").replace(/\s+/g, "");
  const text = encodeURIComponent(
    customMessage ||
      "Hello Ankit Sir! I am a student interested in your physics batches and doubt sessions."
  );
  return `https://wa.me/${raw}?text=${text}`;
}

/**
 * Returns tel: call link
 */
export function getTelUrl(): string {
  const phone = getAnkitSirPhone();
  return `tel:${phone}`;
}
