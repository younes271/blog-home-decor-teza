// app/api/revalidate/route.ts — on-demand ISR revalidation endpoint
// Requirements: 12.5, 12.6

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import config from '@/site.config';

interface RevalidateBody {
  secret: string;
  paths: string[];
}

export async function POST(request: NextRequest) {
  let body: RevalidateBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { secret, paths } = body;

  if (!secret || secret !== config.advanced.revalidationSecret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  if (!Array.isArray(paths) || paths.length === 0) {
    return NextResponse.json({ error: 'paths must be a non-empty array' }, { status: 400 });
  }

  for (const p of paths) {
    revalidatePath(p);
  }

  return NextResponse.json({ revalidated: true, paths });
}
