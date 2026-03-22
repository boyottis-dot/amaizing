import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Plus, MoreVertical, Home, Briefcase } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const initialAddresses = [
  {
    id: 1,
    label: "Home",
    icon: Home,
    address: "Area 47, Sector 3, Lilongwe",
    phone: "+265 991 234 567",
    isDefault: true,
  },
  {
    id: 2,
    label: "Office",
    icon: Briefcase,
    address: "City Centre, Kamuzu Procession Rd, Lilongwe",
    phone: "+265 888 765 432",
    isDefault: false,
  },
  {
    id: 3,
    label: "Mom's Place",
    icon: MapPin,
    address: "Ndirande, Blantyre",
    phone: "+265 999 111 222",
    isDefault: false,
  },
];

const SavedAddresses = () => {
  const navigate = useNavigate();
  const [addresses] = useState(initialAddresses);

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
            <span className="text-sm font-bold text-foreground">Saved Addresses</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <main className="px-4 space-y-3 pt-2">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="flex items-start gap-3 rounded-[18px] bg-secondary/40 border border-border/30 px-4 py-4"
          >
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 border border-border/20">
              <addr.icon size={16} className="text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{addr.label}</p>
                {addr.isDefault && (
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-foreground text-background px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{addr.address}</p>
              <p className="text-xs text-muted-foreground">{addr.phone}</p>
            </div>
            <button className="shrink-0 p-1 active:scale-90 transition-transform">
              <MoreVertical size={16} className="text-muted-foreground" />
            </button>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-2 rounded-[18px] border-2 border-dashed border-border/50 py-4 text-sm font-semibold text-muted-foreground active:scale-[0.97] transition-transform duration-150">
          <Plus size={16} />
          Add New Address
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default SavedAddresses;
