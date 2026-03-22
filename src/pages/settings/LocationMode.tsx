import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const modes = [
  {
    id: "local",
    label: "Local",
    desc: "Shop from vendors near you in Malawi. Faster delivery, local prices.",
    icon: MapPin,
  },
  {
    id: "international",
    label: "International",
    desc: "Browse global vendors. Longer shipping, wider selection.",
    icon: Globe,
  },
];

const LocationMode = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("local");

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
            <span className="text-sm font-bold text-foreground">Location Mode</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <main className="px-4 space-y-3 pt-2">
        <p className="text-xs text-muted-foreground px-1">
          Choose how you want to shop. You can switch anytime.
        </p>

        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActive(mode.id)}
            className={`w-full flex items-start gap-3 rounded-[18px] border px-4 py-4 text-left active:scale-[0.97] transition-all duration-200 ${
              active === mode.id
                ? "bg-foreground text-background border-foreground"
                : "bg-secondary/40 border-border/30 text-foreground"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                active === mode.id
                  ? "bg-background/20"
                  : "bg-background border border-border/20"
              }`}
            >
              <mode.icon
                size={18}
                className={active === mode.id ? "text-background" : "text-foreground"}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{mode.label}</p>
              <p
                className={`text-xs mt-0.5 ${
                  active === mode.id ? "text-background/70" : "text-muted-foreground"
                }`}
              >
                {mode.desc}
              </p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                active === mode.id
                  ? "border-background"
                  : "border-muted-foreground/40"
              }`}
            >
              {active === mode.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-background" />
              )}
            </div>
          </button>
        ))}

        <div className="rounded-[18px] bg-secondary/40 border border-border/30 px-4 py-4 mt-4">
          <p className="text-xs font-semibold text-foreground mb-1">Current Region</p>
          <p className="text-xs text-muted-foreground">Lilongwe, Malawi 🇲🇼</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default LocationMode;
