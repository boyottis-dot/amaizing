import { Bell, Search, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] p-1">
        <button
          type="button"
          onClick={() => navigate("/search")}
          className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform duration-150"
        >
          <Search size={16} className="text-foreground" strokeWidth={1.6} />
        </button>
        <div className="w-px h-4 bg-border/40" />
        <button
          type="button"
          onClick={() => navigate("/notifications")}
          className="relative w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform duration-150"
        >
          <Bell size={16} className="text-foreground" strokeWidth={1.6} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[hsl(0,75%,30%)] text-[9px] font-bold text-white flex items-center justify-center">
            5
          </span>
        </button>
        <div className="w-px h-4 bg-border/40" />
        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="relative w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform duration-150"
        >
          <ShoppingBag size={16} className="text-foreground" strokeWidth={1.6} />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[hsl(0,75%,30%)] text-[9px] font-bold text-white flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="pt-6 pb-2">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <img
              src="https://i.pravatar.cc/40?img=47"
              alt="Profile"
              className="w-11 h-11 rounded-full object-cover border-2 border-border"
            />
            <span className="text-base font-semibold text-foreground">Aria Collins</span>
          </div>
          <div className="w-[120px]" />
        </div>

        <h1 className="text-[26px] font-extrabold leading-tight text-foreground tracking-tight mb-5">
          Discover, Connect,<br />And Create Together.
        </h1>
      </div>
    </>
  );
};

export default Header;
