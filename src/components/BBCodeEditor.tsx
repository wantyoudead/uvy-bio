import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Palette,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Code as CodeIcon,
  RemoveFormatting,
  Eye,
  Edit3,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { BBCodeRenderer } from './BBCodeRenderer';

interface BBCodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minRows?: number;
  allowQuoteOption?: boolean;
  isQuoteChecked?: boolean;
  onToggleQuoteOption?: (checked: boolean) => void;
  quoteTargetAuthor?: string;
  quoteTargetText?: string;
}

const PRESET_COLORS = [
  { name: 'Gold / Yellow', hex: '#facc15' },
  { name: 'Crimson Red', hex: '#ef4444' },
  { name: 'Neon Emerald', hex: '#10b981' },
  { name: 'Cyan Blue', hex: '#06b6d4' },
  { name: 'Royal Purple', hex: '#a855f7' },
  { name: 'Hot Pink', hex: '#ec4899' },
  { name: 'Pure White', hex: '#ffffff' }
];

const PRESET_SCREENSHOTS = [
  {
    name: 'Cosmic Bio Showcase',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop&q=80',
    tag: 'Setup'
  },
  {
    name: 'Cyberpunk Code Terminal',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&fit=crop&q=80',
    tag: 'Code'
  },
  {
    name: 'Neon Ambient Soundboard',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&fit=crop&q=80',
    tag: 'Audio'
  },
  {
    name: 'Minimal Dark Desktop',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&fit=crop&q=80',
    tag: 'Desktop'
  }
];

