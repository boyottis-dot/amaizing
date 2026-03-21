import { Heart, MessageCircle, Bookmark, Send, MoreVertical } from "lucide-react";
import CommentBar from "./CommentBar";

interface PostProps {
  vendorName: string;
  vendorHandle: string;
  vendorAvatar: string;
  image: string;
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
  likes,
  comments,
  shares,
  caption,
  verified = true,
  price,
  onAvatarClick,
}: PostProps) => (
  <div>
    <div className="rounded-[20px] overflow-hidden relative aspect-square shadow-2xl active:scale-[0.98] transition-transform duration-200">
      {/* Full-bleed image */}
      <img src={image} alt={vendorName} className="absolute inset-0 w-full h-full object-cover" />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Buy button top-left with price */}
      <button className="absolute top-4 left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2.5 z-10 flex items-center gap-1.5 active:scale-95 transition-transform duration-150">
        <span className="text-white text-xs font-semibold">Buy Now</span>
        {price && <span className="text-white/70 text-xs font-bold">· {price}</span>}
      </button>

      {/* Right-side glassmorphic engagement panel */}
      <div className="absolute right-3 top-4 flex flex-col items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[18px] px-2.5 py-4 z-10">
        <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-90 transition-transform duration-150">
          <Heart size={22} className="text-rose-400 fill-rose-400" />
          <span className="text-[10px] text-white font-semibold">{formatCount(likes)}</span>
        </button>
        <div className="w-6 h-px bg-white/15" />
        <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-90 transition-transform duration-150">
          <MessageCircle size={22} className="text-white/80" />
          <span className="text-[10px] text-white font-semibold">{formatCount(comments)}</span>
        </button>
        <div className="w-6 h-px bg-white/15" />
        <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-90 transition-transform duration-150">
          <Bookmark size={22} className="text-white/80" />
          <span className="text-[10px] text-white/60">save</span>
        </button>
        <div className="w-6 h-px bg-white/15" />
        <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-90 transition-transform duration-150">
          <Send size={22} className="text-white/80" />
          <span className="text-[10px] text-white font-semibold">{formatCount(shares)}</span>
        </button>
      </div>

      {/* Bottom content: avatar + name + caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        {/* Vendor info */}
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

        {/* Caption */}
        <p className="text-[12px] text-white/70 leading-relaxed line-clamp-2 pr-14">{caption}</p>
      </div>
    </div>

    {/* Comment bar outside */}
    <CommentBar />
  </div>
);

export default FeaturedPostCard;
