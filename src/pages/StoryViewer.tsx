import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Bookmark, Send, Star, Eye, Paperclip, MoreHorizontal, Reply, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const storiesData = [
  {
    id: 1,
    name: "Your Story",
    avatar: "https://i.pravatar.cc/90?img=3",
    slides: [
      {
        image: "https://picsum.photos/seed/story1a/800/1200",
        product: { name: "Silk Scarf", variant: "Ocean Blue", price: "$42.00", rating: 4.6, image: "https://picsum.photos/seed/prod1/200/200" },
        comments: [
          { name: "Lina Rose", avatar: "https://i.pravatar.cc/40?img=9", text: "Love this color!" },
          { name: "Kofi M.", avatar: "https://i.pravatar.cc/40?img=15", text: "Where can I get one?" },
        ],
        likes: 1240,
        views: 3200,
      },
    ],
  },
  {
    id: 2,
    name: "Aisha",
    avatar: "https://i.pravatar.cc/90?img=5",
    slides: [
      {
        image: "https://picsum.photos/seed/story2a/800/1200",
        product: { name: "Handmade Earrings", variant: "Gold Plated", price: "$28.00", rating: 4.9, image: "https://picsum.photos/seed/near1/200/200" },
        comments: [
          { name: "Marco V.", avatar: "https://i.pravatar.cc/40?img=12", text: "These are stunning!" },
          { name: "Priya K.", avatar: "https://i.pravatar.cc/40?img=23", text: "Just ordered mine 💕" },
          { name: "Sofia G.", avatar: "https://i.pravatar.cc/40?img=25", text: "Perfect gift idea" },
        ],
        likes: 2340,
        views: 5744,
      },
      {
        image: "https://picsum.photos/seed/story2b/800/1200",
        product: { name: "Ceramic Mug", variant: "Matte Black", price: "$32.00", rating: 4.8, image: "https://picsum.photos/seed/near3/200/200" },
        comments: [
          { name: "David K.", avatar: "https://i.pravatar.cc/40?img=52", text: "Need this for my collection" },
        ],
        likes: 890,
        views: 2100,
      },
    ],
  },
  {
    id: 3,
    name: "Marco",
    avatar: "https://i.pravatar.cc/90?img=12",
    slides: [
      {
        image: "https://picsum.photos/seed/story3a/800/1200",
        product: { name: "Leather Wallet", variant: "Tan Brown", price: "$65.00", rating: 4.7, image: "https://picsum.photos/seed/p3/200/200" },
        comments: [
          { name: "Aisha B.", avatar: "https://i.pravatar.cc/40?img=5", text: "Quality looks amazing" },
          { name: "Liam J.", avatar: "https://i.pravatar.cc/40?img=11", text: "Is this full grain?" },
        ],
        likes: 1560,
        views: 4300,
      },
    ],
  },
  {
    id: 4,
    name: "Lina",
    avatar: "https://i.pravatar.cc/90?img=9",
    slides: [
      {
        image: "https://picsum.photos/seed/story4a/800/1200",
        product: { name: "Gold Necklace", variant: "18K Plated", price: "$120.00", rating: 5.0, image: "https://picsum.photos/seed/p2/200/200" },
        comments: [
          { name: "Kofi M.", avatar: "https://i.pravatar.cc/40?img=15", text: "Gorgeous piece!" },
        ],
        likes: 3100,
        views: 7800,
      },
    ],
  },
  {
    id: 5,
    name: "Kofi",
    avatar: "https://i.pravatar.cc/90?img=15",
    slides: [
      {
        image: "https://picsum.photos/seed/story5a/800/1200",
        product: { name: "Woven Basket", variant: "Natural Raffia", price: "$45.00", rating: 4.5, image: "https://picsum.photos/seed/near4/200/200" },
        comments: [
          { name: "Priya K.", avatar: "https://i.pravatar.cc/40?img=23", text: "Handmade perfection 🙌" },
          { name: "Marco V.", avatar: "https://i.pravatar.cc/40?img=12", text: "Great craftsmanship" },
        ],
        likes: 980,
        views: 2900,
      },
    ],
  },
  {
    id: 6,
    name: "Priya",
    avatar: "https://i.pravatar.cc/90?img=23",
    slides: [
      {
        image: "https://picsum.photos/seed/story6a/800/1200",
        product: { name: "Art Print", variant: "Limited Edition", price: "$28.00", rating: 4.8, image: "https://picsum.photos/seed/p7/200/200" },
        comments: [
          { name: "Aisha B.", avatar: "https://i.pravatar.cc/40?img=5", text: "Adding to my wall!" },
        ],
        likes: 1750,
        views: 4100,
      },
    ],
  },
];

