// Skeleton — loading placeholder primitive
// Requirements: 21.1

import React from 'react';
import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={clsx('animate-pulse bg-surface-hover rounded-theme', className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
