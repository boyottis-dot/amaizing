import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Send, ArrowLeft, Paperclip, MoreHorizontal, Reply } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface PostDetailData {
  image: string;
  name: string;
  price?: string;
  caption?: string;
  vendorName?: string;
  vendorAvatar?: string;
  vendorHandle?: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

interface PostDetailProps {
  open: boolean;
  onClose: () => void;
  post: PostDetailData;
}

const fakeComments = [
  { id: 1, user: "Lina K.", avatar: "https://i.pravatar.cc/32?img=9", text: "Love this! Where can I get one? 😍", time: "2h", likes: 12, replies: 3 },
  { id: 2, user: "Kofi M.", avatar: "https://i.pravatar.cc/32?img=15", text: "The craftsmanship is amazing, truly one of a kind work", time: "4h", likes: 8, replies: 1 },
  { id: 3, user: "Sofia R.", avatar: "https://i.pravatar.cc/32?img=25", text: "Just ordered mine! Can't wait 🔥", time: "6h", likes: 5, replies: 0 },
  { id: 4, user: "Marco T.", avatar: "https://i.pravatar.cc/32?img=12", text: "This is beautiful work, keep it up!", time: "8h", likes: 3, replies: 2 },
  { id: 5, user: "Priya D.", avatar: "https://i.pravatar.cc/32?img=23", text: "Stunning piece! 💎 The detail is incredible", time: "12h", likes: 21, replies: 4 },
];

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const PostDetailDialog = ({ open, onClose, post }: PostDetailProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes ?? 234);
  const [comment, setComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  if (!open) return null;

  const commentCount = post.comments ?? fakeComments.length;
  const shareCount = post.shares ?? 12;

  const toggleCommentLike = (id: number) => {
    setLikedComments(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleReply = (userName: string) => {
    setReplyingTo(userName);
    setComment(`@${userName} `);
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setComment("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100]"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full h-full overflow-y-auto no-scrollbar"
        >
          {/* Fixed top bar: back + buy button */}
          <div className="fixed top-5 left-5 right-5 z-50 flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
            <button className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2.5 flex items-center gap-1.5 active:scale-95 transition-transform duration-150">
              <span className="text-white text-xs font-semibold">Buy Now</span>
              {post.price && <span className="text-white/70 text-xs font-bold">· {post.price}</span>}
            </button>
          </div>

          {/* Post image — full width, 3:4 */}
          <div className="relative w-full aspect-[3/4]">
            <img src={post.image} alt={post.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Engagement panel — positioned inside image, scrolls with content */}
            <div className="absolute right-3 top-16 flex flex-col items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/15 rounded-[18px] px-2.5 py-3 z-20">
              <button
                onClick={(e) => { e.stopPropagation(); setLiked(!liked); setLikeCount(c => liked ? c - 1 : c + 1); }}
                className="flex flex-col items-center gap-0.5 py-1.5"
              >
                <Heart size={22} className={liked ? "text-rose-400 fill-rose-400 transition-all scale-110" : "text-white/80 transition-all"} />
                <span className="text-[10px] text-white font-semibold">{formatCount(likeCount)}</span>
              </button>
              <div className="w-6 h-px bg-white/15" />
              <button className="flex flex-col items-center gap-0.5 py-1.5">
                <MessageCircle size={22} className="text-white/80" />
                <span className="text-[10px] text-white font-semibold">{commentCount}</span>
              </button>
              <div className="w-6 h-px bg-white/15" />
              <button
                onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
                className="flex flex-col items-center gap-0.5 py-1.5"
              >
                <Bookmark size={22} className={saved ? "text-amber-400 fill-amber-400" : "text-white/80"} />
                <span className="text-[10px] text-white/60">{saved ? "saved" : "save"}</span>
              </button>
              <div className="w-6 h-px bg-white/15" />
              <button className="flex flex-col items-center gap-0.5 py-1.5">
                <Send size={22} className="text-white/80" />
                <span className="text-[10px] text-white font-semibold">{formatCount(shareCount)}</span>
              </button>
            </div>

            {/* Bottom info — vendor + caption */}
            <div className="absolute bottom-0 left-0 right-0 p-5 pr-16 z-10">
              {post.vendorAvatar && (
                <div className="mb-3 flex items-center gap-3 pr-2">
                  <img src={post.vendorAvatar} alt={post.vendorName} className="w-11 h-11 rounded-full object-cover border-2 border-white/30 shadow-lg" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-[15px] font-bold text-white">{post.vendorName}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                        <circle cx="12" cy="12" r="10" fill="hsl(var(--primary))" />
                        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {post.vendorHandle && <span className="text-[11px] text-white/50">{post.vendorHandle}</span>}
                  </div>
                  <button className="ml-auto inline-flex h-11 min-w-[96px] shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/16 px-5 text-center backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                    <span className="w-full text-center text-[12px] font-semibold leading-none text-white">Follow</span>
                  </button>
                </div>
              )}
              {post.caption && (
                <p className="text-[13px] text-white/75 leading-relaxed">{post.caption}</p>
              )}
            </div>
          </div>

          {/* Comments section */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-0 overflow-hidden">
              <img src={post.image} alt="" className="w-full h-64 object-cover object-bottom blur-3xl scale-110 opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[hsl(0,0%,8%)]/95 to-[hsl(0,0%,8%)]" />
            </div>

            <div className="relative px-4 pt-5 pb-28">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-white/50" />
                  <span className="text-[13px] font-bold text-white/90">{fakeComments.length} Comments</span>
                </div>
                <button className="text-[11px] text-white/35 font-medium">Most Recent</button>
              </div>

              <div className="flex flex-col gap-2.5">
                {fakeComments.map((c) => (
                  <div key={c.id} className="relative group">
                    <div className="bg-white/[0.05] backdrop-blur-xl border border-white/[0.07] rounded-[16px] p-3.5 transition-all hover:bg-white/[0.08]">
                      <div className="flex gap-3">
                        <img src={c.avatar} alt={c.user} className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-bold text-white/90">{c.user}</span>
                              <span className="text-[10px] text-white/25">{c.time}</span>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal size={14} className="text-white/30" />
                            </button>
                          </div>
                          <p className="text-[12px] text-white/55 leading-relaxed mt-1">{c.text}</p>
                          <div className="flex items-center gap-4 mt-2.5">
                            <button onClick={() => toggleCommentLike(c.id)} className="flex items-center gap-1.5 transition-all">
                              <Heart size={12} className={likedComments.has(c.id) ? "text-rose-400 fill-rose-400" : "text-white/30"} />
                              <span className={`text-[10px] font-semibold ${likedComments.has(c.id) ? "text-rose-400" : "text-white/30"}`}>
                                {c.likes + (likedComments.has(c.id) ? 1 : 0)}
                              </span>
                            </button>
                            <button onClick={() => handleReply(c.user)} className="flex items-center gap-1.5 text-white/30 hover:text-white/50 transition-colors">
                              <Reply size={12} />
                              <span className="text-[10px] font-semibold">Reply</span>
                              {c.replies > 0 && <span className="text-[10px] text-white/20">· {c.replies}</span>}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed comment input */}
          <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-black/40 backdrop-blur-2xl">
            {replyingTo && (
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] text-white/40">
                  Replying to <span className="text-white/70 font-semibold">@{replyingTo}</span>
                </span>
                <button onClick={cancelReply} className="text-[11px] text-white/30 font-medium">Cancel</button>
              </div>
            )}
            <div className="flex items-center gap-2.5">
              <img src="https://i.pravatar.cc/32?img=3" alt="You" className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-white/10" />
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={replyingTo ? `Reply to @${replyingTo}...` : "Add a comment..."}
                className="flex-1 bg-transparent text-[12px] text-white placeholder:text-white/25 outline-none"
              />
              <div className="flex items-center gap-3">
                <Paperclip size={14} className="text-white/25" />
                <span className="text-[11px] font-bold text-white/25">GIF</span>
                {comment && (
                  <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 animate-scale-in">
                    <Send size={13} className="text-primary-foreground" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostDetailDialog;