const fakeComments = [
  { id: 1, user: "Lina K.", avatar: "https://i.pravatar.cc/32?img=9", text: "Love this! Where can I get one? 😍", time: "2h", likes: 12, replies: 3 },
  { id: 2, user: "Kofi M.", avatar: "https://i.pravatar.cc/32?img=15", text: "The craftsmanship is amazing, truly one of a kind work", time: "4h", likes: 8, replies: 1 },
  { id: 3, user: "Sofia R.", avatar: "https://i.pravatar.cc/32?img=25", text: "Just ordered mine! Can't wait 🔥", time: "6h", likes: 5, replies: 0 },
  { id: 4, user: "Marco T.", avatar: "https://i.pravatar.cc/32?img=12", text: "This is beautiful work, keep it up!", time: "8h", likes: 3, replies: 2 },
  { id: 5, user: "Priya D.", avatar: "https://i.pravatar.cc/32?img=23", text: "Stunning piece! 💎 The detail is incredible", time: "12h", likes: 21, replies: 4 },
];

const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

/* ─── Comments Sheet (matching PostDetailDialog style) ─── */
const CommentsSheet = ({
  open,
  onClose,
  storyImage,
}: {
  open: boolean;
  onClose: () => void;
  storyImage: string;
}) => {
  const [comment, setComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

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
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120]"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 max-h-[75vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background blur from story image */}
            <div className="absolute inset-0 overflow-hidden rounded-t-[28px]">
              <img
                src={storyImage}
                alt=""
                className="w-full h-64 object-cover object-bottom blur-3xl scale-110 opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,8%)]/80 via-[hsl(0,0%,8%)]/95 to-[hsl(0,0%,8%)]" />
            </div>

            <div className="relative rounded-t-[28px] overflow-hidden flex flex-col max-h-[75vh]">
              {/* Handle + close */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-white/50" />
                  <span className="text-[13px] font-bold text-white/90">{fakeComments.length} Comments</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center"
                >
                  <X size={14} className="text-white/70" />
                </button>
              </div>

              {/* Scrollable comments */}
              <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-20">
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
                              <button
                                onClick={() => toggleCommentLike(c.id)}
                                className="flex items-center gap-1.5 transition-all"
                              >
                                <Heart
                                  size={12}
                                  className={likedComments.has(c.id) ? "text-rose-400 fill-rose-400" : "text-white/30"}
                                />
                                <span className={`text-[10px] font-semibold ${likedComments.has(c.id) ? "text-rose-400" : "text-white/30"}`}>
                                  {c.likes + (likedComments.has(c.id) ? 1 : 0)}
                                </span>
                              </button>
                              <button
                                onClick={() => handleReply(c.user)}
                                className="flex items-center gap-1.5 text-white/30 hover:text-white/50 transition-colors"
                              >
                                <Reply size={12} />
                                <span className="text-[10px] font-semibold">Reply</span>
                                {c.replies > 0 && (
                                  <span className="text-[10px] text-white/20">· {c.replies}</span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed comment input */}
              <div className="absolute bottom-0 left-0 right-0 z-50 px-4 py-3 bg-black/40 backdrop-blur-2xl">
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
                      <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Send size={13} className="text-primary-foreground" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── Animated comment component ─── */
const AnimatedComment = ({
  comment,
  index,
  slideKey,
}: {
  comment: { name: string; avatar: string; text: string };
  index: number;
  slideKey: string;
}) => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVisible(false);
    setMounted(false);

    const delay = 800 + index * 1200;

    const mountTimer = setTimeout(() => setMounted(true), delay);
    const showTimer = setTimeout(() => setVisible(true), delay + 30);
    const hideTimer = setTimeout(() => setVisible(false), delay + 4000);
    const unmountTimer = setTimeout(() => setMounted(false), delay + 5000);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, [slideKey, index]);

  if (!mounted) return null;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(6px) scale(0.97)",
        transition: "opacity 900ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 900ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        willChange: "opacity, transform",
      }}
    >
      <div className="flex items-center gap-2.5">
        <img
          src={comment.avatar}
          alt={comment.name}
          className="w-8 h-8 rounded-full object-cover border border-white/30 shrink-0"
        />
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-3 py-2 flex items-center">
          <span className="text-white font-bold text-[11px] drop-shadow-md">
            {comment.name}{" "}
          </span>
          <span className="text-white/80 text-[11px] drop-shadow-sm">
            {comment.text}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Single story slide ─── */
