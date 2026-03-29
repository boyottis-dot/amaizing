import { useState, useEffect } from "react";
import { Heart, Plus, Zap } from "lucide-react";

interface FlashItem {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  discount: string;
}

const flashItems: FlashItem[] = [
{ id: 1, name: "Polyester Shirt", price: "$36.00", originalPrice: "$72.00", image: "https://picsum.photos/seed/flash1/400/400", discount: "50% Off" },
{ id: 2, name: "Twill Jacket", price: "$400.00", originalPrice: "$650.00", image: "https://picsum.photos/seed/flash2/400/400", discount: "38% Off" },
{ id: 3, name: "Wool Cardigan", price: "$58.00", originalPrice: "$120.00", image: "https://picsum.photos/seed/flash3/400/400", discount: "52% Off" },
{ id: 4, name: "Denim Vest", price: "$84.00", originalPrice: "$140.00", image: "https://picsum.photos/seed/flash4/400/400", discount: "40% Off" }];


const useCountdown = (hours: number) => {
  const [timeLeft, setTimeLeft] = useState(hours * 3600);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor(timeLeft % 3600 / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");
  return { h, m, s };
};

const TimerDigit = ({ value }: {value: string;}) =>
<span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[hsl(0,75%,35%)] text-white text-[11px] font-bold tabular-nums">
    {value}
  </span>;


const FlashSaleSection = () => {
  const { h, m, s } = useCountdown(12);

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[hsl(0,75%,35%)]/10 flex items-center justify-center">
            <Zap size={14} className="text-[hsl(0,75%,35%)] fill-[hsl(0,75%,35%)]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground tracking-tight leading-tight">​Items on special offer </h2>
            <p className="text-muted-foreground text-[10px] font-medium">Limited time offers</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TimerDigit value={h} />
          <span className="text-[hsl(0,75%,35%)] text-xs font-bold">:</span>
          <TimerDigit value={m} />
          <span className="text-[hsl(0,75%,35%)] text-xs font-bold">:</span>
          <TimerDigit value={s} />
        </div>
      </div>

      {/* Cards */}
      <div className="relative -mx-4">
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
        <div
          className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory overscroll-x-contain pb-1 px-4"
          style={{ WebkitOverflowScrolling: "touch" }}>
          
          {flashItems.map((item) =>
          <div
            key={item.id}
            className="shrink-0 w-[180px] snap-start cursor-pointer active:scale-[0.97] transition-all duration-200 flex flex-col">
            
              {/* Image area */}
              <div className="relative aspect-square rounded-[20px] overflow-hidden mb-2.5">
                <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy" />
              
                <button
                type="button"
                aria-label={`Save ${item.name}`}
                className="absolute top-2.5 left-2.5 w-9 h-9 rounded-full bg-[hsl(var(--background)/0.15)] backdrop-blur-xl flex items-center justify-center border border-[hsl(var(--background)/0.15)] active:scale-90 transition-transform duration-150">
                
                  <Heart size={16} className="text-[hsl(var(--background))]" strokeWidth={1.5} />
                </button>
              </div>

              {/* Info bar */}
              <div className="bg-background/60 backdrop-blur-xl rounded-[16px] p-3 border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)]">
                <h3 className="text-foreground font-semibold text-sm mb-0.5 truncate">{item.name}</h3>
                <p className="text-[hsl(0,75%,35%)] text-xs font-bold">{item.discount}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-foreground font-bold text-base">{item.price}</span>
                    <span className="text-muted-foreground text-[10px] line-through">{item.originalPrice}</span>
                  </div>
                  <button
                  type="button"
                  aria-label={`Add ${item.name}`}
                  className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                  
                    <Plus size={14} className="text-background" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default FlashSaleSection;