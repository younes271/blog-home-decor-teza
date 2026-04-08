// NewsletterPopup — exit-intent newsletter modal
// Requirements: 19.1, 19.2, 19.3, 19.4

'use client';

import React, { useEffect, useRef } from 'react';
import config from '@/site.config';
import { useExitIntent } from '@/hooks/useExitIntent';
import { useNewsletterForm } from './useNewsletterForm';

/**
 * Exit-intent newsletter popup.
 * Shows when the user's mouse leaves the viewport (desktop).
 * Provider-agnostic — submits to config.newsletter.formAction.
 * Returns null when newsletter or exit intent is disabled.
 */
export function NewsletterPopup() {
  const { status, errorMessage, handleSubmit } = useNewsletterForm();
  const { showIntent, dismiss } = useExitIntent({ triggerOnce: true, delayMs: 5000 });
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = config.newsletter.enabled && config.newsletter.showExitIntent && showIntent;

  useEffect(() => {
    if (visible) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [visible]);

  if (!config.newsletter.enabled || !config.newsletter.showExitIntent) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-auto w-full max-w-md rounded-theme bg-surface border border-border p-0 shadow-xl backdrop:bg-black/50"
      onClose={dismiss}
      aria-label="Newsletter signup"
    >
      <div className="p-6">
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-3 right-3 text-textMuted hover:text-text transition-colors"
          aria-label="Close newsletter popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <p className="font-heading text-xl font-bold text-text mb-2 pr-6">
          {config.newsletter.title}
        </p>
        <p className="text-textMuted text-sm mb-3">
          {config.newsletter.description}
        </p>
        {config.newsletter.incentive && (
          <p className="text-sm font-medium text-primary mb-4">
            🎁 {config.newsletter.incentive}
          </p>
        )}

        {status === 'success' ? (
          <div className="text-center py-4">
            <p className="text-lg font-medium text-accent" role="status">
              ✓ You&apos;re subscribed!
            </p>
            <p className="text-sm text-textMuted mt-1">Check your inbox to confirm.</p>
            <button
              type="button"
              onClick={dismiss}
              className="mt-4 px-4 py-2 rounded-theme bg-primary text-textOnPrimary text-sm font-semibold hover:bg-primaryHover transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label htmlFor="newsletter-popup-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-popup-email"
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              disabled={status === 'submitting'}
              className="w-full px-3 py-2 rounded-theme border border-border bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full px-4 py-2 rounded-theme bg-primary text-textOnPrimary text-sm font-semibold hover:bg-primaryHover transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
            </button>
            {status === 'error' && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </dialog>
  );
}