const StorySlide = ({
  story,
  slideIndex,
  onSlideChange,
  isActive,
}: {
  story: (typeof storiesData)[0];
  slideIndex: number;
  onSlideChange: (idx: number) => void;
  isActive: boolean;
}) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const slide = story.slides[slideIndex];
  const totalSlides = story.slides.length;

  const handleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = rect.width / 2;

    if (x < half) {
      if (slideIndex > 0) onSlideChange(slideIndex - 1);
    } else {
      if (slideIndex < totalSlides - 1) onSlideChange(slideIndex + 1);
    }
  };

  const slideKey = `${story.id}-${slideIndex}`;

  return (
    <div
      className="relative w-full h-full shrink-0 snap-start snap-always cursor-pointer"
      onClick={handleTap}
    >
      {/* Background image */}
      <img
        src={slide.image}
        alt="Story"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Progress bars */}
      {totalSlides > 1 && (
        <div className="absolute top-3 left-0 w-full px-3 flex gap-1.5 z-30">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`h-[3px] flex-1 rounded-full ${
                i <= slideIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="absolute top-7 left-0 w-full px-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <img
            src={story.avatar}
            alt={story.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
          />
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm drop-shadow-md">
              {story.name}
            </span>
            <span className="text-white/70 text-xs">
              {formatCount(slide.likes)} likes
            </span>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3.5 py-2 flex items-center gap-1.5">
          <Eye size={14} className="text-white/80" />
          <span className="text-white text-xs font-semibold">
            {formatCount(slide.views)}
          </span>
        </div>
      </header>

      {/* Right engagement panel */}
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[18px] px-2.5 py-4 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="flex flex-col items-center gap-0.5 py-1.5"
          onClick={() => setLiked(!liked)}
        >
          <Heart
            size={22}
            className={liked ? "text-rose-400 fill-rose-400" : "text-white/80"}
          />
          <span className="text-[10px] text-white font-semibold">
            {formatCount(slide.likes + (liked ? 1 : 0))}
          </span>
        </button>
        <div className="w-6 h-px bg-white/15" />
        <button
          className="flex flex-col items-center gap-0.5 py-1.5"
          onClick={() => setCommentsOpen(true)}
        >
          <MessageCircle size={22} className="text-white/80" />
          <span className="text-[10px] text-white font-semibold">
            {slide.comments.length}
          </span>
        </button>
        <div className="w-6 h-px bg-white/15" />
        <button className="flex flex-col items-center gap-0.5 py-1.5">
          <Bookmark size={22} className="text-white/80" />
          <span className="text-[10px] text-white/60">save</span>
        </button>
        <div className="w-6 h-px bg-white/15" />
        <button className="flex flex-col items-center gap-0.5 py-1.5">
          <Send size={22} className="text-white/80" />
          <span className="text-[10px] text-white font-semibold">share</span>
        </button>
      </div>

      {/* Animated comments */}
      {isActive && (
        <div
          className="absolute left-4 z-20 max-w-[65%]"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {slide.comments.slice(0, 3).map((c, i) => (
            <div key={`${slideKey}-${i}`} style={{ height: 44, marginBottom: i < Math.min(slide.comments.length, 3) - 1 ? 10 : 0 }}>
              <AnimatedComment
                comment={c}
                index={i}
                slideKey={slideKey}
              />
            </div>
          ))}
        </div>
      )}

      {/* Product card */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[90%] z-20 bg-white/15 backdrop-blur-xl rounded-[20px] p-3 flex items-center border border-white/20"
        style={{ bottom: "5.5rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-[12px] overflow-hidden shrink-0 border border-white/20">
          <img
            src={slide.product.image}
            alt={slide.product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col overflow-hidden ml-3 flex-grow">
          <span className="font-bold text-white text-sm truncate">
            {slide.product.name}
          </span>
          <span className="text-[11px] text-white/60 truncate">
            {slide.product.variant}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[11px] font-bold text-white">
              {slide.product.rating}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
          <span className="font-bold text-white text-sm">
            {slide.product.price}
          </span>
          <button className="bg-white text-foreground px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            View
          </button>
        </div>
      </div>

      {/* Bottom message bar */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[90%] z-20 flex items-center gap-3"
        style={{ bottom: "1.5rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-grow h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center px-4">
          <span className="text-white/50 text-sm">Send a message...</span>
        </div>
        <button
          className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shrink-0"
          onClick={() => setLiked(!liked)}
        >
          <Heart
            size={20}
            className={liked ? "text-rose-400 fill-rose-400" : "text-white"}
          />
        </button>
      </div>

      {/* Comments sheet */}
      <CommentsSheet
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        storyImage={slide.image}
      />
    </div>
  );
};

/* ─── Main viewer with vertical snap scroll ─── */
const StoryViewer = () => {
  const { id } = useParams();
  const initialIndex = storiesData.findIndex((s) => s.id === Number(id));
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [slideIndices, setSlideIndices] = useState<number[]>(
    storiesData.map(() => 0)
  );

  const handleSlideChange = useCallback(
    (storyIdx: number, slideIdx: number) => {
      setSlideIndices((prev) => {
        const next = [...prev];
        next[storyIdx] = slideIdx;
        return next;
      });
    },
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container && initialIndex > 0) {
      const target = container.children[initialIndex] as HTMLElement;
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
      }
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!isNaN(idx)) setActiveStoryIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full max-w-md h-full overflow-y-auto snap-y snap-mandatory no-scrollbar"
      >
        {storiesData.map((story, idx) => (
          <div
            key={story.id}
            data-index={idx}
            className="w-full h-full snap-start snap-always shrink-0"
            style={{ height: "100dvh" }}
          >
            <StorySlide
              story={story}
              slideIndex={slideIndices[idx]}
              onSlideChange={(si) => handleSlideChange(idx, si)}
              isActive={activeStoryIndex === idx}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryViewer;
