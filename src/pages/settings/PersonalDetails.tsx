import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "Amara",
    lastName: "Mwale",
    email: "amara.mwale@email.com",
    phone: "+265 991 234 567",
    bio: "Fashion lover & home decor enthusiast 🌿",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

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
            <span className="text-sm font-bold text-foreground">Personal Details</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <main className="px-4 space-y-6 pt-2">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/120?img=32"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-border/30"
            />
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center shadow-md active:scale-90 transition-transform">
              <Camera size={14} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">Tap to change photo</p>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          {[
            { label: "First Name", field: "firstName", type: "text" },
            { label: "Last Name", field: "lastName", type: "text" },
            { label: "Email", field: "email", type: "email" },
            { label: "Phone", field: "phone", type: "tel" },
          ].map((item) => (
            <div key={item.field} className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                {item.label}
              </label>
              <input
                type={item.type}
                value={form[item.field as keyof typeof form]}
                onChange={(e) => update(item.field, e.target.value)}
                className="w-full rounded-[16px] bg-secondary/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
              />
            </div>
          ))}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
              Bio
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={3}
              className="w-full rounded-[16px] bg-secondary/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow resize-none"
            />
          </div>
        </div>

        <button className="w-full rounded-full bg-foreground text-background py-3.5 text-sm font-semibold active:scale-[0.97] transition-transform duration-150">
          Save Changes
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default PersonalDetails;
