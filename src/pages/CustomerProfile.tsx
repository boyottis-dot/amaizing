import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Bookmark, MessageCircle, Send, Star, Share2, Edit3 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import PostDetailDialog, { PostDetailData } from "@/components/PostDetailDialog";

const customerData = {
  name: "Jessica M.",
  handle: "@jess.reviews",
  avatar: "https://i.pravatar.cc/160?img=44",
  banner: "https://picsum.photos/seed/custbanner/800/400",
  reviewCount: 12,
  favorites: 28,
};

const customerReviews = [
  {
    id: 1,
    image: "https://picsum.photos/seed/cr1/600/600",
    caption: "Absolutely in love with this silk dress from @amara.style! The quality is incredible and it fits perfectly. Highly recommend 💕",
    likes: 56,
    comments: 7,
    shares: 3,
    rating: 5,
    product: "Silk Dress",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/cr2/600/600",
    caption: "This leather bag from @kofi.craft is everything! Perfect size for daily use and the smell is amazing 🤎",
    likes: 42,
    comments: 11,
    shares: 5,
    rating: 5,
    product: "Leather Tote",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/cr3/600/600",
    caption: "The ceramic mug set is gorgeous but one arrived chipped. Seller replaced it right away though! Great service 👏",
    likes: 29,
    comments: 4,
    shares: 2,
    rating: 4,
    product: "Ceramic Mug Set",
  },
];

const customerFavorites = [
  { id: 1, name: "Gold Necklace", price: "$120", image: "https://picsum.photos/seed/cf1/400/400" },
  { id: 2, name: "Silk Scarf", price: "$55", image: "https://picsum.photos/seed/cf2/400/400" },
  { id: 3, name: "Candle Trio", price: "$38", image: "https://picsum.photos/seed/cf3/400/400" },
  { id: 4, name: "Art Print", price: "$28", image: "https://picsum.photos/seed/cf4/400/400" },
];

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const tabs = ["Reviews", "Favorites"] as const;
type Tab = (typeof tabs)[number];

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Reviews");
  const [selectedPost, setSelectedPost] = useState<PostDetailData | null>(null);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-28">
      {/* Banner — matching profile page style */}
      <div className="relative px-4 pt-4">
        <div className="rounded-[24px] overflow-hidden relative" style={{ height: 200 }}>
          <img src={customerData.banner} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 flex items-center justify-between px-4 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 active:scale-90 transition-transform duration-150"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className="relative z-10 -mt-16 flex justify-center">
        <div className="w-28 h-28 rounded-full border-4 border-background bg-secondary shadow-sm overflow-hidden">
          <img src={customerData.avatar} alt={customerData.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-6 text-center">
        <h1 className="text-xl font-bold text-foreground">{customerData.name}</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">{customerData.handle}</p>
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{customerData.reviewCount}</div>
          <div className="-mt-1 text-[11px] font-medium text-muted-foreground">Reviews</div>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{customerData.favorites}</div>
          <div className="-mt-1 text-[11px] font-medium text-muted-foreground">Favorites</div>
        </div>
      </div>

      {/* Tab bar — pill style matching profile page */}
      <div className="flex gap-2 px-4 py-4 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-5 py-2 rounded-full text-[12px] font-semibold transition-all duration-200 active:scale-95 ${
              activeTab === tab
                ? "bg-foreground text-background"
                : "bg-background/60 text-muted-foreground backdrop-blur-xl border border-border/30 shadow-sm"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reviews */}
      {activeTab === "Reviews" && (
        <section className="py-2 px-3 flex flex-col gap-4">
          {customerReviews.map((post) => (
            <div
              key={post.id}
              onClick={() =>
                setSelectedPost({
                  image: post.image,
                  name: customerData.name,
                  caption: post.caption,
                  likes: post.likes,
                  comments: post.comments,
                  shares: post.shares,
                  vendorName: customerData.name,
                  vendorAvatar: customerData.avatar,
                  vendorHandle: customerData.handle,
                })
              }
              className="rounded-[20px] overflow-hidden relative aspect-square shadow-2xl cursor-pointer active:scale-[0.97] transition-transform duration-200"
            >
              <img src={post.image} alt="Review" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Rating badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3 py-1.5 z-10">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="text-white text-xs font-bold">{post.rating}</span>
              </div>

              {/* Engagement */}
              <div className="absolute right-3 top-4 flex flex-col items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[18px] px-2.5 py-4 z-10">
                <button className="flex flex-col items-center gap-0.5 py-1.5">
                  <Heart size={22} className="text-rose-400 fill-rose-400" />
                  <span className="text-[10px] text-white font-semibold">{formatCount(post.likes)}</span>
                </button>
                <div className="w-6 h-px bg-white/15" />
                <button className="flex flex-col items-center gap-0.5 py-1.5">
                  <MessageCircle size={22} className="text-white/80" />
                  <span className="text-[10px] text-white font-semibold">{formatCount(post.comments)}</span>
                </button>
                <div className="w-6 h-px bg-white/15" />
                <button className="flex flex-col items-center gap-0.5 py-1.5">
                  <Bookmark size={22} className="text-white/80" />
                  <span className="text-[10px] text-white/60">save</span>
                </button>
                <div className="w-6 h-px bg-white/15" />
                <button className="flex flex-col items-center gap-0.5 py-1.5">
                  <Send size={22} className="text-white/80" />
                  <span className="text-[10px] text-white font-semibold">{formatCount(post.shares)}</span>
                </button>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <div className="flex items-center gap-2.5 mb-2">
                  <img src={customerData.avatar} alt={customerData.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/30" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{customerData.name}</span>
                    <span className="text-[11px] text-white/50">{customerData.handle}</span>
                  </div>
                </div>
                <p className="text-[12px] text-white/70 leading-relaxed line-clamp-2 pr-14">{post.caption}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Favorites */}
      {activeTab === "Favorites" && (
        <section className="py-2 px-3">
          <div className="grid grid-cols-2 gap-3">
            {customerFavorites.map((item) => (
              <div key={item.id} className="aspect-square rounded-[20px] overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform duration-200">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/15">
                  <Heart size={16} className="text-white fill-white" strokeWidth={1.5} />
                </button>
                <div className="absolute top-3 right-3 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <span className="text-white text-[11px] font-bold">{item.price}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/15 backdrop-blur-xl rounded-[12px] px-3 py-2 border border-white/15">
                    <span className="text-white text-[11px] font-semibold truncate block">{item.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <BottomNav />

      {selectedPost && (
        <PostDetailDialog open={!!selectedPost} onClose={() => setSelectedPost(null)} post={selectedPost} />
      )}
    </div>
  );
};

export default CustomerProfile;
