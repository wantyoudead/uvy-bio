import React, { useState } from 'react';
import { ExternalLink, Copy, Check, MessageSquareCode, Image as ImageIcon } from 'lucide-react';

interface BBCodeRendererProps {
  content: string;
  className?: string;
}

export function BBCodeRenderer({ content, className = '' }: BBCodeRendererProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Parse custom BBCode into structured React nodes
  const renderParsedContent = (rawText: string) => {
    if (!rawText) return null;

    // Split text by block elements: [quote]...[/quote], [code]...[/code], [img]...[/img]
    const blockRegex = /(\[quote(?:=[^\]]+)?\][\s\S]*?\[\/quote\]|\[code\][\s\S]*?\[\/code\]|\[img\][\s\S]*?\[\/img\])/gi;
    const parts = rawText.split(blockRegex);

    return parts.map((part, index) => {
      // 1. [img]url[/img]
      const imgMatch = part.match(/^\[img\]([\s\S]*?)\[\/img\]$/i);
      if (imgMatch) {
        const url = imgMatch[1].trim();
        return (
          <div key={`img-${index}`} className="my-3 group relative inline-block max-w-full">
            <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black/60 shadow-xl">
              <img
                src={url}
                alt="Forum attachment"
                className="max-h-72 max-w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] cursor-zoom-in"
                onClick={() => setSelectedImage(url)}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=300&fit=crop&q=80';
                }}
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-white/70 font-mono flex items-center gap-1 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <ImageIcon className="w-3 h-3" />
                <span>Click to view full size</span>
              </div>
            </div>
          </div>
        );
      }

      // 2. [code]...[/code]
      const codeMatch = part.match(/^\[code\]([\s\S]*?)\[\/code\]$/i);
      if (codeMatch) {
        const codeText = codeMatch[1].trim();
        return (
          <div
            key={`code-${index}`}
            className="my-3 rounded-xl bg-black border border-white/15 overflow-hidden shadow-2xl font-mono text-xs"
          >
            <div className="px-3.5 py-1.5 bg-zinc-900 border-b border-white/10 flex items-center justify-between text-[11px] text-white/50">
              <span className="flex items-center gap-1.5 font-bold text-purple-300">
                <MessageSquareCode className="w-3.5 h-3.5" />
                <span>Source Code / Config</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(codeText);
                    setCopiedCodeIndex(index);
                    setTimeout(() => setCopiedCodeIndex(null), 2000);
                  }
                }}
                className="flex items-center gap-1 text-[10px] text-white/60 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                {copiedCodeIndex === index ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-emerald-300 overflow-x-auto text-xs leading-relaxed selection:bg-purple-900 selection:text-white">
              <code>{codeText}</code>
            </pre>
          </div>
        );
      }

      // 3. [quote=Author]...[/quote] or [quote]...[/quote]
      const quoteMatch = part.match(/^\[quote(?:=([^\]]+))?\]([\s\S]*?)\[\/quote\]$/i);
      if (quoteMatch) {
        const author = quoteMatch[1] ? quoteMatch[1].trim() : 'Community Member';
        const quoteBody = quoteMatch[2].trim();
        return (
          <div
            key={`quote-${index}`}
            className="my-3 p-3.5 rounded-xl bg-zinc-950/80 border-l-4 border-purple-500 border-y border-r border-white/10 shadow-lg text-xs"
          >
            <div className="font-bold text-[11px] text-purple-300 mb-1.5 flex items-center gap-1.5">
              <span>💬 Originally Posted by {author}</span>
            </div>
            <div className="italic text-white/80 leading-relaxed pl-2 border-l border-white/10">
              {renderInlineBBCode(quoteBody)}
            </div>
          </div>
        );
      }

      // Normal text with inline formatting ([b], [i], [u], [color], [url])
      return <span key={`text-${index}`}>{renderInlineBBCode(part)}</span>;
    });
  };

  // Parse inline elements
  const renderInlineBBCode = (text: string): React.ReactNode => {
    if (!text) return '';

    // Handle line breaks
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      // Inline parser loop for [b], [i], [u], [color=...], [url=...]
      const inlineRegex = /(\[b\][\s\S]*?\[\/b\]|\[i\][\s\S]*?\[\/i\]|\[u\][\s\S]*?\[\/u\]|\[color=[^\]]+\][\s\S]*?\[\/color\]|\[url=[^\]]+\][\s\S]*?\[\/url\])/gi;
      const tokens = line.split(inlineRegex);

      return (
        <React.Fragment key={`line-${lineIdx}`}>
          {tokens.map((token, tIdx) => {
            // [b]...[/b]
            const boldMatch = token.match(/^\[b\]([\s\S]*?)\[\/b\]$/i);
            if (boldMatch) {
              return <strong key={tIdx} className="font-extrabold text-white">{renderInlineBBCode(boldMatch[1])}</strong>;
            }

            // [i]...[/i]
            const italicMatch = token.match(/^\[i\]([\s\S]*?)\[\/i\]$/i);
            if (italicMatch) {
              return <em key={tIdx} className="italic text-white/90">{renderInlineBBCode(italicMatch[1])}</em>;
            }

            // [u]...[/u]
            const underlineMatch = token.match(/^\[u\]([\s\S]*?)\[\/u\]$/i);
            if (underlineMatch) {
              return <span key={tIdx} className="underline decoration-purple-400 decoration-1 underline-offset-2">{renderInlineBBCode(underlineMatch[1])}</span>;
            }

            // [color=#ff0077]...[/color]
            const colorMatch = token.match(/^\[color=([^\]]+)\]([\s\S]*?)\[\/color\]$/i);
            if (colorMatch) {
              const colorVal = colorMatch[1];
              return (
                <span key={tIdx} style={{ color: colorVal }} className="font-semibold drop-shadow-sm">
                  {renderInlineBBCode(colorMatch[2])}
                </span>
              );
            }

            // [url=...]...[/url]
            const urlMatch = token.match(/^\[url=([^\]]+)\]([\s\S]*?)\[\/url\]$/i);
            if (urlMatch) {
              return (
                <a
                  key={tIdx}
                  href={urlMatch[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline inline-flex items-center gap-0.5"
                >
                  <span>{urlMatch[2]}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              );
            }

            return token;
          })}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={`leading-relaxed text-xs text-white/85 ${className}`}>
      {renderParsedContent(content)}

      {/* Fullscreen Lightbox Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            <img src={selectedImage} alt="Enlarged view" className="w-full h-full object-contain" />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 text-xs text-white/80 font-mono backdrop-blur-sm">
              Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
