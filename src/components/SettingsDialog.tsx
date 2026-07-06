'use client';

import { useState, useEffect } from 'react';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { id: 'light', name: 'Light', colors: { bg: '#ffffff', text: '#171717', accent: '#3b82f6' } },
  { id: 'dark', name: 'Dark', colors: { bg: '#0a0a0a', text: '#ededed', accent: '#60a5fa' } },
  { id: 'ocean', name: 'Ocean', colors: { bg: '#0c1929', text: '#e2e8f0', accent: '#0ea5e9' } },
  { id: 'forest', name: 'Forest', colors: { bg: '#1a1f16', text: '#e2e8f0', accent: '#22c55e' } },
  { id: 'sunset', name: 'Sunset', colors: { bg: '#1f1410', text: '#f5e6d3', accent: '#f97316' } },
  { id: 'rose', name: 'Rose', colors: { bg: '#1a0a10', text: '#fce7f3', accent: '#f43f5e' } },
];

export default function SettingsDialog({ isOpen, onClose, onThemeChange }: SettingsDialogProps) {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('medium');
  const [compactMode, setCompactMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('brain-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setCurrentTheme(settings.theme || 'dark');
      setFontSize(settings.fontSize || 'medium');
      setCompactMode(settings.compactMode || false);
    }
  }, []);

  const saveSettings = (theme: string, size: string, compact: boolean) => {
    const settings = { theme, fontSize: size, compactMode: compact };
    localStorage.setItem('brain-settings', JSON.stringify(settings));
    onThemeChange(theme);
  };

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    saveSettings(themeId, fontSize, compactMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b dark:border-zinc-700">
          <h2 className="text-xl font-semibold dark:text-white">Settings</h2>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Theme Selection */}
          <div>
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    currentTheme === theme.id
                      ? 'border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <div
                    className="h-10 rounded-lg mb-2"
                    style={{ background: theme.colors.bg }}
                  />
                  <div
                    className="text-xs font-medium"
                    style={{ color: theme.colors.text }}
                  >
                    {theme.name}
                  </div>
                  <div
                    className="w-3 h-3 rounded-full mt-2"
                    style={{ background: theme.colors.accent }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">Font Size</h3>
            <div className="flex gap-2">
              {['small', 'medium', 'large'].map(size => (
                <button
                  key={size}
                  onClick={() => { setFontSize(size); saveSettings(currentTheme, size, compactMode); }}
                  className={`flex-1 py-2 px-4 rounded-lg border capitalize ${
                    fontSize === size
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Compact Mode */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
            <div>
              <h3 className="font-medium dark:text-white">Compact Mode</h3>
              <p className="text-sm text-zinc-500">Show more items with less spacing</p>
            </div>
            <button
              onClick={() => { setCompactMode(!compactMode); saveSettings(currentTheme, fontSize, !compactMode); }}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                compactMode ? 'bg-blue-500' : 'bg-zinc-300 dark:bg-zinc-600'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                compactMode ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Data Management */}
          <div>
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">Data</h3>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 text-left border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200">
                Export Data (JSON)
              </button>
              <button className="w-full py-2 px-4 text-left border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200">
                Import Data
              </button>
              <button className="w-full py-2 px-4 text-left border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                Clear All Data
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t dark:border-zinc-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}