import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  Truck,
  Users,
  ChevronRight,
  Edit3,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

const profileData = {
  name: "Aria Collins",
  handle: "@aria.collins",
  avatar: "https://i.pravatar.cc/160?img=47",
  banner: "https://picsum.photos/seed/profilebanner/800/400",
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
      {/* Banner with back button */}
      <div className="relative px-4 pt-4">
        <div className="rounded-[24px] overflow-hidden relative" style={{ height: 200 }}>
          <img
            src={profileData.banner}
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />

          {/* Back button */}
          <div className="relative z-10 flex items-center justify-between px-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 active:scale-90 transition-transform duration-150"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/settings/personal-details")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 active:scale-90 transition-transform duration-150"
            >
              <Edit3 size={16} className="text-white" />
            </button>
          </div>

          {/* Stats overlay on banner */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-around rounded-[16px] bg-white/10 backdrop-blur-xl border border-white/20 py-3">
            <button onClick={() => navigate("/my-orders")} className="text-center">
              <div className="text-lg font-bold text-white">{profileData.totalOrders}</div>
              <div className="text-[10px] text-white/60 font-medium">Orders</div>
            </button>
            <div className="w-px h-8 bg-white/20" />
            <button onClick={() => navigate("/wishlist")} className="text-center">
              <div className="text-lg font-bold text-white">{profileData.wishlistCount}</div>
              <div className="text-[10px] text-white/60 font-medium">Wishlist</div>
            </button>
            <div className="w-px h-8 bg-white/20" />
            <button onClick={() => navigate("/following")} className="text-center">
              <div className="text-lg font-bold text-white">{profileData.following}</div>
              <div className="text-[10px] text-white/60 font-medium">Following</div>
            </button>
          </div>
        </div>
      </div>

      {/* Avatar overlapping banner */}
      <div className="relative z-10 -mt-14 flex justify-center">
        <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.15)]">
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name + handle + location */}
      <div className="mt-2 px-6 text-center">
        <h1 className="text-xl font-bold text-foreground">{profileData.name}</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{profileData.handle}</p>
        <div className="flex items-center justify-center gap-1 mt-1 text-xs text-muted-foreground">
          <MapPin size={12} />
          {profileData.location}
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 pt-5 pb-3">
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.route)}
              className="flex flex-col items-center gap-2 py-3.5 rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.06)] active:scale-95 transition-transform duration-150"
            >
              <div className="w-11 h-11 rounded-full bg-secondary/80 flex items-center justify-center">
                <action.icon size={18} className="text-foreground" />
              </div>
              <span className="text-[10px] font-semibold text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent order */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-foreground">Recent Order</h2>
          <button
            onClick={() => navigate("/my-orders")}
            className="flex items-center gap-0.5 text-xs font-semibold text-muted-foreground"
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div
          onClick={() => navigate("/order-tracking/1001")}
          className="rounded-[20px] overflow-hidden relative cursor-pointer active:scale-[0.98] transition-transform duration-150 shadow-[0_4px_20px_-6px_hsl(var(--foreground)/0.1)]"
        >
          {/* Blurred product image background */}
          <div className="absolute inset-0">
            <img src={recentOrder.image} alt="" className="w-full h-full object-cover blur-2xl scale-125 opacity-20" />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          </div>

          <div className="relative p-3.5 flex gap-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-border/20 shadow-sm">
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
                  <Truck size={12} /> Track
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved address */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-foreground">Saved Address</h2>
          <button
            onClick={() => navigate("/settings/saved-addresses")}
            className="text-xs font-semibold text-muted-foreground"
          >
            Edit
          </button>
        </div>
        <div className="rounded-[20px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.06)] p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center shrink-0">
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
        <button className="w-full flex items-center justify-center gap-2 rounded-full bg-destructive/10 py-3.5 text-sm font-semibold text-destructive active:scale-95 transition-transform duration-150">
          <LogOut size={16} />
          Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
