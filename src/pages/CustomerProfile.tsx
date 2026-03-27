import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Bookmark, MessageCircle, Send, Star, MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import PostDetailDialog, { PostDetailData } from "@/components/PostDetailDialog";

const customerData = {
  name: "Jessica M.",
  handle: "@jess.reviews",
  avatar: "https://i.pravatar.cc/160?img=44",
  location: "Cape Town, SA",
  reviewCount: 12,
  favorites: 28,
  following: 34,
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
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150"
        >
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1" />
        <div className="w-10" />
      </div>

      {/* Profile card — no banner, glassmorphic card */}
      <div className="px-4 -mt-1">
        <div className="rounded-[24px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.1)] p-5">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden ring-[3px] ring-border/20 shadow-xl mb-3">
              <img src={customerData.avatar} alt={customerData.name} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{customerData.name}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{customerData.handle}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <MapPin size={10} />
              <span>{customerData.location}</span>
            </div>
          </div>

          {/* Stats row inside card */}
          <div className="flex items-center justify-around mt-5 pt-4 border-t border-border/20">
            {[
              { label: "Reviews", value: customerData.reviewCount },
              { label: "Favorites", value: customerData.favorites },
              { label: "Following", value: customerData.following },
            ].map((stat, i, arr) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="-mt-0.5 text-[10px] text-muted-foreground font-medium">{stat.label}</div>
                </div>
                {i < arr.length - 1 && <div className="w-px h-7 bg-border/30" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 px-4 py-5 justify-center">
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
                <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200">
                  <Heart size={22} className="text-rose-400 fill-rose-400" />
                  <span className="text-[10px] text-white font-semibold">{formatCount(post.likes)}</span>
                </button>
                <div className="w-6 h-px bg-white/15" />
                <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200">
                  <MessageCircle size={22} className="text-white/80" />
                  <span className="text-[10px] text-white font-semibold">{formatCount(post.comments)}</span>
                </button>
                <div className="w-6 h-px bg-white/15" />
                <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200">
                  <Bookmark size={22} className="text-white/80" />
                  <span className="text-[10px] text-white/60">save</span>
                </button>
                <div className="w-6 h-px bg-white/15" />
                <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200">
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
              <div key={item.id} className="rounded-[20px] overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform duration-200" style={{ aspectRatio: "3 / 4" }}>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/15">
                  <Heart size={16} className="text-white fill-white" strokeWidth={1.5} />
                </button>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/15 backdrop-blur-xl rounded-[12px] px-3 py-2 border border-white/15">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col min-w-0">
                        <span className="text-white text-[11px] font-semibold truncate">{item.name}</span>
                        <span className="text-white/70 text-[10px] font-bold">{item.price}</span>
                      </div>
                      <button className="shrink-0 w-7 h-7 rounded-full bg-white flex items-center justify-center ml-2">
                        <span className="text-foreground text-sm font-bold leading-none">+</span>
                      </button>
                    </div>
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
