// useNewsletterForm — shared async form submission logic for newsletter components
// Requirements: 19.1, 19.2, 19.3

'use client';

import { useState, useCallback, type FormEvent } from 'react';
import config from '@/site.config';

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface UseNewsletterFormReturn {
  status: SubmitStatus;
  errorMessage: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => void;
}

/**
 * Provider-agnostic newsletter form submission hook.
 * Submits to `config.newsletter.formAction` via fetch (no full page reload).
 * Supports convertkit, mailchimp, beehiiv, buttondown, and custom providers.
 */
export function useNewsletterForm(): UseNewsletterFormReturn {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const reset = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { formAction, provider } = config.newsletter;

    if (!formAction) {
      setStatus('error');
      setErrorMessage('Newsletter form action is not configured.');
      return;
    }

    try {
      const res = await fetch(formAction, {
        method: 'POST',
        body: provider === 'custom' ? formData : JSON.stringify(Object.fromEntries(formData)),
        headers: provider === 'custom' ? undefined : { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`Subscription failed (${res.status})`);
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }, []);

  return { status, errorMessage, handleSubmit, reset };
}
