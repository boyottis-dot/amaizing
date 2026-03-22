import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Gift, Tag } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const existingCards = [
  { id: 1, code: "OTTIS-WELCOME-50", balance: "MK 5,000", status: "active" },
  { id: 2, code: "HOLIDAY2024", balance: "MK 0", status: "used" },
];

const GiftCards = () => {
  const navigate = useNavigate();
  const [redeemCode, setRedeemCode] = useState("");

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150"
        >
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Gift Cards & Promos</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <main className="px-4 space-y-6 pt-2">
        {/* Redeem */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
            Redeem a Code
          </h2>
          <div className="flex gap-2">
            <input
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
              placeholder="Enter code"
              className="flex-1 rounded-[16px] bg-secondary/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow uppercase tracking-wider"
            />
            <button className="rounded-[16px] bg-foreground text-background px-5 py-3 text-sm font-semibold active:scale-[0.95] transition-transform shrink-0">
              Apply
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
            Your Cards & Codes
          </h2>
          {existingCards.map((card) => (
            <div
              key={card.id}
              className="flex items-center gap-3 rounded-[18px] bg-secondary/40 border border-border/30 px-4 py-4"
            >
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 border border-border/20">
                {card.status === "active" ? (
                  <Gift size={16} className="text-foreground" />
                ) : (
                  <Tag size={16} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground font-mono">{card.code}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Balance: {card.balance}</p>
              </div>
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  card.status === "active"
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {card.status}
              </span>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default GiftCards;
