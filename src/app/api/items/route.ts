import { NextRequest, NextResponse } from 'next/server';
import { initDb, getAllItems, addItem, getItemById } from '@/lib/db';
import { BrainItem } from '@/lib/types';

let initialized = false;

function ensureDb() {
  if (!initialized) {
    initDb();
    initialized = true;
  }
}

export async function GET() {
  ensureDb();
  const items = getAllItems();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  ensureDb();
  try {
    const body = await request.json();
    // accepteer zowel een enkel item als een array
    const items: BrainItem[] = Array.isArray(body) ? body : [body];
    for (const item of items) {
      if (!item.id || !item.type || !item.title) {
        return NextResponse.json(
          { error: 'id, type en title zijn verplicht' },
          { status: 400 }
        );
      }
      if (getItemById(item.id)) continue; // idempotent: skip bestaande
      addItem(item);
    }
    return NextResponse.json({ ok: true, added: items.length });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'onbekende fout' },
      { status: 500 }
    );
  }
}
