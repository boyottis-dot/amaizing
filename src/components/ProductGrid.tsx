import { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  handle: string;
  price: string;
  image: string;
  avatar: string;
  images?: string[]; // carousel images
}

interface ProductGridProps {
  title: string;
  count: number;
  products: Product[];
  onOpenProduct?: (product: Product) => void;
}

const ProductCard = ({ p, onOpen }: { p: Product; onOpen?: () => void }) => {
  const images = p.images && p.images.length > 1 ? p.images : [p.image];
  const isCarousel = images.length > 1;
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleSwipe = (e: React.TouchEvent) => {
    if (!isCarousel) return;
    const startX = e.changedTouches[0].clientX;
    const el = e.currentTarget;
    const handleEnd = (ev: TouchEvent) => {
      const diff = startX - ev.changedTouches[0].clientX;
      if (Math.abs(diff) > 30) {
        setCurrentIdx((prev) => {
          if (diff > 0) return Math.min(prev + 1, images.length - 1);
          return Math.max(prev - 1, 0);
        });
      }
      el.removeEventListener("touchend", handleEnd);
    };
    el.addEventListener("touchend", handleEnd);
  };

  return (
    <div
      onClick={onOpen}
      onTouchStart={handleSwipe}
      className="rounded-[20px] overflow-hidden bg-secondary relative cursor-pointer active:scale-[0.97] transition-transform"
      style={{ aspectRatio: "3 / 4" }}
    >
      <img src={images[currentIdx]} alt={p.name} className="w-full h-full object-cover transition-opacity duration-200" />
      <img src={p.avatar} alt="" className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full border-2 border-white/30 backdrop-blur-sm object-cover" />
      <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform duration-150">
        <Heart size={14} className="text-white" strokeWidth={1.5} />
      </button>

      {/* Carousel dots */}
      {isCarousel && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIdx ? "bg-white w-3" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
        <p className="text-white text-xs font-semibold truncate">{p.name}</p>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-white/60 text-[10px]">{p.handle}</span>
          <span className="text-white text-xs font-bold">{p.price}</span>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = ({ title, count, products, onOpenProduct }: ProductGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-foreground">{title}</span>
          <span className="text-[10px] text-muted-foreground align-super">{count}</span>
        </div>
        <button
          onClick={() => navigate(`/search?category=${encodeURIComponent(title)}`)}
          className="text-xs font-semibold text-primary active:scale-95 transition-transform duration-150"
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} onOpen={() => onOpenProduct?.(p)} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
