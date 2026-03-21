import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Vendor {
  id: number;
  name: string;
  category: string;
  avatar: string;
  banner: string;
  followers: number;
  latestPost: string;
  latestPostImage: string;
}

const followedVendors: Vendor[] = [
  { id: 1, name: "Amara Okafor", category: "Fashion", avatar: "https://i.pravatar.cc/80?img=32", banner: "https://picsum.photos/seed/vb1/400/120", followers: 1240, latestPost: "New silk collection just dropped 🔥", latestPostImage: "https://picsum.photos/seed/vp1/200/200" },
  { id: 2, name: "Kofi Mensah", category: "Leather Craft", avatar: "https://i.pravatar.cc/80?img=15", banner: "https://picsum.photos/seed/vb2/400/120", followers: 890, latestPost: "Hand-stitched wallets available now", latestPostImage: "https://picsum.photos/seed/vp2/200/200" },
  { id: 3, name: "Sofia Glow", category: "Beauty & Skincare", avatar: "https://i.pravatar.cc/80?img=25", banner: "https://picsum.photos/seed/vb3/400/120", followers: 2100, latestPost: "New organic face serum 🌿", latestPostImage: "https://picsum.photos/seed/vp3/200/200" },
  { id: 4, name: "Chen Home", category: "Home & Living", avatar: "https://i.pravatar.cc/80?img=33", banner: "https://picsum.photos/seed/vb4/400/120", followers: 560, latestPost: "Handmade ceramic dinner set", latestPostImage: "https://picsum.photos/seed/vp4/200/200" },
];

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const Following = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState(followedVendors);

  const unfollow = (id: number) => setVendors((prev) => prev.filter((v) => v.id !== id));

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Following</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <main className="px-4 space-y-3">
        {vendors.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <Users size={40} className="text-muted-foreground/30 mb-3" />
            <p className="text-sm font-semibold text-foreground">Not following anyone yet</p>
            <p className="text-xs text-muted-foreground mt-1">Discover vendors you love</p>
            <button onClick={() => navigate("/search")} className="mt-5 rounded-full bg-foreground text-background px-6 py-2.5 text-xs font-semibold active:scale-95 transition-transform duration-150">
              Discover Vendors
            </button>
          </div>
        ) : (
          vendors.map((v) => (
            <div key={v.id} className="rounded-[20px] overflow-hidden bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)]">
              {/* Banner + avatar */}
              <div className="relative h-20 cursor-pointer" onClick={() => navigate(`/vendor/${v.id}`)}>
                <img src={v.banner} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -bottom-5 left-3">
                  <img src={v.avatar} alt={v.name} className="w-12 h-12 rounded-full object-cover border-2 border-background" />
                </div>
              </div>
              <div className="pt-7 pb-3 px-3">
                <div className="flex items-start justify-between">
                  <div className="cursor-pointer" onClick={() => navigate(`/vendor/${v.id}`)}>
                    <p className="text-sm font-bold text-foreground">{v.name}</p>
                    <p className="text-[11px] text-muted-foreground">{v.category} · {formatCount(v.followers)} followers</p>
                  </div>
                  <button
                    onClick={() => unfollow(v.id)}
                    className="shrink-0 rounded-full border border-border/30 px-3 py-1.5 text-[10px] font-semibold text-muted-foreground active:scale-95 transition-transform"
                  >
                    Unfollow
                  </button>
                </div>
                {/* Latest post preview */}
                <div className="mt-2 flex gap-2 items-center bg-secondary/50 rounded-xl p-2 cursor-pointer" onClick={() => navigate(`/vendor/${v.id}`)}>
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <img src={v.latestPostImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{v.latestPost}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Following;
