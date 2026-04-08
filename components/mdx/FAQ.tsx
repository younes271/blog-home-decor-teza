// FAQ — renders a list of question/answer pairs for MDX content
// Requirements: 11.4

'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
  title?: string;
  children?: React.ReactNode;
}

export function FAQ({ items, title = 'Frequently Asked Questions', children }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Support both items prop and children (FAQItem components)
  if (!items || items.length === 0) {
    return (
      <section className="my-8" aria-label={title}>
        {title && <h2 className="font-heading text-2xl font-bold text-text mb-4">{title}</h2>}
        {children}
      </section>
    );
  }

  return (
    <section className="my-8" aria-label={title}>
      {title && <h2 className="font-heading text-2xl font-bold text-text mb-4">{title}</h2>}
      <dl className="space-y-2">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border border-border rounded-theme overflow-hidden">
              <dt>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left font-heading font-semibold text-text bg-surface hover:bg-surfaceHover transition-colors"
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true" className="ml-2 text-textMuted">{isOpen ? '−' : '+'}</span>
                </button>
              </dt>
              <dd
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                hidden={!isOpen}
                className="px-4 py-3 text-sm text-textMuted bg-surface border-t border-border"
              >
                {item.answer}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
