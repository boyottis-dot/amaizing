import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Search as SearchIcon,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";

import BottomNav from "@/components/BottomNav";
import StackedCards from "@/components/StackedCards";
import { useCart } from "@/contexts/CartContext";
import featuredBannerImage from "@/assets/shop-featured-banner.jpg";

const categories = [
  { label: "Clothes", image: "https://picsum.photos/seed/clothes2/80/80" },
  { label: "Shoes", image: "https://picsum.photos/seed/shoes2/80/80" },
  { label: "Bags", image: "https://picsum.photos/seed/bags2/80/80" },
  { label: "Jewelry", image: "https://picsum.photos/seed/jewelry3/80/80" },
  { label: "Home", image: "https://picsum.photos/seed/home3/80/80" },
  { label: "Art", image: "https://picsum.photos/seed/art3/80/80" },
] as const;

const allProducts = [
  { id: 1, name: "Silk Scarf", price: "$42", image: "https://picsum.photos/seed/prod1/400/400", category: "Clothes" },
  { id: 2, name: "Handmade Earrings", price: "$28", image: "https://picsum.photos/seed/near1/400/400", category: "Jewelry" },
  { id: 3, name: "Leather Wallet", price: "$65", image: "https://picsum.photos/seed/p3/400/400", category: "Bags" },
  { id: 4, name: "Gold Necklace", price: "$120", image: "https://picsum.photos/seed/p2/400/400", category: "Jewelry" },
  { id: 5, name: "Ceramic Mug", price: "$32", image: "https://picsum.photos/seed/near3/400/400", category: "Home" },
  { id: 6, name: "Woven Basket", price: "$45", image: "https://picsum.photos/seed/near4/400/400", category: "Home" },
] as const;

const trendingProducts = [
  { id: 11, name: "Canvas Sneakers", price: "$78", image: "https://picsum.photos/seed/trend1/400/400", category: "Shoes" },
  { id: 12, name: "Silver Ring", price: "$55", image: "https://picsum.photos/seed/trend2/400/400", category: "Jewelry" },
  { id: 13, name: "Macramé Wall Art", price: "$62", image: "https://picsum.photos/seed/trend3/400/400", category: "Art" },
  { id: 14, name: "Clay Earrings", price: "$24", image: "https://picsum.photos/seed/trend4/400/400", category: "Jewelry" },
] as const;

const relatedProducts = [
  { id: 7, name: "Art Print", price: "$28", image: "https://picsum.photos/seed/p7/400/400", category: "Art" },
  { id: 8, name: "Beaded Bracelet", price: "$18", image: "https://picsum.photos/seed/p8/400/400", category: "Jewelry" },
  { id: 9, name: "Linen Tote", price: "$38", image: "https://picsum.photos/seed/p9/400/400", category: "Bags" },
  { id: 10, name: "Scented Candle", price: "$22", image: "https://picsum.photos/seed/p10/400/400", category: "Home" },
] as const;

const vendors = [
  { id: 1, name: "Sienna James", category: "Vintage Fashion", img: "https://i.pravatar.cc/400?img=32" },
  { id: 2, name: "Maya Carter", category: "Beauty Studio", img: "https://i.pravatar.cc/400?img=25" },
  { id: 3, name: "Liam Chen", category: "Home Finds", img: "https://i.pravatar.cc/400?img=11" },
  { id: 4, name: "Tadala Mbewe", category: "Local Crafts", img: "https://i.pravatar.cc/400?img=15" },
] as const;

type ProductItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  category?: string;
};

const filterProducts = (items: ReadonlyArray<ProductItem>, filter: string | null) => {
  if (!filter) return [...items];
  return items.filter((p) => p.category === filter);
};

const ProductCard = ({ item }: { item: ProductItem }) => (
  <div className="aspect-square rounded-[20px] overflow-hidden relative shrink-0 w-[175px] snap-start cursor-pointer active:scale-[0.97] transition-transform">
    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
    <button type="button" aria-label={`Save ${item.name}`} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/15">
      <Heart size={16} className="text-white" strokeWidth={1.5} />
    </button>
    <div className="absolute bottom-3 left-3 right-3">
      <div className="bg-white/15 backdrop-blur-xl rounded-[12px] px-3 py-2 border border-white/15">
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <span className="text-white text-[11px] font-semibold truncate">{item.name}</span>
            <span className="text-white/70 text-[10px] font-bold">{item.price}</span>
          </div>
          <button type="button" aria-label={`Add ${item.name}`} className="shrink-0 w-7 h-7 rounded-full bg-background flex items-center justify-center ml-2">
            <span className="text-foreground text-sm font-bold leading-none">+</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, count }: { title: string; count: number }) => (
  <div className="flex items-center justify-between px-4 mb-3">
    <div className="flex items-baseline gap-1.5">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <span className="text-[10px] text-muted-foreground align-super">{count}</span>
    </div>
    <button type="button" className="flex items-center gap-0.5 text-xs font-semibold text-primary">
      View All <ChevronRight size={14} />
    </button>
  </div>
);

const ProductCarousel = ({ title, items }: { title: string; items: ReadonlyArray<ProductItem> }) => {
  if (items.length === 0) return null;
  return (
    <section className="pt-8">
      <SectionHeader title={title} count={items.length} />
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1 snap-x snap-mandatory scroll-pl-4 overscroll-x-contain" style={{ WebkitOverflowScrolling: "touch" }}>
        {items.map((item) => <ProductCard key={item.id} item={item} />)}
      </div>
    </section>
  );
};

