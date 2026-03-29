import { ArrowLeft, Search, Heart, Bookmark, MessageCircle, Send, Plus, X, Star, Eye, Paperclip, MoreHorizontal, Reply } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const vendorMap: Record<string, { name: string; handle: string; avatar: string; bio: string; followers: string; posts: string }> = {
  amara: { name: "Amara Okafor", handle: "@amara.style", avatar: "https://i.pravatar.cc/400?img=32", bio: "West African silk & textile designer 🧵✨", followers: "2.3 K", posts: "89" },
  kofi: { name: "Kofi Mensah", handle: "@kofi.craft", avatar: "https://i.pravatar.cc/400?img=15", bio: "Hand-stitched leather goods, made to last a lifetime 🧵", followers: "1.8 K", posts: "54" },
  "1": { name: "Sienna James", handle: "@sienna.james", avatar: "https://i.pravatar.cc/400?img=32", bio: "Vintage fashion curator 👗", followers: "2.1 K", posts: "166" },
  "2": { name: "Maya Carter", handle: "@maya.carter", avatar: "https://i.pravatar.cc/400?img=25", bio: "Beauty & skincare enthusiast 💄", followers: "1.8 K", posts: "93" },
  "3": { name: "Liam Chen", handle: "@liam.chen", avatar: "https://i.pravatar.cc/400?img=11", bio: "Home decor & modern living 🏠", followers: "3.4 K", posts: "127" },
  "4": { name: "Tadala Mbewe", handle: "@tadala.crafts", avatar: "https://i.pravatar.cc/400?img=15", bio: "Local crafts & handmade treasures ✋", followers: "1.2 K", posts: "78" },
};

const defaultVendor = { name: "Katty Abrahams", handle: "@kattyabrahams", avatar: "https://i.pravatar.cc/400?img=32", bio: "I'm delighted to introduce myself as a professional model 🥳", followers: "567 K", posts: "166" };

const tabs = ["Products", "Collections", "Saved"];

const vendorPosts = [
  {
    id: 1, post: "https://picsum.photos/seed/post1/200/200", caption: "New collection dropping this weekend! Stay tuned 🔥", likes: 2340, comments: 128, shares: 45,
    product: { name: "Silk Scarf", variant: "Ocean Blue", price: "$42.00", rating: 4.6, image: "https://picsum.photos/seed/prod1/200/200" },
    commentsList: [
      { name: "Lina Rose", avatar: "https://i.pravatar.cc/40?img=9", text: "Love this color!" },
      { name: "Kofi M.", avatar: "https://i.pravatar.cc/40?img=15", text: "Where can I get one?" },
    ],
  },
  {
    id: 2, post: "https://picsum.photos/seed/post2/200/200", caption: "Behind the scenes of our latest photoshoot ✨", likes: 1890, comments: 96, shares: 32,
    product: { name: "Handmade Earrings", variant: "Gold Plated", price: "$28.00", rating: 4.9, image: "https://picsum.photos/seed/near1/200/200" },
    commentsList: [
      { name: "Marco V.", avatar: "https://i.pravatar.cc/40?img=12", text: "These are stunning!" },
      { name: "Priya K.", avatar: "https://i.pravatar.cc/40?img=23", text: "Just ordered mine 💕" },
      { name: "Sofia G.", avatar: "https://i.pravatar.cc/40?img=25", text: "Perfect gift idea" },
    ],
  },
  {
    id: 3, post: "https://picsum.photos/seed/post3/200/200", caption: "Summer vibes with our best-selling pieces 🌊", likes: 3100, comments: 215, shares: 78,
    product: { name: "Ceramic Mug", variant: "Matte Black", price: "$32.00", rating: 4.8, image: "https://picsum.photos/seed/near3/200/200" },
    commentsList: [
      { name: "David K.", avatar: "https://i.pravatar.cc/40?img=52", text: "Need this for my collection" },
    ],
  },
  {
    id: 4, post: "https://picsum.photos/seed/post4/200/200", caption: "Handcrafted with love ❤️", likes: 1200, comments: 64, shares: 20,
    product: { name: "Leather Wallet", variant: "Tan Brown", price: "$65.00", rating: 4.7, image: "https://picsum.photos/seed/p3/200/200" },
    commentsList: [
      { name: "Aisha B.", avatar: "https://i.pravatar.cc/40?img=5", text: "Quality looks amazing" },
      { name: "Liam J.", avatar: "https://i.pravatar.cc/40?img=11", text: "Is this full grain?" },
    ],
  },
  {
    id: 5, post: "https://picsum.photos/seed/post5/200/200", caption: "Limited edition pieces available now 🎯", likes: 980, comments: 42, shares: 15,
    product: { name: "Gold Necklace", variant: "18K Plated", price: "$120.00", rating: 5.0, image: "https://picsum.photos/seed/p2/200/200" },
    commentsList: [
      { name: "Kofi M.", avatar: "https://i.pravatar.cc/40?img=15", text: "Gorgeous piece!" },
    ],
  },
];

