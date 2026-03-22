import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const notifGroups = [
  {
    title: "Shopping",
    items: [
      { id: "orders", label: "Order Updates", desc: "Shipping, delivery, returns" },
      { id: "promos", label: "Promotions", desc: "Sales, discounts, flash deals" },
      { id: "restock", label: "Restock Alerts", desc: "When wishlisted items are back" },
    ],
  },
  {
    title: "Social",
    items: [
      { id: "likes", label: "Likes & Comments", desc: "Activity on your posts" },
      { id: "follows", label: "New Followers", desc: "When someone follows you" },
      { id: "mentions", label: "Mentions", desc: "When you're tagged in a post" },
    ],
  },
  {
    title: "Messages",
    items: [
      { id: "dm", label: "Direct Messages", desc: "New messages from vendors & buyers" },
      { id: "chat_requests", label: "Chat Requests", desc: "Requests from new contacts" },
    ],
  },
];

const NotificationPreferences = () => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    orders: true,
    promos: true,
    restock: false,
    likes: true,
    follows: true,
    mentions: true,
    dm: true,
    chat_requests: false,
  });

  const toggle = (id: string) =>
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

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
            <span className="text-sm font-bold text-foreground">Notifications</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <main className="px-4 space-y-5 pt-2">
        {notifGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
              {group.title}
            </h2>
            <div className="space-y-2">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center gap-3 rounded-[18px] bg-secondary/40 border border-border/30 px-4 py-3.5 text-left active:scale-[0.97] transition-transform duration-150"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                  <div
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${
                      enabled[item.id] ? "bg-foreground" : "bg-muted-foreground/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-background shadow-sm transition-transform duration-200 ${
                        enabled[item.id] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default NotificationPreferences;
