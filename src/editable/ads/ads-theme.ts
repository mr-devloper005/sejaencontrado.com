// ✏️ EDITABLE — theme the ads to match this site. Devs own this file.
// You control the LOOK here (radius, border, shadow, background, label color).
// You CANNOT change the ad's shape/fit from here — that stays locked in
// src/lib/ad-slots.ts, so the ad always displays correctly no matter what.

import type { AdSkin } from '@/lib/ads/ad-frame'

// Site-wide default skin — tune to your brand.
export const adSkin: AdSkin = {
  radius: '8px',
  border: '1px solid #d5d5d5',
  shadow: '0 18px 45px rgba(43,51,46,0.08)',
  background: '#fffdf2',
  labelClassName: 'bg-[#585e48] text-white',
}

// Optional per-slot overrides — adjust only where you need to.
export const adSkinBySlot: Partial<Record<string, AdSkin>> = {
  sidebar: { radius: '8px', shadow: 'none', border: '1px solid #d5d5d5' },
  popup: { radius: '8px' },
  header: { radius: '8px', background: '#fffef6' },
  rail: { radius: '8px' },
  feature: { radius: '8px' },
  interstitial: { radius: '8px', shadow: '0 20px 60px rgba(43,51,46,0.35)' },
  anchor: { radius: '8px', shadow: '0 6px 24px rgba(43,51,46,0.18)' },
}

/** Merge site default + per-slot override for a slot. */
export function skinFor(slot: string): AdSkin {
  return { ...adSkin, ...(adSkinBySlot[slot] ?? {}) }
}
