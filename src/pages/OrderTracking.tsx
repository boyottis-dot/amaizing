import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Copy, AlertTriangle, MapPin, Package } from "lucide-react";

const orderData = {
  id: "ORD-1001",
  date: "Mar 15, 2026",
  estimatedDelivery: "Mar 22, 2026",
  vendor: "Amara Okafor",
  product: "Silk Dress",
  productImage: "https://picsum.photos/seed/ord1/200/200",
  trackingNumber: "DHL-ZM-9876543210",
  status: "Out for Delivery" as const,
  timeline: [
    { step: "Order Placed", time: "Mar 15, 10:30 AM", done: true },
    { step: "Packed", time: "Mar 16, 2:15 PM", done: true },
    { step: "Dispatched", time: "Mar 17, 8:00 AM", done: true },
    { step: "In Transit", time: "Mar 18, 6:45 PM", done: true },
    { step: "Out for Delivery", time: "Mar 21, 9:00 AM", done: true },
    { step: "Delivered", time: "", done: false },
  ],
};

const OrderTracking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const copyTracking = () => {
    navigator.clipboard.writeText(orderData.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOutForDelivery = orderData.status === "Out for Delivery";

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-12">
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Order Tracking</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      {/* Order ID & date */}
      <div className="px-4 pb-4">
        <div className="rounded-[20px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Order ID</p>
              <p className="text-sm font-bold text-foreground">{orderData.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Placed on</p>
              <p className="text-sm font-bold text-foreground">{orderData.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="px-4 pb-4">
        <div className="rounded-[20px] overflow-hidden relative h-[180px] bg-secondary/50 border border-border/30">
          <img src="https://picsum.photos/seed/map1/800/400" alt="Map" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-background/80 backdrop-blur-xl rounded-full px-3 py-1.5 border border-border/30">
            <MapPin size={14} className="text-foreground" />
            <span className="text-xs font-semibold text-foreground">Parcel in transit</span>
          </div>
        </div>
      </div>

      {/* Estimated delivery */}
      <div className="px-4 pb-4">
        <div className="rounded-[20px] bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
          <p className="text-xs text-emerald-700 font-medium">Estimated Delivery</p>
          <p className="text-lg font-bold text-emerald-700 mt-0.5">{orderData.estimatedDelivery}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-4 pb-4">
        <h2 className="text-sm font-bold text-foreground mb-3">Status Timeline</h2>
        <div className="ml-3 border-l-2 border-border/40 pl-5 space-y-4">
          {orderData.timeline.map((step, i) => (
            <div key={i} className="relative">
              <div className={`absolute -left-[27px] top-0.5 w-3 h-3 rounded-full border-2 ${
                step.done ? "bg-foreground border-foreground" : "bg-background border-muted-foreground/40"
              }`} />
              <p className={`text-sm font-semibold ${step.done ? "text-foreground" : "text-muted-foreground"}`}>
                {step.step}
              </p>
              {step.time && <p className="text-[11px] text-muted-foreground mt-0.5">{step.time}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Product summary */}
      <div className="px-4 pb-4">
        <div className="rounded-[20px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-sm p-3 flex gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
            <img src={orderData.productImage} alt={orderData.product} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{orderData.product}</p>
            <p className="text-xs text-muted-foreground">{orderData.vendor}</p>
          </div>
        </div>
      </div>

      {/* Tracking number */}
      <div className="px-4 pb-4">
        <div className="rounded-[20px] bg-background/60 backdrop-blur-xl border border-border/30 shadow-sm p-4">
          <p className="text-xs text-muted-foreground mb-1">DHL Tracking Number</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground font-mono">{orderData.trackingNumber}</p>
            <button onClick={copyTracking} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-semibold text-foreground active:scale-95 transition-transform">
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 space-y-2">
        {isOutForDelivery && (
          <button className="w-full rounded-full bg-foreground text-background py-3 text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <Package size={16} /> Confirm Delivery
          </button>
        )}
        <button className="w-full rounded-full bg-destructive/10 text-destructive py-3 text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <AlertTriangle size={16} /> Raise a Problem
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
