import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Camera, ChevronRight, Image, Star, Video } from "lucide-react";

const eligibleProducts = [
  { id: 1, name: "Silk Dress", vendor: "Amara Okafor", image: "https://picsum.photos/seed/ord1/200/200", orderId: 1001 },
  { id: 2, name: "Organic Soap Set", vendor: "Sofia Glow", image: "https://picsum.photos/seed/ord2/200/200", orderId: 1002 },
];

const steps = ["Select Product", "Add Media", "Write Caption", "Rate", "Preview"] as const;

const CreateReview = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [step, setStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<typeof eligibleProducts[0] | null>(null);
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);

  const canProceed = () => {
    if (step === 0) return !!selectedProduct;
    if (step === 2) return caption.length > 0 && caption.length <= 300;
    if (step === 3) return rating > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-12">
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Create Review</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      {/* Progress bar */}
      <div className="px-4 pb-4">
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${i <= step ? "bg-foreground" : "bg-border"}`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Step {step + 1}: {steps[step]}</p>
      </div>

      <main className="px-4">
        {/* Step 1: Select Product */}
        {step === 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground mb-3">Select a delivered product to review</h3>
            {eligibleProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`w-full flex items-center gap-3 p-3 rounded-[18px] text-left transition-all active:scale-[0.98] ${
                  selectedProduct?.id === p.id
                    ? "bg-foreground/5 border-2 border-foreground"
                    : "bg-background/60 border border-border/30"
                }`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.vendor}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground/50" />
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Media */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Upload photos or video</h3>
            <p className="text-xs text-muted-foreground">Add 1-4 photos or a short video of the product</p>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  onClick={() => setMediaCount(Math.min(4, mediaCount + 1))}
                  className="aspect-square rounded-[18px] border-2 border-dashed border-border/40 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  {i <= mediaCount ? (
                    <div className="w-full h-full rounded-[16px] bg-secondary/50 flex items-center justify-center">
                      <Image size={24} className="text-muted-foreground" />
                    </div>
                  ) : (
                    <>
                      <Camera size={20} className="text-muted-foreground/40" />
                      <span className="text-[10px] text-muted-foreground/40">Add photo</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Caption */}
        {step === 2 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground">Write your review</h3>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value.slice(0, 300))}
              placeholder="Share your honest experience with this product..."
              rows={6}
              className="w-full rounded-[18px] bg-secondary/50 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
            />
            <p className={`text-right text-[11px] font-medium ${caption.length > 280 ? "text-destructive" : "text-muted-foreground"}`}>
              {caption.length}/300
            </p>
          </div>
        )}

        {/* Step 4: Rating */}
        {step === 3 && (
          <div className="flex flex-col items-center pt-8 space-y-4">
            <h3 className="text-sm font-bold text-foreground">Rate this product</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  className="active:scale-90 transition-transform"
                >
                  <Star
                    size={36}
                    className={`transition-colors ${s <= rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {rating === 0 && "Tap a star to rate"}
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          </div>
        )}

        {/* Step 5: Preview */}
        {step === 4 && selectedProduct && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Preview your review</h3>
            <div className="rounded-[20px] overflow-hidden relative aspect-square">
              <img src={selectedProduct.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-full px-2.5 py-1">
                <span className="text-[10px] font-bold text-emerald-400">✓ Verified Purchase</span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-0.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-2.5 py-1">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span className="text-[10px] font-bold text-white">{rating}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img src="https://i.pravatar.cc/160?img=47" alt="" className="w-8 h-8 rounded-full object-cover border border-white/30" />
                  <div>
                    <p className="text-xs font-bold text-white">Aria Collins</p>
                    <p className="text-[10px] text-white/50">@aria.collins</p>
                  </div>
                </div>
                <p className="text-[11px] text-white/70 line-clamp-3">{caption}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 py-4 bg-background/80 backdrop-blur-xl border-t border-border/20">
        {step < 4 ? (
          <button
            disabled={!canProceed()}
            onClick={() => setStep(step + 1)}
            className="w-full rounded-full bg-foreground text-background py-3 text-sm font-semibold disabled:opacity-40 active:scale-95 transition-transform"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => navigate("/profile")}
            className="w-full rounded-full bg-foreground text-background py-3 text-sm font-semibold active:scale-95 transition-transform"
          >
            Publish Review
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateReview;
