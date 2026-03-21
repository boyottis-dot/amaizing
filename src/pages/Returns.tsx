import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, ChevronDown, Plus, Upload, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type ReturnStatus = "Pending" | "Approved" | "Rejected" | "Disputed";

interface ReturnItem {
  id: number;
  product: string;
  image: string;
  reason: string;
  date: string;
  status: ReturnStatus;
  adminResponse?: string;
}

const returns: ReturnItem[] = [
  { id: 1, product: "Ceramic Mug Set", image: "https://picsum.photos/seed/ret1/200/200", reason: "Damaged", date: "Mar 10, 2026", status: "Approved", adminResponse: "Refund of $32.00 issued to your account. Delivery fees are non-refundable." },
  { id: 2, product: "Canvas Sneakers", image: "https://picsum.photos/seed/ret2/200/200", reason: "Not as described", date: "Mar 5, 2026", status: "Pending" },
  { id: 3, product: "Art Print", image: "https://picsum.photos/seed/ret3/200/200", reason: "Wrong item", date: "Feb 25, 2026", status: "Rejected", adminResponse: "Item matches the listing description. Return not eligible." },
];

const statusColor: Record<ReturnStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-600",
  Approved: "bg-emerald-500/15 text-emerald-600",
  Rejected: "bg-destructive/15 text-destructive",
  Disputed: "bg-purple-500/15 text-purple-600",
};

const reasons = ["Wrong item", "Damaged", "Not as described", "Changed mind"];

const Returns = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Returns & Refunds</span>
          </div>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
          <Plus size={16} className={`text-foreground transition-transform ${showForm ? "rotate-45" : ""}`} />
        </button>
      </header>

      {/* Note */}
      <div className="px-4 pb-3">
        <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-center">
          <p className="text-[11px] text-amber-700 font-medium">Note: Delivery fees are non-refundable</p>
        </div>
      </div>

      {/* New return form */}
      {showForm && (
        <div className="px-4 pb-4">
          <div className="rounded-[20px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-lg p-4 space-y-3">
            <h3 className="text-sm font-bold text-foreground">Raise New Return</h3>

            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1">Select Reason</label>
              <div className="relative">
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-full rounded-xl bg-secondary/50 border border-border/30 px-3 py-2.5 text-sm text-foreground appearance-none outline-none"
                >
                  <option value="">Choose a reason...</option>
                  {reasons.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1">Upload Photos (up to 4)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-16 h-16 rounded-xl border-2 border-dashed border-border/40 flex items-center justify-center cursor-pointer">
                    <Camera size={16} className="text-muted-foreground/40" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1">Additional Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe the issue..."
                rows={3}
                className="w-full rounded-xl bg-secondary/50 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
              />
            </div>

            <button className="w-full rounded-full bg-foreground text-background py-2.5 text-sm font-semibold active:scale-95 transition-transform">
              Submit Request
            </button>
          </div>
        </div>
      )}

      {/* Returns list */}
      <main className="px-4 space-y-3">
        {returns.map((r) => (
          <div key={r.id} className="rounded-[20px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)] p-3">
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                <img src={r.image} alt={r.product} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{r.product}</p>
                    <p className="text-[11px] text-muted-foreground">{r.reason} · {r.date}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusColor[r.status]}`}>
                    {r.status}
                  </span>
                </div>
                {r.adminResponse && (
                  <div className="mt-2 bg-secondary/50 rounded-xl p-2">
                    <p className="text-[11px] text-muted-foreground">{r.adminResponse}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Returns;