export function BBCodeEditor({
  value,
  onChange,
  placeholder = 'Type your message with rich BBCode & images...',
  minRows = 5,
  allowQuoteOption = false,
  isQuoteChecked = false,
  onToggleQuoteOption,
  quoteTargetAuthor,
  quoteTargetText
}: BBCodeEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedColor, setSelectedColor] = useState('#facc15');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to wrap selected text with BBCode tags
  const wrapSelection = (openTag: string, closeTag: string, defaultText: string = 'text') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;

    const selected = currentText.substring(start, end) || defaultText;
    const replacement = `${openTag}${selected}${closeTag}`;

    const newText = currentText.substring(0, start) + replacement + currentText.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, start + openTag.length + selected.length);
    }, 0);
  };

  // Strip all BBCode tags
  const handleRemoveFormatting = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;

    if (start === end) {
      // Clean everything
      const cleaned = currentText.replace(/\[\/?(b|i|u|color|quote|code|img|url)[^\]]*\]/gi, '');
      onChange(cleaned);
    } else {
      const selected = currentText.substring(start, end);
      const cleanedSelected = selected.replace(/\[\/?(b|i|u|color|quote|code|img|url)[^\]]*\]/gi, '');
      const newText = currentText.substring(0, start) + cleanedSelected + currentText.substring(end);
      onChange(newText);
    }
  };

  const handleInsertImage = (url: string) => {
    if (!url.trim()) return;
    wrapSelection(`[img]${url.trim()}[/img]`, '', '');
    setIsImageModalOpen(false);
    setCustomImageUrl('');
  };

  const handleInsertLink = () => {
    const url = prompt('Enter Web Link URL:', 'https://');
    if (url) {
      wrapSelection(`[url=${url}]`, `[/url]`, 'click here');
    }
  };

  return (
    <div className="w-full flex flex-col rounded-xl border border-white/20 bg-zinc-950 overflow-hidden shadow-xl text-xs font-sans">
      {/* =========================================================================
          AUTHENTIC UNKNOWNCHEATS BBCODE TOOLBAR (Directly matching user image)
          ========================================================================= */}
      <div className="px-3 py-2 bg-zinc-900 border-b border-white/10 flex items-center justify-between flex-wrap gap-2 select-none">
        <div className="flex items-center gap-1 flex-wrap">
          {/* 1. Remove Formatting */}
          <button
            type="button"
            onClick={handleRemoveFormatting}
            title="Remove Formatting"
            className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-red-400 transition-colors cursor-pointer relative"
          >
            <RemoveFormatting className="w-4 h-4 text-red-400" />
          </button>

          <span className="w-[1px] h-4 bg-white/15 mx-0.5" />

          {/* 2. Bold */}
          <button
            type="button"
            onClick={() => wrapSelection('[b]', '[/b]', 'bold text')}
            title="Bold [b]"
            className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer font-black"
          >
            <Bold className="w-4 h-4" />
          </button>

          {/* 3. Italic */}
          <button
            type="button"
            onClick={() => wrapSelection('[i]', '[/i]', 'italic text')}
            title="Italic [i]"
            className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer italic"
          >
            <Italic className="w-4 h-4" />
          </button>

          {/* 4. Underline */}
          <button
            type="button"
            onClick={() => wrapSelection('[u]', '[/u]', 'underlined text')}
            title="Underline [u]"
            className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <Underline className="w-4 h-4" />
          </button>

          <span className="w-[1px] h-4 bg-white/15 mx-0.5" />

          {/* 5. Font Color Picker (A with color bar underneath) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
              title="Font Color"
              className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-0.5"
            >
              <div className="flex flex-col items-center">
                <span className="font-bold text-xs leading-none">A</span>
                <span className="w-3 h-1 rounded-sm mt-0.5" style={{ backgroundColor: selectedColor }} />
              </div>
              <ChevronDown className="w-3 h-3 text-white/40" />
            </button>

            {isColorMenuOpen && (
              <div className="absolute top-full left-0 mt-1 z-30 p-2 rounded-xl bg-zinc-950 border border-white/20 shadow-2xl flex flex-col gap-1 w-36">
                <span className="text-[10px] text-white/40 font-mono uppercase px-1">Select Color</span>
                {PRESET_COLORS.map((col) => (
                  <button
                    key={col.hex}
                    type="button"
                    onClick={() => {
                      setSelectedColor(col.hex);
                      wrapSelection(`[color=${col.hex}]`, `[/color]`, 'colored text');
                      setIsColorMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 text-left text-[11px] text-white/80 cursor-pointer"
                  >
                    <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: col.hex }} />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="w-[1px] h-4 bg-white/15 mx-0.5" />

          {/* 6. Insert Link (Globe with chain) */}
          <button
            type="button"
            onClick={handleInsertLink}
            title="Insert Link [url]"
            className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <LinkIcon className="w-4 h-4 text-sky-400" />
          </button>

          {/* 7. Insert Image (Picture icon) */}
          <button
            type="button"
            onClick={() => setIsImageModalOpen(true)}
            title="Insert Image [img]"
            className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-300 font-bold hidden sm:inline">+ Pic</span>
          </button>

          {/* 8. Insert Quote Bubble */}
          <button
            type="button"
            onClick={() => wrapSelection('[quote]', '[/quote]', 'Quote message...')}
            title="Wrap in [quote]"
            className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <Quote className="w-4 h-4 text-amber-400" />
          </button>

          {/* 9. Insert Code Snippet (#) */}
          <button
            type="button"
            onClick={() => wrapSelection('[code]', '[/code]', '// Paste code here')}
            title="Code Snippet [code]"
            className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer font-mono font-bold"
          >
            <CodeIcon className="w-4 h-4 text-purple-400" />
          </button>
        </div>

        {/* View mode toggle (Write / Preview) */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/60 border border-white/10">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
              !isPreview ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
              isPreview ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MAIN TEXTAREA OR LIVE PREVIEW
          ========================================================================= */}
      {!isPreview ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={minRows}
          className="w-full p-4 bg-zinc-950 text-white text-xs leading-relaxed outline-none resize-y border-none font-mono placeholder:text-white/30 focus:ring-1 focus:ring-purple-500/50"
        />
      ) : (
        <div className="p-4 bg-black/80 min-h-[120px] overflow-y-auto">
          {value.trim() ? (
            <BBCodeRenderer content={value} />
          ) : (
            <span className="text-white/30 italic">Nothing to preview yet. Write some text above.</span>
          )}
        </div>
      )}

      {/* =========================================================================
          OPTIONS FOOTER (Matching user screenshot: "Quote message in reply?")
          ========================================================================= */}
      <div className="p-3 bg-zinc-900/90 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          {allowQuoteOption && (
            <label className="flex items-center gap-2 cursor-pointer text-white/80 hover:text-white select-none">
              <input
                type="checkbox"
                checked={isQuoteChecked}
                onChange={(e) => {
                  if (onToggleQuoteOption) onToggleQuoteOption(e.target.checked);
                  if (e.target.checked && quoteTargetText) {
                    const quoteBlock = `[quote=${quoteTargetAuthor || 'Author'}]\n${quoteTargetText}\n[/quote]\n\n`;
                    onChange(quoteBlock + value);
                  }
                }}
                className="w-3.5 h-3.5 rounded border border-white/20 bg-black accent-purple-500 cursor-pointer"
              />
              <span className="font-semibold text-[11px]">Quote message in reply?</span>
            </label>
          )}

          {/* Quick preset screenshots button */}
          <button
            type="button"
            onClick={() => setIsImageModalOpen(true)}
            className="text-[11px] text-purple-300 hover:text-purple-200 flex items-center gap-1 font-mono cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>+ Attach Setup Picture / Screenshot</span>
          </button>
        </div>

        <span className="text-[10px] text-white/40 font-mono">
          BBCode Supported: [b], [i], [u], [color], [img], [code], [quote]
        </span>
      </div>

      {/* =========================================================================
          IMAGE ATTACHMENT MODAL
          ========================================================================= */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-5 rounded-2xl bg-zinc-950 border border-white/20 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Add Picture to Post</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="text-white/40 hover:text-white p-1 text-xs"
              >
                ✕
              </button>
            </div>

            {/* Custom URL Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-white/70">Image Web URL (Direct Link)</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or https://i.imgur.com/..."
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-white/15 text-xs text-white outline-none focus:border-purple-400"
                />
                <button
                  type="button"
                  onClick={() => handleInsertImage(customImageUrl)}
                  disabled={!customImageUrl.trim()}
                  className="px-3 py-1.5 rounded-lg bg-white text-black font-bold text-xs hover:bg-white/90 disabled:opacity-40 transition-all cursor-pointer"
                >
                  Insert
                </button>
              </div>
            </div>

            {/* Quick Preset Showcase Screenshots */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <span className="text-[11px] text-white/50 font-mono">Or choose a showcase screenshot preset:</span>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_SCREENSHOTS.map((scr) => (
                  <button
                    key={scr.name}
                    type="button"
                    onClick={() => handleInsertImage(scr.url)}
                    className="p-2 rounded-xl bg-black/60 border border-white/10 hover:border-purple-400/60 transition-all flex flex-col gap-1.5 text-left group cursor-pointer"
                  >
                    <div className="w-full h-16 rounded-lg overflow-hidden relative">
                      <img src={scr.url} alt={scr.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-black/70 text-[9px] text-white/80 font-mono">
                        {scr.tag}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-white/80 group-hover:text-purple-300 truncate">
                      {scr.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
