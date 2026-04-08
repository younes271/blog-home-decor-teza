// CookieConsent — GDPR banner with accept/decline stored in localStorage
// Requirements: 15.10
// When declined, GA and ad scripts must not initialize (Property 43).

'use client';

import React, { useState, useEffect, useCallback } from 'react';

const CONSENT_KEY = 'cookie-consent';

export type ConsentStatus = 'accepted' | 'declined' | 'pending';

/** Read consent status from localStorage. Returns 'pending' if not set. */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === 'accepted' || value === 'declined') return value;
  return 'pending';
}

/** Write consent status to localStorage. */
export function setConsentStatus(status: 'accepted' | 'declined'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_KEY, status);
}

/** Returns true only when the user has explicitly accepted cookies. */
export function hasConsent(): boolean {
  return getConsentStatus() === 'accepted';
}

export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>('accepted');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const current = getConsentStatus();
    setStatus(current);
    if (current === 'pending') {
      setVisible(true);
    }
  }, []);

  const handleAccept = useCallback(() => {
    setConsentStatus('accepted');
    setStatus('accepted');
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    setConsentStatus('declined');
    setStatus('declined');
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border p-4 shadow-lg"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-text flex-1">
          We use cookies for analytics and advertising. You can accept or decline non-essential cookies.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-border rounded-theme text-textMuted hover:bg-surfaceHover transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-theme hover:bg-primaryHover transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
