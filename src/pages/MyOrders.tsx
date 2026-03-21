import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Star } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refund Requested";

interface Order {
  id: number;
  product: string;
  vendor: string;
  image: string;
  date: string;
  total: string;
  status: OrderStatus;
}

const orders: Order[] = [
  { id: 1001, product: "Silk Dress", vendor: "Amara Okafor", image: "https://picsum.photos/seed/ord1/200/200", date: "Mar 15, 2026", total: "$209.00", status: "Shipped" },
  { id: 1002, product: "Organic Soap Set", vendor: "Sofia Glow", image: "https://picsum.photos/seed/ord2/200/200", date: "Mar 3, 2026", total: "$18.00", status: "Delivered" },
  { id: 1003, product: "Sneakers", vendor: "Liam Kicks", image: "https://picsum.photos/seed/ord3/200/200", date: "Mar 18, 2026", total: "$138.00", status: "Processing" },
  { id: 1004, product: "Ceramic Mug Set", vendor: "Chen Home", image: "https://picsum.photos/seed/ord4/200/200", date: "Feb 20, 2026", total: "$32.00", status: "Cancelled" },
  { id: 1005, product: "Gold Necklace", vendor: "Lina Jewels", image: "https://picsum.photos/seed/ord5/200/200", date: "Feb 10, 2026", total: "$120.00", status: "Refund Requested" },
];

const tabs = ["All", "Active", "Delivered", "Cancelled", "Refund Requested"] as const;
type Tab = (typeof tabs)[number];

const statusColor: Record<OrderStatus, string> = {
  Processing: "bg-amber-500/15 text-amber-600",
  Shipped: "bg-blue-500/15 text-blue-600",
  Delivered: "bg-emerald-500/15 text-emerald-600",
  Cancelled: "bg-destructive/15 text-destructive",
  "Refund Requested": "bg-purple-500/15 text-purple-600",
};

const MyOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filtered = orders.filter((o) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return o.status === "Processing" || o.status === "Shipped";
    return o.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">My Orders</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-200 active:scale-95 ${
              activeTab === tab ? "bg-foreground text-background" : "bg-background/60 text-muted-foreground backdrop-blur-xl border border-border/30 shadow-sm"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders */}
      <main className="px-4 pt-2 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <Package size={40} className="text-muted-foreground/30 mb-3" />
            <p className="text-sm font-semibold text-foreground">No orders found</p>
            <p className="text-xs text-muted-foreground mt-1">Orders matching this filter will appear here</p>
          </div>
        ) : (
          filtered.map((o) => (
            <div key={o.id} className="rounded-[20px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] p-3">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                  <img src={o.image} alt={o.product} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{o.product}</p>
                      <p className="text-[11px] text-muted-foreground">{o.vendor}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusColor[o.status]}`}>
                      {o.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground">#{o.id} · {o.date}</span>
                    <span className="text-sm font-bold text-foreground ml-auto">{o.total}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                {(o.status === "Processing" || o.status === "Shipped") && (
                  <button
                    onClick={() => navigate(`/order-tracking/${o.id}`)}
                    className="flex-1 rounded-full bg-foreground text-background py-2 text-[11px] font-semibold active:scale-95 transition-transform"
                  >
                    Track Order
                  </button>
                )}
                {o.status === "Delivered" && (
                  <>
                    <button
                      onClick={() => navigate(`/order-tracking/${o.id}`)}
                      className="flex-1 rounded-full bg-secondary text-foreground py-2 text-[11px] font-semibold active:scale-95 transition-transform"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigate(`/create-review/${o.id}`)}
                      className="flex-1 rounded-full bg-foreground text-background py-2 text-[11px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-transform"
                    >
                      <Star size={12} /> Leave Review
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MyOrders;
