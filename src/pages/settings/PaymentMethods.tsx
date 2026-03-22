import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Plus, Smartphone, MoreVertical } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const initialMethods = [
  {
    id: 1,
    type: "card",
    label: "Visa ending in 4829",
    icon: CreditCard,
    detail: "Expires 08/27",
    isDefault: true,
  },
  {
    id: 2,
    type: "mobile",
    label: "Airtel Money",
    icon: Smartphone,
    detail: "+265 991 234 567",
    isDefault: false,
  },
  {
    id: 3,
    type: "mobile",
    label: "TNM Mpamba",
    icon: Smartphone,
    detail: "+265 888 765 432",
    isDefault: false,
  },
];

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [methods] = useState(initialMethods);

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
            <span className="text-sm font-bold text-foreground">Payment Methods</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <main className="px-4 space-y-3 pt-2">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center gap-3 rounded-[18px] bg-secondary/40 border border-border/30 px-4 py-4"
          >
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 border border-border/20">
              <method.icon size={16} className="text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{method.label}</p>
                {method.isDefault && (
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-foreground text-background px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{method.detail}</p>
            </div>
            <button className="shrink-0 p-1 active:scale-90 transition-transform">
              <MoreVertical size={16} className="text-muted-foreground" />
            </button>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-2 rounded-[18px] border-2 border-dashed border-border/50 py-4 text-sm font-semibold text-muted-foreground active:scale-[0.97] transition-transform duration-150">
          <Plus size={16} />
          Add Payment Method
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default PaymentMethods;
