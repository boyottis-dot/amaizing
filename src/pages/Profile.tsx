import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

const profileData = {
  name: "Aria Collins",
  handle: "@aria.collins",
  avatar: "https://i.pravatar.cc/160?img=47",
  location: "Lusaka, Zambia",
  totalOrders: 12,
  wishlistCount: 6,
  following: 8,
};

const recentOrder = {
  id: 1001,
  product: "Silk Dress",
  vendor: "Amara Okafor",
  image: "https://picsum.photos/seed/ord1/200/200",
  status: "Shipped" as const,
  date: "Mar 15, 2026",
  total: "$209.00",
};

const defaultAddress = {
  label: "Home",
  line1: "12 Leopards Hill Road",
  line2: "Lusaka, Zambia",
  phone: "+260 97 123 4567",
};

const statusColor: Record<string, string> = {
  Processing: "bg-amber-500/15 text-amber-600",
  Shipped: "bg-blue-500/15 text-blue-600",
  Delivered: "bg-emerald-500/15 text-emerald-600",
};

const quickActions = [
  { label: "My Orders", icon: Package, route: "/my-orders" },
  { label: "Wishlist", icon: Heart, route: "/wishlist" },
  { label: "Following", icon: Users, route: "/following" },
  { label: "Settings", icon: Settings, route: "/settings" },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150"
        >
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Profile</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      {/* Profile card */}
      <div className="px-4 pb-4">
        <div className="rounded-[24px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_16px_-4px_hsl(var(--foreground)/0.08)] p-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-[3px] ring-border/20 ring-offset-2 ring-offset-background mb-3">
            <img src={profileData.avatar} alt={profileData.name} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-lg font-bold text-foreground">{profileData.name}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{profileData.handle}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <MapPin size={12} />
            {profileData.location}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-around rounded-[20px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-sm py-4">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{profileData.totalOrders}</div>
            <div className="text-[10px] text-muted-foreground font-medium">Orders</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{profileData.wishlistCount}</div>
            <div className="text-[10px] text-muted-foreground font-medium">Wishlist</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{profileData.following}</div>
            <div className="text-[10px] text-muted-foreground font-medium">Following</div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.route)}
              className="flex flex-col items-center gap-2 py-3 rounded-[16px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-sm active:scale-95 transition-transform duration-150"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center">
                <action.icon size={18} className="text-foreground" />
              </div>
              <span className="text-[10px] font-semibold text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent order */}
      <div className="px-4 pb-4">
        <h2 className="text-sm font-bold text-foreground mb-2">Recent Order</h2>
        <div
          onClick={() => navigate("/order-tracking/1001")}
          className="rounded-[20px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] p-3 flex gap-3 cursor-pointer active:scale-[0.98] transition-transform duration-150"
        >
          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
            <img src={recentOrder.image} alt={recentOrder.product} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{recentOrder.product}</p>
                <p className="text-[11px] text-muted-foreground">{recentOrder.vendor} · {recentOrder.date}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusColor[recentOrder.status]}`}>
                {recentOrder.status}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-bold text-foreground">{recentOrder.total}</span>
              <button className="flex items-center gap-1 rounded-full bg-foreground text-background px-3 py-1.5 text-[10px] font-semibold active:scale-95 transition-transform">
                <Truck size={12} /> Track Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Saved addresses */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-foreground">Saved Address</h2>
          <button className="text-xs font-semibold text-primary">Edit</button>
        </div>
        <div className="rounded-[20px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{defaultAddress.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{defaultAddress.line1}</p>
              <p className="text-xs text-muted-foreground">{defaultAddress.line2}</p>
              <p className="text-xs text-muted-foreground mt-1">{defaultAddress.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 pb-8">
        <button className="w-full flex items-center justify-center gap-2 rounded-full bg-destructive/10 py-3 text-sm font-semibold text-destructive active:scale-95 transition-transform duration-150">
          <LogOut size={16} />
          Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
