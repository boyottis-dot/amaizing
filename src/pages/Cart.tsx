import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Minus, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

type CartItem = {
  id: number;
  name: string;
  brand: string;
  price: number;
  qty: number;
  image: string;
  bgColor: string;
};

const initialItems: CartItem[] = [
  { id: 1, name: "Purifying Balm", brand: "Glow Melt", price: 90, qty: 1, image: "https://picsum.photos/seed/cart1/200/200", bgColor: "hsl(0 50% 35%)" },
  { id: 2, name: "Daily Glow Shield", brand: "Shield On", price: 80, qty: 1, image: "https://picsum.photos/seed/cart2/200/200", bgColor: "hsl(42 90% 55%)" },
  { id: 3, name: "Hydra Glow", brand: "Hydra Glow", price: 90, qty: 1, image: "https://picsum.photos/seed/cart3/200/200", bgColor: "hsl(350 30% 75%)" },
];

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const { setCartCount } = useCart();

  useEffect(() => {
    setCartCount(items.reduce((sum, item) => sum + item.qty, 0));
  }, [items, setCartCount]);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="sticky top-4 z-50 flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 transition-all duration-150 hover:bg-background active:scale-90"
        >
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <span className="text-lg font-bold text-foreground">Cart · {items.reduce((s, i) => s + i.qty, 0)}</span>
      </div>

      <main className="flex-1 px-4 space-y-3 pb-72">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -200, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative flex gap-3 bg-background/60 backdrop-blur-xl p-2.5 rounded-3xl shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] border border-border/30"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shrink-0 w-24 h-24" style={{ backgroundColor: item.bgColor }}>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.brand}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 w-7 h-7 rounded-full bg-secondary/80 flex items-center justify-center border border-border/30 active:scale-90 transition-transform duration-150"
                    >
                      <X size={12} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-foreground">{item.qty} × ${item.price.toFixed(2)}</span>
                  <div className="flex items-center rounded-full bg-foreground overflow-hidden">
                    <button type="button" onClick={() => updateQty(item.id, 1)} className="w-9 h-8 flex items-center justify-center text-background">
                      <Plus size={14} />
                    </button>
                    <button type="button" onClick={() => updateQty(item.id, -1)} className="w-9 h-8 flex items-center justify-center text-background">
                      <Minus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-base font-semibold">Your cart is empty</p>
            <p className="text-sm mt-1">Browse the shop to add items</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-6 inset-x-0 z-30 flex justify-center px-4">
        <div className="w-full max-w-[calc(28rem-2rem)] rounded-3xl bg-secondary/70 backdrop-blur-xl border border-border/30 shadow-[0_-8px_40px_-8px_hsl(var(--foreground)/0.12)] p-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-muted-foreground">Delivery</span>
            <span className="text-sm font-semibold text-foreground">Free</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Order Total</span>
            <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="w-full h-14 rounded-full bg-foreground flex items-center justify-between px-7 active:scale-[0.97] transition-transform"
          >
            <span className="text-[15px] font-bold text-background tracking-[-0.01em]">Proceed to Checkout</span>
            <ArrowRight size={18} className="text-background" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
