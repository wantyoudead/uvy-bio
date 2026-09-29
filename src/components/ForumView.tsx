import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Plus,
  ArrowUp,
  Send,
  X,
  FileText,
  CornerDownRight,
  ExternalLink,
  Quote
} from 'lucide-react';
import { ForumThread } from '../types';
import { AuthorForumCard } from './AuthorForumCard';
import { BBCodeRenderer } from './BBCodeRenderer';
import { BBCodeEditor } from './BBCodeEditor';

interface ForumProps {
  threads: ForumThread[];
  category: string;
  setCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  expandedThreadId: string | null;
  setExpandedThreadId: (id: string | null) => void;
  onUpvote: (id: string, e: React.MouseEvent) => void;
  onAddComment: (threadId: string, text: string) => void;
  onOpenNewThread: () => void;
  onViewProfile: (handle: string) => void;
}

export function ForumView({
  threads,
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
  expandedThreadId,
  setExpandedThreadId,
  onUpvote,
  onAddComment,
  onOpenNewThread,
  onViewProfile
}: ForumProps) {
  const [commentInput, setCommentInput] = useState('');
  const [isQuoteChecked, setIsQuoteChecked] = useState(false);

  const filteredThreads = threads.filter((t) => {
    const matchesCat = category === 'All' || t.category === category;
    const matchesSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleQuotePost = (authorName: string, textContent: string) => {
    // Strip nested quotes for clean quote embedding
    const cleanSnippet = textContent.replace(/\[quote[\s\S]*?\[\/quote\]/gi, '').trim().slice(0, 280);
    const quoteCode = `[quote=${authorName}]\n${cleanSnippet}\n[/quote]\n\n`;
    setCommentInput((prev) => quoteCode + prev);
    setIsQuoteChecked(true);

    // Scroll to reply composer
    const composer = document.getElementById('forum-reply-composer');
    if (composer) {
      composer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-5xl my-6 flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Forum Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
            uvy.bio Community & Developer Board
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Creator & Bio <span className="text-white/40 font-serif italic">Community Forum</span>
          </h2>
          <p className="text-xs text-white/60 mt-1 max-w-xl">
            Discussion boards, setup showcases, CSS tricks & rich BBCode posts with pictures, custom colors, and 3D spinning rank stars.
          </p>
        </div>

        <button
          onClick={onOpenNewThread}
          className="px-4 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all flex items-center gap-1.5 shadow-lg shadow-white/10 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-white/10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search discussions, author names, Godly effects, setups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-black border border-white/10 text-xs text-white placeholder-white/40 outline-none focus:border-purple-400"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Showcases', 'Themes & CSS', 'Audio & Music', 'General'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                category === cat
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Threads List */}
      <div className="flex flex-col gap-4">
        {filteredThreads.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-white/10 rounded-xl text-white/40 text-xs">
            No discussions found matching your filter criteria. Be the first to start a thread!
          </div>
        ) : (
          filteredThreads.map((thread) => {
            const isExpanded = expandedThreadId === thread.id;
            return (
              <div
                key={thread.id}
                className="rounded-xl bg-zinc-950/70 border border-white/15 overflow-hidden transition-all shadow-lg"
              >
                {/* UnknownCheats Header Bar */}
                <div className="px-4 py-2 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                    <span>{thread.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400 font-semibold">{thread.category}</span>
                    <span className="text-white/30">#thread-{thread.id}</span>
                  </div>
                </div>

                {/* Collapsed Preview vs Expanded Full Post Layout */}
                {!isExpanded ? (
                  <div
                    onClick={() => setExpandedThreadId(thread.id)}
                    className="p-4 flex items-start gap-4 hover:bg-white/[0.02] cursor-pointer transition-colors"
                  >
                    {/* Upvote Button */}
                    <button
                      onClick={(e) => onUpvote(thread.id, e)}
                      className={`flex flex-col items-center justify-center w-11 h-12 rounded-lg border transition-all flex-shrink-0 cursor-pointer ${
                        thread.hasUpvoted
                          ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                          : 'bg-black border-white/10 text-white/50 hover:text-white hover:border-white/25'
                      }`}
                    >
                      <ArrowUp className="w-4 h-4" />
                      <span className="text-[11px] font-bold font-mono">{thread.upvotes}</span>
                    </button>

                    {/* Author compact info with 3D Stars (Clickable to profile) */}
                    <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                      <AuthorForumCard
                        author={thread.author}
                        handle={thread.handle}
                        avatar={thread.avatar}
                        authorEffect={thread.authorEffect}
                        stats={thread.authorStats}
                        onViewProfile={onViewProfile}
                        compact
                      />
                    </div>

                    {/* Thread Subject & Preview */}
                    <div className="flex-1 min-w-0 pl-2 border-l border-white/10">
                      <h3 className="text-sm font-semibold text-white hover:text-purple-300 transition-colors">
                        {thread.title}
                      </h3>
                      <div className="text-xs text-white/55 mt-1 line-clamp-1 leading-relaxed">
                        {/* Strip BBCode tags for snippet summary */}
                        {thread.content.replace(/\[\/?(b|i|u|color|quote|code|img|url)[^\]]*\]/gi, '')}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        {thread.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] text-white/40 font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Comments & View Stats */}
                    <div className="flex items-center gap-2 text-white/40 text-xs flex-shrink-0 self-center">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-mono">{thread.comments.length}</span>
                      </div>
                      <span className="text-purple-400 font-semibold text-[11px] hover:underline">
                        Open Thread →
                      </span>
                    </div>
                  </div>
                ) : (
                  /* =========================================================================
                     EXPANDED VIEW: AUTHENTIC UNKNOWNCHEATS 2-COLUMN POST & REPLIES
                     ========================================================================= */
                  <div className="flex flex-col">
                    {/* Main Original Post (Thread #1) */}
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-5 bg-black/40">
                      {/* Left Column: Author Card with Rank, 3D Spinning Stars & Stats */}
                      <AuthorForumCard
                        author={thread.author}
                        handle={thread.handle}
                        avatar={thread.avatar}
                        authorEffect={thread.authorEffect}
                        stats={thread.authorStats}
                        onViewProfile={onViewProfile}
                      />

                      {/* Right Column: Full Thread Post Content with BBCode Renderer */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                              {thread.title}
                            </h2>
                            <button
                              onClick={() => setExpandedThreadId(null)}
                              className="text-white/40 hover:text-white p-1 rounded hover:bg-white/5 cursor-pointer"
                              title="Collapse thread"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Rendered BBCode & Picture Content */}
                          <div className="mt-4 p-4 rounded-xl bg-zinc-950/60 border border-white/5">
                            <BBCodeRenderer content={thread.content} />
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            {thread.tags.map((tag, i) => (
                              <span key={i} className="text-[10px] text-white/40 font-mono px-2 py-0.5 rounded bg-white/5">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Actions Bar */}
                        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => onUpvote(thread.id, e)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                thread.hasUpvoted
                                  ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                                  : 'bg-black border-white/15 text-white/70 hover:text-white'
                              }`}
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                              <span>Upvote ({thread.upvotes})</span>
                            </button>

                            <button
                              onClick={() => handleQuotePost(thread.author, thread.content)}
                              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Quote className="w-3.5 h-3.5 text-amber-300" />
                              <span>Quote</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onViewProfile(thread.handle.replace(/^@/, ''))}
                              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <span>View Profile</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                            <span className="text-[11px] text-white/40 font-mono">
                              {thread.views.toLocaleString()} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Community Replies Section */}
                    <div className="border-t border-white/15 bg-zinc-950/80 p-4 sm:p-5 flex flex-col gap-4">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                          <CornerDownRight className="w-3.5 h-3.5 text-purple-400" />
                          <span>Community Replies ({thread.comments.length})</span>
                        </h4>
                        <span className="text-[11px] text-white/40 font-mono">Rich formatting & 3D rank stars</span>
                      </div>

                      {thread.comments.length === 0 ? (
                        <div className="p-6 text-center text-xs text-white/40 border border-dashed border-white/10 rounded-lg">
                          No replies yet. Be the first to contribute to this discussion below!
                        </div>
                      ) : (
                        thread.comments.map((comment, idx) => (
                          <div
                            key={comment.id}
                            className="rounded-xl bg-black/60 border border-white/10 overflow-hidden flex flex-col"
                          >
                            {/* Reply Header Bar */}
                            <div className="px-3 py-1.5 bg-zinc-900/60 border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-white/50">
                              <span>{comment.time}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleQuotePost(comment.author, comment.text)}
                                  className="text-white/40 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                                >
                                  <Quote className="w-2.5 h-2.5" />
                                  <span>Quote</span>
                                </button>
                                <span>#{idx + 2}</span>
                              </div>
                            </div>

                            {/* Reply Body with Author Info on Left & BBCode Content on Right */}
                            <div className="p-3.5 flex flex-col sm:flex-row items-start gap-4">
                              <AuthorForumCard
                                author={comment.author}
                                handle={comment.handle}
                                avatar={comment.avatar}
                                authorEffect={comment.authorEffect}
                                stats={comment.authorStats}
                                onViewProfile={onViewProfile}
                              />

                              <div className="flex-1 min-w-0 p-3.5 rounded-lg bg-zinc-950/50 border border-white/5 self-stretch">
                                <BBCodeRenderer content={comment.text} />
                              </div>
                            </div>
                          </div>
                        ))
                      )}

                      {/* =========================================================================
                          REPLY COMPOSER WITH FULL BBCODE TOOLBAR & IMAGE UPLOADER
                          ========================================================================= */}
                      <form
                        id="forum-reply-composer"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!commentInput.trim()) return;
                          onAddComment(thread.id, commentInput);
                          setCommentInput('');
                          setIsQuoteChecked(false);
                        }}
                        className="mt-3 flex flex-col gap-3 p-4 rounded-2xl bg-black border border-white/15 shadow-2xl"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Send className="w-3.5 h-3.5 text-purple-400" />
                            <span>Quick Reply (Rich BBCode Editor & Picture Support)</span>
                          </span>
                          <span className="text-[10px] font-mono text-white/40">vBulletin / UC Style</span>
                        </div>

                        {/* Rich BBCode Editor */}
                        <BBCodeEditor
                          value={commentInput}
                          onChange={setCommentInput}
                          placeholder="Type your reply... use bold [b], colors [color=#facc15], screenshots [img], code [code]..."
                          minRows={4}
                          allowQuoteOption
                          isQuoteChecked={isQuoteChecked}
                          onToggleQuoteOption={setIsQuoteChecked}
                          quoteTargetAuthor={thread.author}
                          quoteTargetText={thread.content.slice(0, 180)}
                        />

                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="submit"
                            disabled={!commentInput.trim()}
                            className="px-5 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-white/90 disabled:opacity-40 transition-all flex items-center gap-2 shadow-lg shadow-white/10 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Post Reply</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function NewThreadModal({
  onClose,
  onSubmit
}: {
  onClose: () => void;
  onSubmit: (thread: { title: string; category: ForumThread['category']; content: string; tags: string[] }) => void;
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ForumThread['category']>('Showcases');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t : `#${t}`));

    onSubmit({
      title: title.trim(),
      category,
      content: content.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['#bio', '#setup']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-zinc-950 border border-white/20 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Create New Discussion</h3>
            <p className="text-xs text-white/50">Add rich text, pictures, code snippets, and custom styles</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-white/40 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/70">Topic Title</label>
            <input
              type="text"
              placeholder="e.g. [Showcase] Just unlocked Tachyon Quantum Overdrive with 3D Spinning Stars!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-xs text-white outline-none focus:border-purple-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/70">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ForumThread['category'])}
              className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-xs text-white outline-none"
            >
              <option value="Showcases">Showcases & Bio Setups</option>
              <option value="Themes & CSS">Themes & CSS Code</option>
              <option value="Audio & Music">Audio & Music Widgets</option>
              <option value="General">General Discussion</option>
            </select>
          </div>

          {/* BBCode Rich Text & Picture Editor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/70">Message & Picture Content</label>
            <BBCodeEditor
              value={content}
              onChange={setContent}
              placeholder="Write your topic post... insert pictures [img], colored text [color], code blocks [code]..."
              minRows={6}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/70">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. #showcase, #godly, #stars, #minimalist"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-xs text-white outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-white text-black font-extrabold text-xs hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10"
            >
              Post Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
