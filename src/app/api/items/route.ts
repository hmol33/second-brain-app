import { NextRequest, NextResponse } from 'next/server';
import { initDb, seedIfEmpty, getAllItems, searchItems } from '@/lib/db';

// better-sqlite3 is a native server module — only safe in a route handler.
initDb();
seedIfEmpty();

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q');
  try {
    const items = q ? searchItems(q) : getAllItems();
    return NextResponse.json(items);
  } catch (err) {
    console.error('[api/items]', err);
    return NextResponse.json({ error: 'db read failed' }, { status: 500 });
  }
}
