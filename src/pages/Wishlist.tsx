import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Edit3, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const initialItems = [
  { id: 1, name: "Handmade Earrings", price: "$24", image: "https://picsum.photos/seed/wish1/400/400" },
  { id: 2, name: "Organic Soap Set", price: "$18", image: "https://picsum.photos/seed/wish2/400/400" },
  { id: 3, name: "Ceramic Mug", price: "$32", image: "https://picsum.photos/seed/wish3/400/400" },
  { id: 4, name: "Woven Basket", price: "$45", image: "https://picsum.photos/seed/wish4/400/400" },
  { id: 5, name: "Silk Scarf", price: "$55", image: "https://picsum.photos/seed/wish5/400/400" },
  { id: 6, name: "Candle Trio", price: "$38", image: "https://picsum.photos/seed/wish6/400/400" },
];

const Wishlist = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialItems);
  const [isEditing, setIsEditing] = useState(false);

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Wishlist</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => {}} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
            <Share2 size={14} className="text-foreground" />
          </button>
          <button onClick={() => setIsEditing(!isEditing)} className={`flex items-center justify-center h-9 w-9 rounded-full backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150 ${isEditing ? "bg-foreground" : "bg-background/60"}`}>
            <Edit3 size={14} className={isEditing ? "text-background" : "text-foreground"} />
          </button>
        </div>
      </header>

      <main className="px-3 pb-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-24 text-center">
            <Heart size={40} className="text-muted-foreground/30 mb-3" />
            <p className="text-sm font-semibold text-foreground">No saved items yet</p>
            <p className="text-xs text-muted-foreground mt-1">Items you save will appear here</p>
            <button onClick={() => navigate("/")} className="mt-5 rounded-full bg-foreground text-background px-6 py-2.5 text-xs font-semibold active:scale-95 transition-transform duration-150">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-square rounded-[18px] overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform duration-200"
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {isEditing && (
                    <button onClick={() => removeItem(item.id)} className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10 active:scale-90 transition-transform duration-150">
                      <X size={14} className="text-white" />
                    </button>
                  )}
                  {!isEditing && (
                    <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/15 active:scale-90 transition-transform duration-150">
                      <Heart size={16} className="text-white fill-white" strokeWidth={1.5} />
                    </button>
                  )}
                  <div className="absolute top-3 right-3 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <span className="text-white text-[11px] font-bold">{item.price}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/15 backdrop-blur-xl rounded-[12px] px-3 py-2 border border-white/15">
                      <span className="text-white text-[11px] font-semibold truncate block">{item.name}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Wishlist;
