// ErrorBoundary — catches rendering errors and shows a friendly fallback
// Requirements: 21.7

'use client';

import React, { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto text-center py-16 px-4">
          <h2 className="text-2xl font-heading font-bold text-text mb-4">
            Something went wrong
          </h2>
          <p className="text-muted mb-8">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-on-primary rounded-theme font-medium hover:bg-primary-hover transition-colors"
          >
            Back to homepage
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
