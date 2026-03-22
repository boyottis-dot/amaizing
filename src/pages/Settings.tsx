import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  CreditCard,
  Gift,
  Globe,
  HelpCircle,
  MapPin,
  Moon,
  Shield,
  Sun,
  User,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useTheme } from "@/contexts/ThemeContext";

const settingSections = [
  {
    title: "Account",
    items: [
      { label: "Personal Details", desc: "Name, email, phone, photo", icon: User, route: "/settings/personal-details" },
      { label: "Saved Addresses", desc: "Manage delivery addresses", icon: MapPin, route: "/settings/saved-addresses" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { label: "Location Mode", desc: "Switch between Local & International", icon: Globe, route: "/settings/location-mode" },
      { label: "Notification Preferences", desc: "Manage notification types", icon: Bell, route: "/settings/notifications" },
    ],
  },
  {
    title: "Payments",
    items: [
      { label: "Payment Methods", desc: "Cards & mobile money", icon: CreditCard, route: "/settings/payment-methods" },
      { label: "Gift Cards & Promos", desc: "Redeem codes, view balance", icon: Gift, route: "/settings/gift-cards" },
    ],
  },
  {
    title: "Privacy & Support",
    items: [
      { label: "Privacy Settings", desc: "Delete account, export data", icon: Shield, route: "/settings/privacy" },
      { label: "Help & Support", desc: "FAQ, contact, report a problem", icon: HelpCircle, route: "/settings/help" },
    ],
  },
];

type ThemeOption = "light" | "dark" | "system";

const themeOptions: { value: ThemeOption; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "Auto", icon: Globe },
];

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Settings</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <main className="px-4 space-y-5">
        {settingSections.map((section, sectionIdx) => (
          <div key={section.title}>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">{section.title}</h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.route)}
                  className="w-full flex items-center gap-3 rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-sm px-4 py-3.5 text-left active:scale-[0.97] transition-transform duration-150"
                >
                  <div className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground/50 shrink-0" />
                </button>
              ))}

              {/* Appearance toggle — injected after the Preferences section */}
              {sectionIdx === 1 && (
                <div className="w-full rounded-[18px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-sm px-4 py-3.5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center shrink-0">
                      <Sun size={16} className="text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">Appearance</p>
                      <p className="text-[10px] text-muted-foreground">Choose your theme</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {themeOptions.map((opt) => {
                      const isActive = theme === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setTheme(opt.value)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 ${
                            isActive
                              ? "bg-foreground text-background shadow-md"
                              : "bg-secondary/80 text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          <opt.icon size={13} strokeWidth={2} />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* App info */}
        <div className="text-center pt-4 pb-2 space-y-1">
          <p className="text-[10px] text-muted-foreground">App Version 1.0.0</p>
          <div className="flex items-center justify-center gap-3">
            <button className="text-[10px] text-muted-foreground underline">Terms of Service</button>
            <button className="text-[10px] text-muted-foreground underline">Privacy Policy</button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
