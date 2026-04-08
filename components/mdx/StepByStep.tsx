// StepByStep / Step — numbered step sequence for MDX how-to content
// Requirements: 11.4

import React from 'react';

interface StepByStepProps {
  title?: string;
  children: React.ReactNode;
}

interface StepProps {
  title: string;
  children: React.ReactNode;
  /** Step number — injected automatically by StepByStep via CSS counter */
  step?: number;
}

export function StepByStep({ title, children }: StepByStepProps) {
  return (
    <section className="my-8" aria-label={title ?? 'Steps'}>
      {title && (
        <h2 className="font-heading text-2xl font-bold text-text mb-6">{title}</h2>
      )}
      <ol className="space-y-6 list-none p-0 m-0">{children}</ol>
    </section>
  );
}

export function Step({ title, children, step }: StepProps) {
  return (
    <li className="flex gap-4">
      <div
        aria-hidden="true"
        className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-textOnPrimary font-heading font-bold text-sm flex items-center justify-center"
      >
        {step}
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="font-heading font-semibold text-text mb-2">{title}</p>
        <div className="text-sm text-textMuted">{children}</div>
      </div>
    </li>
  );
}
