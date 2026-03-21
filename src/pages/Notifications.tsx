import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Check, Package, Truck, RefreshCw, XCircle, ShoppingBag, Tag, Heart, MessageSquare } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Notification {
  id: number;
  type: "order" | "delivery" | "refund_approved" | "refund_rejected" | "vendor_post" | "offer" | "back_in_stock" | "admin";
  title: string;
  message: string;
  time: string;
  read: boolean;
  link: string;
}

const iconMap = {
  order: Package,
  delivery: Truck,
  refund_approved: RefreshCw,
  refund_rejected: XCircle,
  vendor_post: Heart,
  offer: Tag,
  back_in_stock: ShoppingBag,
  admin: MessageSquare,
};

const initialNotifications: Notification[] = [
  { id: 1, type: "delivery", title: "Delivery Confirmed", message: "Your Silk Dress has been delivered!", time: "2 hours ago", read: false, link: "/order-tracking/1001" },
  { id: 2, type: "order", title: "Order Shipped", message: "Order #1001 is on its way to you", time: "5 hours ago", read: false, link: "/order-tracking/1001" },
  { id: 3, type: "vendor_post", title: "New from Amara Okafor", message: "Posted: New silk collection just dropped 🔥", time: "1 day ago", read: false, link: "/vendor/1" },
  { id: 4, type: "offer", title: "Special Offer", message: "Sofia Glow is offering 20% off all skincare!", time: "2 days ago", read: true, link: "/vendor/3" },
  { id: 5, type: "refund_approved", title: "Refund Approved", message: "Your refund for Ceramic Mug Set has been approved", time: "3 days ago", read: true, link: "/returns" },
  { id: 6, type: "back_in_stock", title: "Back in Stock", message: "Gold Necklace is available again!", time: "4 days ago", read: true, link: "/search" },
  { id: 7, type: "admin", title: "Welcome!", message: "Thanks for joining! Explore vendors near you.", time: "1 week ago", read: true, link: "/" },
];

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Notifications</span>
          </div>
        </div>
        {unreadCount > 0 ? (
          <button onClick={markAllRead} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
            <Check size={16} className="text-foreground" />
          </button>
        ) : (
          <div className="w-9" />
        )}
      </header>

      <main className="px-4 space-y-2">
        {notifications.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <button
              key={n.id}
              onClick={() => navigate(n.link)}
              className={`w-full flex gap-3 p-3 rounded-[18px] text-left active:scale-[0.98] transition-transform duration-150 ${
                n.read
                  ? "bg-background/40 border border-border/20"
                  : "bg-primary/5 border border-primary/10 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)]"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.read ? "bg-secondary/80" : "bg-foreground/10"}`}>
                <Icon size={18} className={n.read ? "text-muted-foreground" : "text-foreground"} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold truncate ${n.read ? "text-muted-foreground" : "text-foreground"}`}>{n.title}</p>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-[hsl(0,75%,35%)] shrink-0 mt-1.5" />}
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
              </div>
            </button>
          );
        })}
      </main>

      <BottomNav />
    </div>
  );
};

export default Notifications;
