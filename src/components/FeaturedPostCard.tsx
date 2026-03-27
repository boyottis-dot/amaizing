import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Send } from "lucide-react";
import CommentBar from "./CommentBar";

interface PostProps {
  vendorName: string;
  vendorHandle: string;
  vendorAvatar: string;
  image: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  caption: string;
  verified?: boolean;
  isReview?: boolean;
  rating?: number;
  price?: string;
  onAvatarClick?: () => void;
}

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const FeaturedPostCard = ({
  vendorName,
  vendorHandle,
  vendorAvatar,
  image,
  images,
  likes,
  comments,
  shares,
  caption,
  verified = true,
  price,
  onAvatarClick,
}: PostProps) => {
  const [saved, setSaved] = useState(false);
  const allImages = images && images.length > 1 ? images : [image];
  const isCarousel = allImages.length > 1;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isCarousel) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isCarousel || touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setCurrentIdx((prev) => Math.min(prev + 1, allImages.length - 1));
      else setCurrentIdx((prev) => Math.max(prev - 1, 0));
    }
    setTouchStartX(null);
  };

  return (
    <div>
      <div
        className="rounded-[20px] overflow-hidden relative aspect-[4/5] shadow-2xl active:scale-[0.98] transition-transform duration-200"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Images */}
        <div className="absolute inset-0">
          {allImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={vendorName}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                i === currentIdx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Carousel counter badge - bottom right */}
        {isCarousel && (
          <div className="absolute bottom-[88px] right-3 bg-black/30 backdrop-blur-xl rounded-full px-2.5 py-1 border border-white/15 z-10">
            <span className="text-[10px] font-bold text-white">{currentIdx + 1}/{allImages.length}</span>
          </div>
        )}

        {/* Buy button top-left */}
        <button className="absolute top-4 left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2.5 z-10 flex items-center gap-1.5 active:scale-95 transition-transform duration-150">
          <span className="text-white text-xs font-semibold">Buy Now</span>
          {price && <span className="text-white/70 text-xs font-bold">· {price}</span>}
        </button>

        {/* Right-side engagement panel */}
        <div className="absolute right-3 top-4 flex flex-col items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[18px] px-2.5 py-4 z-10">
          <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200">
            <Heart size={22} className="text-rose-400 fill-rose-400" />
            <span className="text-[10px] text-white font-semibold">{formatCount(likes)}</span>
          </button>
          <div className="w-6 h-px bg-white/15" />
          <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200">
            <MessageCircle size={22} className="text-white/80" />
            <span className="text-[10px] text-white font-semibold">{formatCount(comments)}</span>
          </button>
          <div className="w-6 h-px bg-white/15" />
          <button
            onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
            className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200"
          >
            <Bookmark size={22} className={saved ? "text-rose-400 fill-rose-400" : "text-white/80"} />
            <span className={`text-[10px] ${saved ? "text-rose-400 font-semibold" : "text-white/60"}`}>{saved ? "saved" : "save"}</span>
          </button>
          <div className="w-6 h-px bg-white/15" />
          <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200">
            <Send size={22} className="text-white/80" />
            <span className="text-[10px] text-white font-semibold">{formatCount(shares)}</span>
          </button>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="flex items-center gap-2.5 mb-2">
            <img
              src={vendorAvatar}
              alt={vendorName}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30 cursor-pointer active:scale-90 transition-transform duration-150"
              onClick={(e) => { e.stopPropagation(); onAvatarClick?.(); }}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">{vendorName}</span>
                {verified && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#3B82F6" />
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-[11px] text-white/50">{vendorHandle}</span>
            </div>
          </div>
          <p className="text-[12px] text-white/70 leading-relaxed line-clamp-2 pr-14">{caption}</p>
        </div>
      </div>

      <CommentBar />
    </div>
  );
};

export default FeaturedPostCard;