const productCategories = [
  {
    name: "All",
    items: [] as { id: number; name: string; price: string; image: string }[],
  },
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

// "All" aggregates all other categories
productCategories[0].items = productCategories.slice(1).flatMap((c) => c.items);

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

const discoverVendors = [
  { id: "v1", name: "Lina Jewels", handle: "@lina.jewels", avatar: "https://i.pravatar.cc/400?img=9", followers: "1.5K", pills: ["Jewelry", "Accessories", "Gifts"] },
  { id: "v2", name: "Sofia Glow", handle: "@sofia.glow", avatar: "https://i.pravatar.cc/400?img=25", followers: "2.8K", pills: ["Skincare", "Beauty", "Organic"] },
  { id: "v3", name: "Marco Optics", handle: "@marco.optics", avatar: "https://i.pravatar.cc/400?img=12", followers: "980", pills: ["Eyewear", "Fashion"] },
  { id: "v4", name: "Priya Art", handle: "@priya.art", avatar: "https://i.pravatar.cc/400?img=23", followers: "3.1K", pills: ["Art", "Prints", "Home Decor"] },
  { id: "v5", name: "Chen Home", handle: "@chen.home", avatar: "https://i.pravatar.cc/400?img=33", followers: "1.2K", pills: ["Home", "Candles", "Decor"] },
];

const fakeComments = [
  { id: 1, user: "Lina K.", avatar: "https://i.pravatar.cc/32?img=9", text: "Love this! Where can I get one? 😍", time: "2h", likes: 12, replies: 3 },
  { id: 2, user: "Kofi M.", avatar: "https://i.pravatar.cc/32?img=15", text: "The craftsmanship is amazing, truly one of a kind work", time: "4h", likes: 8, replies: 1 },
  { id: 3, user: "Sofia R.", avatar: "https://i.pravatar.cc/32?img=25", text: "Just ordered mine! Can't wait 🔥", time: "6h", likes: 5, replies: 0 },
  { id: 4, user: "Marco T.", avatar: "https://i.pravatar.cc/32?img=12", text: "This is beautiful work, keep it up!", time: "8h", likes: 3, replies: 2 },
  { id: 5, user: "Priya D.", avatar: "https://i.pravatar.cc/32?img=23", text: "Stunning piece! 💎 The detail is incredible", time: "12h", likes: 21, replies: 4 },
];

const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

/* ─── CommentsSheet (matching StoryViewer) ─── */
const CommentsSheet = ({ open, onClose, storyImage }: { open: boolean; onClose: () => void; storyImage: string }) => {
  const [comment, setComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const toggleCommentLike = (id: number) => {
    setLikedComments(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[120]" onClick={onClose}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="absolute bottom-0 left-0 right-0 max-h-[75vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="absolute inset-0 overflow-hidden rounded-t-[28px]">
              <img src={storyImage} alt="" className="w-full h-64 object-cover object-bottom blur-3xl scale-110 opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,8%)]/80 via-[hsl(0,0%,8%)]/95 to-[hsl(0,0%,8%)]" />
            </div>
            <div className="relative rounded-t-[28px] overflow-hidden flex flex-col max-h-[75vh]">
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-white/50" />
                  <span className="text-[13px] font-bold text-white/90">{fakeComments.length} Comments</span>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center">
                  <X size={14} className="text-white/70" />
                </button>
              </div>
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
                              <button className="opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={14} className="text-white/30" /></button>
                            </div>
                            <p className="text-[12px] text-white/55 leading-relaxed mt-1">{c.text}</p>
                            <div className="flex items-center gap-4 mt-2.5">
                              <button onClick={() => toggleCommentLike(c.id)} className="flex items-center gap-1.5 transition-all">
                                <Heart size={12} className={likedComments.has(c.id) ? "text-rose-400 fill-rose-400" : "text-white/30"} />
                                <span className={`text-[10px] font-semibold ${likedComments.has(c.id) ? "text-rose-400" : "text-white/30"}`}>{c.likes + (likedComments.has(c.id) ? 1 : 0)}</span>
                              </button>
                              <button onClick={() => { setReplyingTo(c.user); setComment(`@${c.user} `); }} className="flex items-center gap-1.5 text-white/30 hover:text-white/50 transition-colors">
                                <Reply size={12} /><span className="text-[10px] font-semibold">Reply</span>
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
              <div className="absolute bottom-0 left-0 right-0 z-50 px-4 py-3 bg-black/40 backdrop-blur-2xl">
                {replyingTo && (
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[11px] text-white/40">Replying to <span className="text-white/70 font-semibold">@{replyingTo}</span></span>
                    <button onClick={() => { setReplyingTo(null); setComment(""); }} className="text-[11px] text-white/30 font-medium">Cancel</button>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <img src="https://i.pravatar.cc/32?img=3" alt="You" className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-white/10" />
                  <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder={replyingTo ? `Reply to @${replyingTo}...` : "Add a comment..."} className="flex-1 bg-transparent text-[12px] text-white placeholder:text-white/25 outline-none" />
                  <div className="flex items-center gap-3">
                    <Paperclip size={14} className="text-white/25" />
                    <span className="text-[11px] font-bold text-white/25">GIF</span>
                    {comment && <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0"><Send size={13} className="text-primary-foreground" /></button>}
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

/* ─── Animated comment (matching StoryViewer) ─── */
const AnimatedComment = ({ comment, index, slideKey }: { comment: { name: string; avatar: string; text: string }; index: number; slideKey: string }) => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVisible(false); setMounted(false);
    const delay = 800 + index * 1200;
    const t1 = setTimeout(() => setMounted(true), delay);
    const t2 = setTimeout(() => setVisible(true), delay + 30);
    const t3 = setTimeout(() => setVisible(false), delay + 4000);
    const t4 = setTimeout(() => setMounted(false), delay + 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [slideKey, index]);

  if (!mounted) return null;
  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(6px) scale(0.97)", transition: "opacity 900ms cubic-bezier(0.25,0.1,0.25,1), transform 900ms cubic-bezier(0.25,0.1,0.25,1)" }}>
      <div className="flex items-center gap-2.5">
        <img src={comment.avatar} alt={comment.name} className="w-8 h-8 rounded-full object-cover border border-white/30 shrink-0" />
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-3 py-2 flex items-center">
          <span className="text-white font-bold text-[11px] drop-shadow-md">{comment.name} </span>
          <span className="text-white/80 text-[11px] drop-shadow-sm">{comment.text}</span>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ item }: { item: { id: number; name: string; price: string; image: string } }) => (
  <div className="aspect-square rounded-[18px] overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform">
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
          <button className="shrink-0 w-7 h-7 rounded-full bg-foreground flex items-center justify-center ml-2">
            <span className="text-background text-sm font-bold leading-none">+</span>
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
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);
  const [showDiscover, setShowDiscover] = useState(false);
  const [activeProductCat, setActiveProductCat] = useState("All");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const stats = [
    { label: "Followers", value: vendor.followers },
    { label: "Posts", value: vendor.posts },
  ];

  const filteredProducts = activeProductCat === "All"
    ? productCategories[0].items
    : productCategories.find((c) => c.name === activeProductCat)?.items || [];

  const currentPost = selectedPostIndex !== null ? vendorPosts[selectedPostIndex] : null;

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

      <div className="mt-6 flex items-center gap-2 px-4">
        {["Follow", "Message", "Reviews"].map((label) => (
          <button key={label} className="flex-1 rounded-2xl bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground">{label}</button>
        ))}
        <button onClick={() => setShowDiscover(true)} className="w-11 h-11 rounded-2xl bg-foreground flex items-center justify-center shrink-0 active:scale-90 transition-transform duration-150">
          <Plus size={18} className="text-background" />
        </button>
      </div>

      {/* Vendor Posts as Stories */}
      <div className="px-4 mt-6">
        <div className="pt-4 pb-2">
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-lg font-bold text-foreground">Posts</span>
            <span className="text-[10px] text-muted-foreground align-super">{vendorPosts.length}</span>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
            <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pt-1">
              {vendorPosts.map((p) => (
                <div key={p.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 transition-transform duration-150" onClick={() => { setSelectedPostIndex(vendorPosts.indexOf(p)); setLiked(false); setSaved(false); }}>
                  <div className="relative">
                    <div className="absolute -inset-[3px] rounded-[21px] bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600" />
                    <div className="relative w-[72px] h-[90px] rounded-[18px] overflow-hidden bg-secondary">
                      <img src={p.post} alt="Post" className="w-full h-full object-cover" />
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                        <img src={vendor.avatar} alt={vendor.name} className="w-6 h-6 rounded-full object-cover border-2 border-white/30 backdrop-blur-sm" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground truncate w-[72px] text-center">{vendor.name.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className="mt-4 flex items-center justify-around border-b border-border/50 px-4">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 flex flex-col items-center pb-3 ${activeTab === tab ? "border-b-2 border-foreground" : ""}`}>
            <span className={`text-sm font-semibold ${activeTab === tab ? "text-foreground" : "text-muted-foreground"}`}>{tab}</span>
          </button>
        ))}
      </nav>

      {activeTab === "Products" && (
        <section className="py-4 px-3">
          {/* Category pills filter with circle images */}
          <div className="relative -mx-3 mb-4">
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-1">
              {productCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveProductCat(cat.name)}
                  className={`shrink-0 flex items-center gap-1.5 pl-[3px] pr-3 py-[3px] rounded-full text-[12px] font-semibold transition-all duration-200 active:scale-95 ${
                    activeProductCat === cat.name
                      ? "bg-foreground text-background"
                      : "bg-background/60 text-muted-foreground hover:bg-background/80 shadow-sm border border-border/20"
                  }`}
                >
                  <img
                    src={`https://picsum.photos/seed/vcat-${cat.name.toLowerCase().replace(/\s/g, '')}/80/80`}
                    alt={cat.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-border/30"
                  />
                  {cat.name}
                  <span className="text-[10px] opacity-60">{cat.name === "All" ? productCategories[0].items.length : cat.items.length}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((item) => <ProductCard key={item.id} item={item} />)}
          </div>
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
                      <button className="shrink-0 w-7 h-7 rounded-full bg-foreground flex items-center justify-center ml-2">
                        <span className="text-background text-sm font-bold leading-none">+</span>
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

      {/* Story-style post viewer (matching StoryViewer design) */}
      {currentPost && selectedPostIndex !== null && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black">
            {/* No X close button - back arrow in header is sufficient */}

            {/* Progress bars with auto-advance */}
            <VendorStoryProgress
              total={vendorPosts.length}
              current={selectedPostIndex!}
              onAdvance={() => setSelectedPostIndex(prev => prev !== null && prev < vendorPosts.length - 1 ? prev + 1 : null)}
            />

            {/* Full screen image */}
            <img src={currentPost.post.replace("/200/200", "/800/1200")} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

            {/* Tap zones */}
            <div className="absolute inset-0 z-30 flex" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              if (x < rect.width / 2) {
                setSelectedPostIndex(prev => prev !== null && prev > 0 ? prev - 1 : prev);
              } else {
                setSelectedPostIndex(prev => prev !== null && prev < vendorPosts.length - 1 ? prev + 1 : null);
              }
            }} />

            {/* Header */}
            <header className="absolute top-7 left-0 w-full px-4 flex items-center justify-between z-40">
              <div className="flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); setSelectedPostIndex(null); }} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                  <ArrowLeft size={18} className="text-white" />
                </button>
                <img src={vendor.avatar} alt={vendor.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/30" />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm drop-shadow-md">{vendor.name}</span>
                  <span className="text-white/70 text-xs">{formatCount(currentPost.likes)} likes</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3.5 py-2 flex items-center gap-1.5">
                <Eye size={14} className="text-white/80" />
                <span className="text-white text-xs font-semibold">{formatCount(currentPost.comments)}</span>
              </div>
            </header>

            {/* Right engagement panel */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[18px] px-2.5 py-4 z-40" onClick={(e) => e.stopPropagation()}>
              <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200" onClick={() => setLiked(!liked)}>
                <Heart size={22} className={liked ? "text-rose-400 fill-rose-400" : "text-white/80"} />
                <span className="text-[10px] text-white font-semibold">{formatCount(currentPost.likes + (liked ? 1 : 0))}</span>
              </button>
              <div className="w-6 h-px bg-white/15" />
              <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200" onClick={() => setCommentsOpen(true)}>
                <MessageCircle size={22} className="text-white/80" />
                <span className="text-[10px] text-white font-semibold">{formatCount(currentPost.comments)}</span>
              </button>
              <div className="w-6 h-px bg-white/15" />
              <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200" onClick={() => setSaved(!saved)}>
                <Bookmark size={22} className={saved ? "text-rose-400 fill-rose-400" : "text-white/80"} />
                <span className={`text-[10px] font-semibold ${saved ? "text-rose-400" : "text-white/60"}`}>{saved ? "saved" : "save"}</span>
              </button>
              <div className="w-6 h-px bg-white/15" />
              <button className="flex flex-col items-center gap-0.5 py-1.5 active:scale-[0.7] transition-transform duration-200">
                <Send size={22} className="text-white/80" />
                <span className="text-[10px] text-white font-semibold">{formatCount(currentPost.shares)}</span>
              </button>
            </div>

            {/* Animated comments */}
            <div className="absolute left-4 z-40 max-w-[65%]" style={{ top: "50%", transform: "translateY(-50%)" }} onClick={(e) => e.stopPropagation()}>
              {currentPost.commentsList.slice(0, 3).map((c, i) => (
                <div key={`${currentPost.id}-${i}`} style={{ height: 44, marginBottom: i < Math.min(currentPost.commentsList.length, 3) - 1 ? 10 : 0 }}>
                  <AnimatedComment comment={c} index={i} slideKey={`vendor-${currentPost.id}`} />
                </div>
              ))}
            </div>

            {/* Product card */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[90%] z-40 bg-white/15 backdrop-blur-xl rounded-[20px] p-3 flex items-center border border-white/20" style={{ bottom: "5.5rem" }} onClick={(e) => e.stopPropagation()}>
              <div className="w-14 h-14 rounded-[12px] overflow-hidden shrink-0 border border-white/20">
                <img src={currentPost.product.image} alt={currentPost.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col overflow-hidden ml-3 flex-grow">
                <span className="font-bold text-white text-sm truncate">{currentPost.product.name}</span>
                <span className="text-[11px] text-white/60 truncate">{currentPost.product.variant}</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[11px] font-bold text-white">{currentPost.product.rating}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
                <span className="font-bold text-white text-sm">{currentPost.product.price}</span>
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider active:scale-[0.85] transition-transform duration-200">View</button>
              </div>
            </div>

            {/* Bottom message bar */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[90%] z-40 flex items-center gap-3" style={{ bottom: "1.5rem" }} onClick={(e) => e.stopPropagation()}>
              <div className="flex-grow h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center px-4">
                <span className="text-white/50 text-sm">Send a message...</span>
              </div>
              <button className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shrink-0" onClick={() => setLiked(!liked)}>
                <Heart size={20} className={liked ? "text-rose-400 fill-rose-400" : "text-white"} />
              </button>
            </div>

            {/* Comments sheet */}
            <CommentsSheet open={commentsOpen} onClose={() => setCommentsOpen(false)} storyImage={currentPost.post.replace("/200/200", "/800/1200")} />
          </motion.div>
        </AnimatePresence>
      )}

      {showDiscover && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center" onClick={() => setShowDiscover(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md bg-background/90 backdrop-blur-xl border-t border-border/30 rounded-t-[28px] shadow-[0_-8px_40px_-8px_hsl(var(--foreground)/0.2)] p-5 pb-10" style={{ animation: "slide-up 0.3s ease-out" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-foreground">Discover Vendors</h3>
              <button onClick={() => setShowDiscover(false)} className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center active:scale-90 transition-transform">
                <X size={16} className="text-foreground" />
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory px-1">
                {discoverVendors.map((v) => (
                  <div key={v.id} onClick={() => { setShowDiscover(false); navigate(`/vendor/${v.id}`); }} className="shrink-0 w-[200px] rounded-[22px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.08)] p-4 snap-start cursor-pointer active:scale-[0.97] transition-transform">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-border/20 shadow-lg mb-2.5">
                        <img src={v.avatar} alt={v.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-bold text-foreground truncate w-full">{v.name}</p>
                      <p className="text-[10px] text-muted-foreground">{v.handle}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{v.followers} followers</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3 justify-center">
                      {v.pills.map((pill) => (
                        <span key={pill} className="px-2 py-0.5 rounded-full bg-foreground/5 border border-border/20 text-[9px] font-medium text-muted-foreground">{pill}</span>
                      ))}
                    </div>
                    <button className="w-full mt-3 py-2 rounded-full bg-foreground text-background text-xs font-semibold active:scale-95 transition-transform">Follow</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorProfile;
