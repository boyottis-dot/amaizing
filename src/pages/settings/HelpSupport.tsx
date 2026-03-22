import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, FileText, HelpCircle, Mail, MessageSquare, AlertOctagon } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const faqs = [
  { q: "How do I track my order?", a: "Go to My Orders and tap any order to see real-time tracking." },
  { q: "Can I return an item?", a: "Yes, within 7 days of delivery. Go to My Orders → Returns." },
  { q: "How do I contact a vendor?", a: "Open their profile and tap the message icon to start a chat." },
  { q: "How do I change my delivery address?", a: "Go to Settings → Saved Addresses to add or edit addresses." },
];

const supportOptions = [
  { label: "Chat with Us", desc: "Get instant help from our team", icon: MessageSquare },
  { label: "Email Support", desc: "support@ottis.com", icon: Mail },
  { label: "Report a Problem", desc: "Something not working right?", icon: AlertOctagon },
  { label: "Terms & Policies", desc: "Legal documents & guidelines", icon: FileText },
];

const HelpSupport = () => {
  const navigate = useNavigate();

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
            <span className="text-sm font-bold text-foreground">Help & Support</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <main className="px-4 space-y-6 pt-2">
        {/* FAQ */}
        <div>
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Frequently Asked
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-[18px] bg-secondary/40 border border-border/30 overflow-hidden"
              >
                <summary className="flex items-center gap-3 px-4 py-3.5 cursor-pointer list-none active:scale-[0.97] transition-transform duration-150">
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shrink-0 border border-border/20">
                    <HelpCircle size={14} className="text-foreground" />
                  </div>
                  <p className="flex-1 text-sm font-semibold text-foreground">{faq.q}</p>
                  <ChevronRight
                    size={14}
                    className="text-muted-foreground/50 shrink-0 transition-transform duration-200 group-open:rotate-90"
                  />
                </summary>
                <div className="px-4 pb-4 pl-[60px]">
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Support options */}
        <div>
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Get Help
          </h2>
          <div className="space-y-2">
            {supportOptions.map((opt) => (
              <button
                key={opt.label}
                className="w-full flex items-center gap-3 rounded-[18px] bg-secondary/40 border border-border/30 px-4 py-3.5 text-left active:scale-[0.97] transition-transform duration-150"
              >
                <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center shrink-0 border border-border/20">
                  <opt.icon size={16} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                  <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground/50 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default HelpSupport;
