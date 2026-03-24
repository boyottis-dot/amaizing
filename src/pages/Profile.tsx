import React from "react";
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
  CreditCard,
  Star,
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
  memberSince: "Jan 2025",
  reviews: 9,
};

const recentOrders = [
  { id: 1001, product: "Silk Dress", vendor: "Amara Okafor", image: "https://picsum.photos/seed/ord1/200/200", status: "Shipped" as const, date: "Mar 15", total: "$209" },
  { id: 1002, product: "Leather Bag", vendor: "Kofi Craft", image: "https://picsum.photos/seed/ord2/200/200", status: "Delivered" as const, date: "Mar 10", total: "$145" },
];

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

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      {/* Banner */}
      <div className="relative">
        <div className="h-[180px] overflow-hidden">
          <img
            src={profileData.banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </div>

        {/* Top nav on banner */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 active:scale-90 transition-transform duration-150"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="rounded-full bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2">
            <span className="text-sm font-bold text-white">Profile</span>
          </div>
          <button
            type="button"
            onClick={() => navigate("/settings/personal-details")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 active:scale-90 transition-transform duration-150"
          >
            <Edit3 size={16} className="text-white" />
          </button>
        </div>

        {/* Profile info card overlapping banner bottom */}
        <div className="absolute -bottom-16 left-4 right-4 z-10">
          <div className="rounded-[22px] bg-background/70 backdrop-blur-xl border border-border/30 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.15)] p-4">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-white/30 shadow-lg">
                <img src={profileData.avatar} alt={profileData.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-foreground truncate">{profileData.name}</h1>
                <p className="text-xs text-muted-foreground">{profileData.handle}</p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                  <MapPin size={10} />
                  <span>{profileData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for overlapping card */}
      <div className="h-20" />

      {/* Stats row */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-around rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.06)] py-3.5">
          {[
            { label: "Orders", value: profileData.totalOrders, route: "/my-orders" },
            { label: "Wishlist", value: profileData.wishlistCount, route: "/wishlist" },
            { label: "Following", value: profileData.following, route: "/following" },
            { label: "Reviews", value: profileData.reviews, route: "/customer-profile" },
          ].map((stat, i, arr) => (
            <React.Fragment key={stat.label}>
              <button onClick={() => navigate(stat.route)} className="text-center flex-1 active:scale-90 transition-transform duration-150">
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground font-medium">{stat.label}</div>
              </button>
              {i < arr.length - 1 && <div className="w-px h-8 bg-border/40" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 pt-3 pb-2">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Orders", icon: Package, route: "/my-orders" },
            { label: "Wishlist", icon: Heart, route: "/wishlist" },
            { label: "Following", icon: Users, route: "/following" },
            { label: "Settings", icon: Settings, route: "/settings" },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.route)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-[16px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.06)] active:scale-95 transition-transform duration-150"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center">
                <action.icon size={17} className="text-foreground" />
              </div>
              <span className="text-[10px] font-semibold text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="px-4 pt-2 pb-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-foreground">Recent Orders</h2>
          <button
            onClick={() => navigate("/my-orders")}
            className="flex items-center gap-0.5 text-xs font-semibold text-muted-foreground"
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-2">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/order-tracking/${order.id}`)}
              className="rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.06)] p-3 flex gap-3 cursor-pointer active:scale-[0.98] transition-transform duration-150"
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-border/20">
                <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{order.product}</p>
                    <p className="text-[11px] text-muted-foreground">{order.vendor} · {order.date}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-sm font-bold text-foreground">{order.total}</span>
                  <button className="flex items-center gap-1 rounded-full bg-foreground text-background px-2.5 py-1 text-[10px] font-semibold active:scale-95 transition-transform">
                    <Truck size={11} /> Track
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved address + Payment row */}
      <div className="px-4 pt-2 pb-2 grid grid-cols-2 gap-2">
        <div className="rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.06)] p-3.5">
          <div className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center mb-2">
            <MapPin size={15} className="text-foreground" />
          </div>
          <p className="text-xs font-bold text-foreground">{defaultAddress.label}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{defaultAddress.line1}</p>
          <button
            onClick={() => navigate("/settings/saved-addresses")}
            className="mt-2 text-[10px] font-semibold text-muted-foreground underline underline-offset-2"
          >
            Edit
          </button>
        </div>
        <div className="rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.06)] p-3.5">
          <div className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center mb-2">
            <CreditCard size={15} className="text-foreground" />
          </div>
          <p className="text-xs font-bold text-foreground">Payment</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">•••• 4567</p>
          <button
            onClick={() => navigate("/settings/payment-methods")}
            className="mt-2 text-[10px] font-semibold text-muted-foreground underline underline-offset-2"
          >
            Manage
          </button>
        </div>
      </div>

      {/* Member badge */}
      <div className="px-4 pt-2 pb-2">
        <div className="rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.06)] p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
            <Star size={16} className="text-amber-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Loyal Member</p>
            <p className="text-[10px] text-muted-foreground">Member since {profileData.memberSince} · {profileData.totalOrders} orders completed</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 pt-2 pb-8">
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
