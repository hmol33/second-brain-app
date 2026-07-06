'use client';

import { useState, useEffect, useRef } from 'react';
import { BrainItem } from '@/lib/types';

interface SearchDialogProps {
  items: BrainItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ items, isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BrainItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = items.filter(item => {
      if ('title' in item && item.title.toLowerCase().includes(q)) return true;
      if ('content' in item && item.content.toLowerCase().includes(q)) return true;
      return false;
    });
    setResults(filtered);
  }, [query, items]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-24 z-50" onClick={onClose}>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b dark:border-zinc-700">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search memories, notes, conversations..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full text-lg bg-transparent outline-none dark:text-white placeholder-zinc-400"
          />
        </div>
        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 && query && (
            <div className="p-4 text-center text-zinc-500">No results found</div>
          )}
          {results.map(item => (
            <div key={item.id} className="p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-b dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded">{item.type}</span>
                <span className="font-medium dark:text-white">{item.title}</span>
              </div>
              {'content' in item && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{item.content}</p>
              )}
            </div>
          ))}
        </div>
        <div className="p-2 border-t dark:border-zinc-700 text-xs text-zinc-500 flex justify-between">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
}