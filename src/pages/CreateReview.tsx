import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Camera, ChevronRight, Crop, Image, Pencil, RotateCcw, Star, Trash2, X } from "lucide-react";

const eligibleProducts = [
  { id: 1, name: "Silk Dress", vendor: "Amara Okafor", image: "https://picsum.photos/seed/ord1/200/200", orderId: 1001 },
  { id: 2, name: "Organic Soap Set", vendor: "Sofia Glow", image: "https://picsum.photos/seed/ord2/200/200", orderId: 1002 },
];

const placeholderImages = [
  "https://picsum.photos/seed/review1/400/400",
  "https://picsum.photos/seed/review2/400/400",
  "https://picsum.photos/seed/review3/400/400",
  "https://picsum.photos/seed/review4/400/400",
];

const steps = ["Select Product", "Add Media", "Write Caption", "Rate", "Preview"] as const;

const CreateReview = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [step, setStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<typeof eligibleProducts[0] | null>(null);
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);

  const canProceed = () => {
    if (step === 0) return !!selectedProduct;
    if (step === 2) return caption.length > 0 && caption.length <= 300;
    if (step === 3) return rating > 0;
    return true;
  };

  const addImage = () => {
    if (uploadedImages.length < 4) {
      setUploadedImages([...uploadedImages, placeholderImages[uploadedImages.length]]);
    }
  };

  const removeImage = (idx: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== idx));
    setSelectedImageIdx(null);
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">Upload photos or video</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Add 1-4 photos or a short video</p>
              </div>
              {/* Image counter badge */}
              <div className="flex items-center gap-1.5 bg-foreground/5 rounded-full px-3 py-1.5 border border-border/30">
                <Image size={13} className="text-foreground" />
                <span className="text-xs font-bold text-foreground">{uploadedImages.length}</span>
                <span className="text-[10px] text-muted-foreground">/ 4</span>
              </div>
            </div>

            {/* Uploaded images with edit controls */}
            {uploadedImages.length > 0 && (
              <div className="space-y-3">
                {/* Main selected image preview */}
                <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] bg-secondary/30">
                  <img
                    src={uploadedImages[selectedImageIdx ?? 0]}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                  {/* Edit toolbar overlay */}
                  <div className="absolute top-3 right-3 flex gap-1.5 z-10">
                    <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center active:scale-90 transition-transform">
                      <Crop size={15} className="text-white" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center active:scale-90 transition-transform">
                      <Pencil size={15} className="text-white" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center active:scale-90 transition-transform">
                      <RotateCcw size={15} className="text-white" />
                    </button>
                    <button
                      onClick={() => removeImage(selectedImageIdx ?? 0)}
                      className="w-9 h-9 rounded-full bg-red-500/60 backdrop-blur-xl border border-white/20 flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <Trash2 size={15} className="text-white" />
                    </button>
                  </div>
                  {/* Image number badge */}
                  <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-xl rounded-full px-2.5 py-1 border border-white/20">
                    <span className="text-[10px] font-bold text-white">{(selectedImageIdx ?? 0) + 1} / {uploadedImages.length}</span>
                  </div>
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-2">
                  {uploadedImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-16 h-16 rounded-[12px] overflow-hidden shrink-0 transition-all active:scale-90 ${
                        (selectedImageIdx ?? 0) === idx
                          ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                          : "opacity-60"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                        className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-destructive flex items-center justify-center z-10"
                      >
                        <X size={10} className="text-white" />
                      </button>
                    </button>
                  ))}
                  {/* Add more button in thumbnail strip */}
                  {uploadedImages.length < 4 && (
                    <button
                      onClick={addImage}
                      className="w-16 h-16 rounded-[12px] border-2 border-dashed border-border/40 flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-transform shrink-0"
                    >
                      <Camera size={16} className="text-muted-foreground/50" />
                      <span className="text-[8px] text-muted-foreground/50">Add</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Empty state grid when no images uploaded */}
            {uploadedImages.length === 0 && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={addImage}
                  className="aspect-square rounded-[18px] border-2 border-dashed border-foreground/20 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform bg-foreground/[0.02]"
                >
                  <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                    <Camera size={22} className="text-foreground/40" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">Take Photo</span>
                </button>
                <button
                  onClick={addImage}
                  className="aspect-square rounded-[18px] border-2 border-dashed border-foreground/20 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform bg-foreground/[0.02]"
                >
                  <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                    <Image size={22} className="text-foreground/40" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">From Gallery</span>
                </button>
              </div>
            )}
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
              <img src={uploadedImages[0] || selectedProduct.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Image count indicator */}
              {uploadedImages.length > 1 && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-xl rounded-full px-2.5 py-1 border border-white/20">
                  <Image size={10} className="text-white" />
                  <span className="text-[10px] font-bold text-white">1/{uploadedImages.length}</span>
                </div>
              )}
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-full px-2.5 py-1">
                <span className="text-[10px] font-bold text-emerald-400">✓ Verified Purchase</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img src="https://i.pravatar.cc/160?img=47" alt="" className="w-8 h-8 rounded-full object-cover border border-white/30" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white">Aria Collins</p>
                      <div className="flex items-center gap-0.5 bg-white/10 backdrop-blur-xl rounded-full px-1.5 py-0.5 border border-white/15">
                        <Star size={8} className="fill-amber-400 text-amber-400" />
                        <span className="text-[9px] font-bold text-white">{rating}</span>
                      </div>
                    </div>
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
