// Data types for Second Brain

export type MemoryType = 'note' | 'conversation' | 'memory';

export interface BaseItem {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Memory extends BaseItem {
  type: 'memory';
  title: string;
  content: string;
  tags: string[];
}

export interface Conversation extends BaseItem {
  type: 'conversation';
  title: string;
  participants: string[];
  messages: Message[];
}

export interface Note extends BaseItem {
  type: 'note';
  title: string;
  content: string;
  category?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type BrainItem = Memory | Conversation | Note;