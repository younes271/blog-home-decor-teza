// PageContainer — wraps page content with optional sidebar
// Sidebar position driven by config.layout.sidebar.position ("left" | "right")
// Collapses to single column on mobile
// Requirements: 18.2, 18.3

import React from 'react';
import config from '@/site.config';
import { Sidebar } from './Sidebar';

interface PageContainerProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function PageContainer({ children, showSidebar = true }: PageContainerProps) {
  const sidebarEnabled = showSidebar && config.layout.sidebar.enabled;
  const sidebarPosition = config.layout.sidebar.position;

  if (!sidebarEnabled) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    );
  }

  const mainContent = (
    <div className="flex-1 min-w-0">{children}</div>
  );

  const sidebar = (
    <div className="w-full lg:w-80 shrink-0">
      <div className="lg:sticky lg:top-24">
        <Sidebar />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {sidebarPosition === 'left' ? (
          <>
            <div className="hidden lg:block">{sidebar}</div>
            {mainContent}
            <div className="lg:hidden">{sidebar}</div>
          </>
        ) : (
          <>
            {mainContent}
            {sidebar}
          </>
        )}
      </div>
    </div>
  );
}
