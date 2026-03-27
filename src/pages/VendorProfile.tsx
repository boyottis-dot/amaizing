import { ArrowLeft, Search, Heart, Bookmark, MessageCircle, Send, Plus, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import PostDetailDialog, { PostDetailData } from "@/components/PostDetailDialog";

const vendorMap: Record<string, { name: string; handle: string; avatar: string; bio: string; followers: string; posts: string }> = {
  amara: { name: "Amara Okafor", handle: "@amara.style", avatar: "https://i.pravatar.cc/400?img=32", bio: "West African silk & textile designer 🧵✨", followers: "2.3 K", posts: "89" },
  kofi: { name: "Kofi Mensah", handle: "@kofi.craft", avatar: "https://i.pravatar.cc/400?img=15", bio: "Hand-stitched leather goods, made to last a lifetime 🧵", followers: "1.8 K", posts: "54" },
  "1": { name: "Sienna James", handle: "@sienna.james", avatar: "https://i.pravatar.cc/400?img=32", bio: "Vintage fashion curator 👗", followers: "2.1 K", posts: "166" },
  "2": { name: "Maya Carter", handle: "@maya.carter", avatar: "https://i.pravatar.cc/400?img=25", bio: "Beauty & skincare enthusiast 💄", followers: "1.8 K", posts: "93" },
  "3": { name: "Liam Chen", handle: "@liam.chen", avatar: "https://i.pravatar.cc/400?img=11", bio: "Home decor & modern living 🏠", followers: "3.4 K", posts: "127" },
  "4": { name: "Tadala Mbewe", handle: "@tadala.crafts", avatar: "https://i.pravatar.cc/400?img=15", bio: "Local crafts & handmade treasures ✋", followers: "1.2 K", posts: "78" },
};

const defaultVendor = { name: "Katty Abrahams", handle: "@kattyabrahams", avatar: "https://i.pravatar.cc/400?img=32", bio: "I'm delighted to introduce myself as a professional model 🥳", followers: "567 K", posts: "166" };

const tabs = ["Products", "Posts", "Collections", "Saved"];

const productCategories = [
  {
    name: "Electronics",
    items: [
      { id: 1, name: "Handmade Earrings", price: "$24", image: "https://picsum.photos/seed/near1/400/400" },
      { id: 2, name: "Organic Soap Set", price: "$18", image: "https://picsum.photos/seed/near2/400/400" },
      { id: 3, name: "Ceramic Mug", price: "$32", image: "https://picsum.photos/seed/near3/400/400" },
      { id: 4, name: "Woven Basket", price: "$45", image: "https://picsum.photos/seed/near4/400/400" },
    ],
  },
  {
    name: "Fashion",
    items: [
      { id: 5, name: "Gold Necklace", price: "$120", image: "https://picsum.photos/seed/p2/400/400" },
      { id: 6, name: "Silk Dress", price: "$89", image: "https://picsum.photos/seed/p1/400/400" },
    ],
  },
  {
    name: "Home & Living",
    items: [
      { id: 7, name: "Scented Candle", price: "$22", image: "https://picsum.photos/seed/p10/400/400" },
      { id: 8, name: "Art Print", price: "$28", image: "https://picsum.photos/seed/p7/400/400" },
    ],
  },
];

const collections = [
  { id: 1, title: "Summer Essentials", likes: 1240, main: "https://picsum.photos/seed/vcol1/600/600", thumbs: ["https://picsum.photos/seed/vcol1a/200/200", "https://picsum.photos/seed/vcol1b/200/200", "https://picsum.photos/seed/vcol1c/200/200"], vendors: ["https://i.pravatar.cc/40?img=32", "https://i.pravatar.cc/40?img=9", "https://i.pravatar.cc/40?img=15"] },
  { id: 2, title: "Handmade Picks", likes: 876, main: "https://picsum.photos/seed/vcol2/600/600", thumbs: ["https://picsum.photos/seed/vcol2a/200/200", "https://picsum.photos/seed/vcol2b/200/200", "https://picsum.photos/seed/vcol2c/200/200"], vendors: ["https://i.pravatar.cc/40?img=15"] },
  { id: 3, title: "Street Style", likes: 2100, main: "https://picsum.photos/seed/vcol3/600/600", thumbs: ["https://picsum.photos/seed/vcol3a/200/200", "https://picsum.photos/seed/vcol3b/200/200", "https://picsum.photos/seed/vcol3c/200/200"], vendors: ["https://i.pravatar.cc/40?img=25", "https://i.pravatar.cc/40?img=44"] },
];

const savedItems = [
  { id: 1, name: "Vintage Watch", price: "$250", image: "https://picsum.photos/seed/saved1/400/400" },
  { id: 2, name: "Canvas Tote", price: "$35", image: "https://picsum.photos/seed/saved2/400/400" },
  { id: 3, name: "Silver Ring", price: "$68", image: "https://picsum.photos/seed/saved3/400/400" },
  { id: 4, name: "Wool Scarf", price: "$42", image: "https://picsum.photos/seed/saved4/400/400" },
];

const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const ProductCard = ({ item, onOpen }: { item: { id: number; name: string; price: string; image: string }; onOpen?: () => void }) => (
  <div onClick={onOpen} className="aspect-square rounded-[20px] overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform">
    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/15">
      <Heart size={16} className="text-white" strokeWidth={1.5} />
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
);

const VendorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const vendor = vendorMap[id || ""] || defaultVendor;
  const [activeTab, setActiveTab] = useState("Products");
  const [selectedPost, setSelectedPost] = useState<PostDetailData | null>(null);

  const stats = [
    { label: "Followers", value: vendor.followers },
    { label: "Posts", value: vendor.posts },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-28">
      <div className="relative overflow-hidden mx-1" style={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32, height: 200 }}>
        <img src="https://picsum.photos/seed/vendorbanner/800/400" alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex items-center justify-between px-5 pt-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Search size={20} className="text-white" />
          </button>
        </div>
      </div>

      <div className="relative z-10 -mt-16 flex justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-background bg-secondary shadow-sm overflow-hidden">
          <img src={vendor.avatar} alt={vendor.name} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mt-4 px-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">{vendor.name}</h1>
        <p className="mt-1 text-sm font-light text-muted-foreground">{vendor.bio}</p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-8">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{s.value}</div>
              <div className="-mt-1 text-[11px] font-medium text-muted-foreground">{s.label}</div>
            </div>
            {i < stats.length - 1 && <div className="w-px h-8 bg-border" />}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 px-4">
        {["Follow", "Message", "Reviews"].map((label) => (
          <button key={label} className="flex-1 rounded-2xl bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground">
            {label}
          </button>
        ))}
      </div>

      <nav className="mt-8 flex items-center justify-around border-b border-border/50 px-4">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 flex flex-col items-center pb-3 ${activeTab === tab ? "border-b-2 border-foreground" : ""}`}>
            <span className={`text-sm font-semibold ${activeTab === tab ? "text-foreground" : "text-muted-foreground"}`}>{tab}</span>
          </button>
        ))}
      </nav>

      {activeTab === "Products" && (
        <section className="py-4 px-3">
          {productCategories.map((category) => (
            <div key={category.name} className="mb-6">
              <div className="flex items-baseline gap-1 mb-3 px-1">
                <span className="text-lg font-bold text-foreground">{category.name}</span>
                <span className="text-[10px] text-muted-foreground align-super">{category.items.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {category.items.map((item) => <ProductCard key={item.id} item={item} />)}
              </div>
            </div>
          ))}
        </section>
      )}

      {activeTab === "Collections" && (
        <section className="py-4 px-3">
          <div className="flex flex-col gap-4">
            {collections.map((col) => (
              <div key={col.id} className="w-full aspect-square rounded-[20px] overflow-hidden relative">
                <img src={col.main} alt={col.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center -space-x-2 z-10">
                  {col.vendors.map((av, idx) => (
                    <img key={idx} src={av} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white/40" style={{ zIndex: col.vendors.length - idx }} />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <div className="flex gap-1.5 mb-3">
                    {col.thumbs.map((thumb, i) => (
                      <div key={i} className="w-11 h-11 rounded-[10px] overflow-hidden border-2 border-white/30">
                        <img src={thumb} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white truncate mr-2">{col.title}</span>
                    <button className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20 hover:bg-white/25 transition-colors">
                      <Heart size={20} className="text-rose-400 fill-rose-400" />
                      <span className="text-sm text-white font-semibold">{formatCount(col.likes)}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "Posts" && (
        <section className="py-4 px-3 flex flex-col gap-4">
          {[
            { image: "https://picsum.photos/seed/post1/600/600", caption: "New collection dropping this weekend! Stay tuned 🔥", likes: 2340, comments: 128, shares: 45 },
            { image: "https://picsum.photos/seed/post2/600/600", caption: "Behind the scenes of our latest photoshoot ✨", likes: 1890, comments: 96, shares: 32 },
            { image: "https://picsum.photos/seed/post3/600/600", caption: "Summer vibes with our best-selling pieces 🌊", likes: 3100, comments: 215, shares: 78 },
          ].map((post, i) => (
            <div key={i} onClick={() => setSelectedPost({ image: post.image, name: vendor.name, caption: post.caption, likes: post.likes, comments: post.comments, shares: post.shares, vendorName: vendor.name, vendorAvatar: vendor.avatar, vendorHandle: vendor.handle })} className="rounded-[20px] overflow-hidden relative aspect-square shadow-2xl cursor-pointer active:scale-[0.97] transition-transform">
              <img src={post.image} alt="Post" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <button className="absolute top-4 left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 z-10">
                <span className="text-white text-xs font-semibold">Buy Now</span>
              </button>
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
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <div className="flex items-center gap-2.5 mb-2">
                  <img src={vendor.avatar} alt={vendor.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/30" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{vendor.name}</span>
                    <span className="text-[11px] text-white/50">{vendor.handle}</span>
                  </div>
                </div>
                <p className="text-[12px] text-white/70 leading-relaxed line-clamp-2 pr-14">{post.caption}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {activeTab === "Saved" && (
        <section className="py-4 px-3">
          <div className="grid grid-cols-2 gap-3">
            {savedItems.map((item) => (
              <div key={item.id} className="aspect-square rounded-[20px] overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/15">
                  <Bookmark size={16} className="text-white fill-white" strokeWidth={1.5} />
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

export default VendorProfile;
