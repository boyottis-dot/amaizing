import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Hash, MapPin, Package, ChevronDown, X, Check, Search } from "lucide-react";

const products = [
  { id: 1, name: "Silk Dress", vendor: "@amara.style", image: "https://picsum.photos/seed/p1/100/100" },
  { id: 2, name: "Gold Necklace", vendor: "@lina.jewels", image: "https://picsum.photos/seed/p2/100/100" },
  { id: 3, name: "Leather Bag", vendor: "@kofi.craft", image: "https://picsum.photos/seed/p3/100/100" },
  { id: 4, name: "Ceramic Mug", vendor: "@chen.home", image: "https://picsum.photos/seed/near3/100/100" },
  { id: 5, name: "Canvas Sneakers", vendor: "@liam.kicks", image: "https://picsum.photos/seed/trend1/100/100" },
  { id: 6, name: "Art Print", vendor: "@priya.art", image: "https://picsum.photos/seed/p7/100/100" },
];

const CreatePost = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [rating, setRating] = useState(5);
  const [productSearch, setProductSearch] = useState("");

  const handleFakeUpload = () => {
    setUploadedImage("https://picsum.photos/seed/userpost/600/600");
    setStep(2);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.vendor.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150"
        >
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">New Review</span>
          </div>
        </div>
        {step === 2 ? (
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center justify-center h-9 px-4 rounded-full bg-foreground text-background text-xs font-bold active:scale-95 transition-transform duration-150"
          >
            Post
          </button>
        ) : (
          <div className="w-9" />
        )}
      </header>

      <main className="px-4 pb-12">
        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="pt-8 flex flex-col items-center">
            <button
              onClick={handleFakeUpload}
              className="w-full aspect-[4/5] rounded-[24px] border-2 border-dashed border-border/40 bg-background/60 backdrop-blur-xl flex flex-col items-center justify-center gap-3 active:scale-[0.98] transition-transform duration-150"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/80 flex items-center justify-center">
                <Camera size={28} className="text-muted-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">Upload Photo or Video</span>
              <span className="text-xs text-muted-foreground">Tap to choose from gallery</span>
            </button>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && uploadedImage && (
          <div className="space-y-4 pt-2">
            {/* Preview */}
            <div className="rounded-[20px] overflow-hidden relative aspect-[4/5]">
              <img src={uploadedImage} alt="Upload" className="w-full h-full object-cover" />
              <button
                onClick={() => { setUploadedImage(null); setStep(1); }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10 active:scale-90 transition-transform duration-150"
              >
                <X size={14} className="text-white" />
              </button>
            </div>

            {/* Caption */}
            <div className="rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] p-4">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write your review..."
                rows={3}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none"
              />
            </div>

            {/* Rating */}
            <div className="rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Rating</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setRating(s)} className="active:scale-90 transition-transform duration-150">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={s <= rating ? "hsl(45, 93%, 47%)" : "none"} stroke={s <= rating ? "hsl(45, 93%, 47%)" : "hsl(var(--muted-foreground))"} strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Select product */}
            <button
              onClick={() => setShowProductPicker(!showProductPicker)}
              className="w-full rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] px-4 py-3 flex items-center gap-3 active:scale-[0.98] transition-transform duration-150"
            >
              <Package size={16} className="text-muted-foreground" />
              <span className="flex-1 text-left text-sm font-semibold text-foreground">
                {selectedProduct ? products.find((p) => p.id === selectedProduct)?.name : "Select product to review"}
              </span>
              <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 ${showProductPicker ? "rotate-180" : ""}`} />
            </button>

            {showProductPicker && (
              <div className="rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] overflow-hidden">
                {/* Product search */}
                <div className="px-4 py-2.5 border-b border-border/15 flex items-center gap-2">
                  <Search size={14} className="text-muted-foreground shrink-0" />
                  <input
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                  />
                </div>
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedProduct(p.id); setShowProductPicker(false); setProductSearch(""); }}
                    className="w-full flex items-center gap-3 px-4 py-3 border-b border-border/10 last:border-0 active:bg-secondary/50 transition-colors duration-150"
                  >
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">{p.vendor}</p>
                    </div>
                    {selectedProduct === p.id && <Check size={16} className="text-primary" />}
                  </button>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-muted-foreground">No products found</p>
                  </div>
                )}
              </div>
            )}

            {/* Location */}
            <div className="rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] px-4 py-3 flex items-center gap-3">
              <MapPin size={16} className="text-muted-foreground shrink-0" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
              />
            </div>

            {/* Hashtags */}
            <div className="rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] px-4 py-3 flex items-center gap-3">
              <Hash size={16} className="text-muted-foreground shrink-0" />
              <input
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="Add hashtags (e.g. #review #fashion)"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreatePost;
