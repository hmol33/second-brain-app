/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrainItem } from './types';

const DATA_FILE = './src/data/items.json';

// Simple in-memory storage for demo
// In production, use a database
let items: BrainItem[] = [];

export async function getAllItems(): Promise<BrainItem[]> {
  return items;
}

export async function getItemById(id: string): Promise<BrainItem | undefined> {
  return items.find(item => item.id === id);
}

export async function searchItems(query: string): Promise<BrainItem[]> {
  const q = query.toLowerCase();
  return items.filter(item => {
    if ('title' in item && item.title.toLowerCase().includes(q)) return true;
    if ('content' in item && item.content.toLowerCase().includes(q)) return true;
    if ('messages' in item) {
      return item.messages.some(m => m.content.toLowerCase().includes(q));
    }
    return false;
  });
}

export async function filterItems(type?: string, dateFrom?: string, dateTo?: string): Promise<BrainItem[]> {
  return items.filter(item => {
    if (type && item.type !== type) return false;
    if (dateFrom && item.createdAt < dateFrom) return false;
    if (dateTo && item.createdAt > dateTo) return false;
    return true;
  });
}

export async function addItem(item: BrainItem): Promise<BrainItem> {
  items.push(item);
  return item;
}

export function setItems(newItems: BrainItem[]) {
  items = newItems;
}