const VendorRow = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-8">
      <SectionHeader title="Shop by Vendor" count={vendors.length} />
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1 snap-x snap-mandatory scroll-pl-4 overscroll-x-contain" style={{ WebkitOverflowScrolling: "touch" }}>
        {vendors.map((vendor) => (
          <div key={vendor.id} onClick={() => navigate(`/vendor/${vendor.id}`)} className="shrink-0 w-[150px] h-[180px] rounded-[18px] overflow-hidden relative cursor-pointer active:scale-95 transition-transform">
            <img src={vendor.img} alt="" className="absolute inset-0 w-full h-full object-cover scale-125 blur-xl opacity-90 saturate-200" loading="lazy" />
            <div className="absolute inset-0 bg-[hsl(var(--foreground)/0.05)]" />
            <div className="absolute top-3 left-3 right-3 z-10">
              <p className="text-[hsl(var(--background))] text-sm font-bold truncate drop-shadow-md">{vendor.name}</p>
              <p className="text-[hsl(var(--background)/0.6)] text-[10px] font-medium">{vendor.category}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <img src={vendor.img} alt={vendor.name} className="w-[80px] h-[80px] rounded-full object-cover border-[3px] border-[hsl(var(--background)/0.3)] shadow-xl" loading="lazy" />
            </div>
            <div className="absolute bottom-2.5 left-3 right-3 z-10">
              <button type="button" className="w-full py-1.5 rounded-full bg-[hsl(var(--background)/0.15)] backdrop-blur-xl text-[hsl(var(--background))] text-xs font-semibold border border-[hsl(var(--background)/0.2)] hover:bg-[hsl(var(--background)/0.25)] transition-colors">
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const FeaturedBanner = () => (
  <section className="pt-10 px-4">
    <div className="relative rounded-[24px] overflow-hidden min-h-[220px]">
      <img src={featuredBannerImage} alt="Featured marketplace collection" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--foreground)/0.08),transparent_28%,hsl(var(--foreground)/0.72))]" />
      <div className="relative flex min-h-[220px] flex-col justify-end p-5">
        <span className="inline-flex w-fit rounded-full bg-[hsl(var(--background)/0.14)] backdrop-blur-xl border border-[hsl(var(--background)/0.2)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--background))]">
          Featured Collection
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[hsl(var(--background))]">New Market Edit</h2>
        <p className="mt-1.5 max-w-[15rem] text-[13px] leading-5 text-[hsl(var(--background)/0.78)]">Fresh fashion, modern home pieces, and crafted details in one curated drop.</p>
        <button type="button" className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground">
          Shop Now <ArrowRight size={15} />
        </button>
      </div>
    </div>
  </section>
);

const Search = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cartCount } = useCart();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      const match = categories.find((c) => c.label === cat);
      if (match) setActiveFilter(match.label);
    }
  }, [searchParams]);

  const filteredTrending = filterProducts(trendingProducts, activeFilter);
  const filteredProducts = filterProducts(allProducts, activeFilter);
  const filteredRelated = filterProducts(relatedProducts, activeFilter);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <h1 className="sr-only">Shop</h1>

      <header className="sticky top-0 z-50 px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 bg-background/50 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] rounded-2xl h-12 px-2 border border-border/30 w-full">
          <SearchIcon size={15} className="text-muted-foreground shrink-0 ml-2" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, vendors..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0" autoFocus />
          {query && (
            <button type="button" onClick={() => setQuery("")} className="shrink-0">
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
          <div className="w-px h-5 bg-border/40 shrink-0" />
          <button type="button" className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <SlidersHorizontal size={15} className="text-foreground" />
          </button>
          <div className="w-px h-5 bg-border/40 shrink-0" />
          <button type="button" onClick={() => navigate("/cart")} className="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <ShoppingBag size={16} className="text-foreground" strokeWidth={1.6} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[hsl(0,75%,30%)] text-[9px] font-bold text-white flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="px-4 pt-2 pb-3">
        <div className="-mx-4 flex gap-2 overflow-x-auto no-scrollbar px-4 py-1">
          {categories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setActiveFilter(activeFilter === cat.label ? null : cat.label)}
              className={`shrink-0 flex items-center gap-1.5 pl-[3px] pr-3 py-[3px] rounded-full text-[12px] font-semibold transition-all backdrop-blur-xl ${
                activeFilter === cat.label
                  ? "bg-foreground text-background"
                  : "bg-background/60 text-muted-foreground hover:bg-background/80 shadow-[0_2px_8px_-1px_hsl(var(--foreground)/0.08)]"
              }`}
            >
              <img src={cat.image} alt={cat.label} className="w-8 h-8 rounded-full object-cover ring-1 ring-border/30" loading="lazy" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-28">
        {!activeFilter && <FeaturedBanner />}
        <ProductCarousel title="Trending Right Now" items={filteredTrending} />
        {!activeFilter && <VendorRow />}
        <ProductCarousel title="Continue Browsing" items={filteredProducts} />
        {!activeFilter && (
          <div className="px-4 mt-8">
            <StackedCards />
          </div>
        )}
        <ProductCarousel title="Fresh Finds" items={filteredRelated} />
        {!activeFilter && (
          <div className="px-4 mt-8">
            <StackedCards />
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Search;
