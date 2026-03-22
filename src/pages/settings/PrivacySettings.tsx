import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Eye, EyeOff, Trash2, AlertTriangle } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [profilePublic, setProfilePublic] = useState(true);
  const [activityVisible, setActivityVisible] = useState(true);

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
            <span className="text-sm font-bold text-foreground">Privacy</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <main className="px-4 space-y-5 pt-2">
        {/* Visibility */}
        <div>
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Visibility
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => setProfilePublic(!profilePublic)}
              className="w-full flex items-center gap-3 rounded-[18px] bg-secondary/40 border border-border/30 px-4 py-3.5 text-left active:scale-[0.97] transition-transform duration-150"
            >
              <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center shrink-0 border border-border/20">
                {profilePublic ? <Eye size={16} /> : <EyeOff size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Public Profile</p>
                <p className="text-[10px] text-muted-foreground">Anyone can see your profile & posts</p>
              </div>
              <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${profilePublic ? "bg-foreground" : "bg-muted-foreground/30"}`}>
                <div className={`w-5 h-5 rounded-full bg-background shadow-sm transition-transform duration-200 ${profilePublic ? "translate-x-5" : "translate-x-0"}`} />
              </div>
            </button>

            <button
              onClick={() => setActivityVisible(!activityVisible)}
              className="w-full flex items-center gap-3 rounded-[18px] bg-secondary/40 border border-border/30 px-4 py-3.5 text-left active:scale-[0.97] transition-transform duration-150"
            >
              <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center shrink-0 border border-border/20">
                <Eye size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Activity Status</p>
                <p className="text-[10px] text-muted-foreground">Show when you're online</p>
              </div>
              <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${activityVisible ? "bg-foreground" : "bg-muted-foreground/30"}`}>
                <div className={`w-5 h-5 rounded-full bg-background shadow-sm transition-transform duration-200 ${activityVisible ? "translate-x-5" : "translate-x-0"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Data */}
        <div>
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Your Data
          </h2>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 rounded-[18px] bg-secondary/40 border border-border/30 px-4 py-3.5 text-left active:scale-[0.97] transition-transform duration-150">
              <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center shrink-0 border border-border/20">
                <Download size={16} className="text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Export My Data</p>
                <p className="text-[10px] text-muted-foreground">Download a copy of your data</p>
              </div>
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div>
          <h2 className="text-xs font-bold text-destructive uppercase tracking-wider mb-2 px-1">
            Danger Zone
          </h2>
          <button className="w-full flex items-center gap-3 rounded-[18px] bg-destructive/10 border border-destructive/20 px-4 py-3.5 text-left active:scale-[0.97] transition-transform duration-150">
            <div className="w-9 h-9 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
              <Trash2 size={16} className="text-destructive" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-destructive">Delete Account</p>
              <p className="text-[10px] text-destructive/70">This action cannot be undone</p>
            </div>
            <AlertTriangle size={16} className="text-destructive shrink-0" />
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default PrivacySettings;
