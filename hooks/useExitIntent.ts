// useExitIntent — detects mouse leaving the viewport (exit intent)
// Requirements: 16.5

'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseExitIntentOptions {
  /** Only trigger once per session */
  triggerOnce?: boolean;
  /** Delay in ms before the listener activates (avoids false positives on page load) */
  delayMs?: number;
}

export function useExitIntent(options: UseExitIntentOptions = {}): {
  showIntent: boolean;
  dismiss: () => void;
} {
  const { triggerOnce = true, delayMs = 3000 } = options;
  const [showIntent, setShowIntent] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const dismiss = useCallback(() => {
    setShowIntent(false);
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (dismissed && triggerOnce) return;

    let active = false;
    const timer = setTimeout(() => { active = true; }, delayMs);

    function handleMouseLeave(e: MouseEvent) {
      if (!active) return;
      if (e.clientY <= 0) {
        setShowIntent(true);
        if (triggerOnce) active = false;
      }
    }

    document.addEventListener('mouseout', handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [dismissed, triggerOnce, delayMs]);

  return { showIntent, dismiss };
}
