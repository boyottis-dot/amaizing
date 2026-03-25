import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Edit3, X, Gift, Cake, PartyPopper, ShoppingBag, Check, Search, UserPlus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const initialItems = [
  { id: 1, name: "Handmade Earrings", price: "$24", image: "https://picsum.photos/seed/wish1/400/400" },
  { id: 2, name: "Organic Soap Set", price: "$18", image: "https://picsum.photos/seed/wish2/400/400" },
  { id: 3, name: "Ceramic Mug", price: "$32", image: "https://picsum.photos/seed/wish3/400/400" },
  { id: 4, name: "Woven Basket", price: "$45", image: "https://picsum.photos/seed/wish4/400/400" },
  { id: 5, name: "Silk Scarf", price: "$55", image: "https://picsum.photos/seed/wish5/400/400" },
  { id: 6, name: "Candle Trio", price: "$38", image: "https://picsum.photos/seed/wish6/400/400" },
];

const wishlistTypes = [
  { id: "general", label: "General Wishlist", icon: Heart, description: "A personal collection of items you love" },
  { id: "birthday", label: "Birthday Wishlist", icon: Cake, description: "Share what you'd love for your birthday" },
  { id: "wedding", label: "Wedding Registry", icon: PartyPopper, description: "Build your dream wedding registry" },
  { id: "gift", label: "Gift Ideas", icon: Gift, description: "Curate gift ideas for friends & family" },
  { id: "shopping", label: "Shopping List", icon: ShoppingBag, description: "Items you plan to buy soon" },
];

const followingPeople = [
  { id: 1, name: "Amara Okafor", handle: "@amara.style", avatar: "https://i.pravatar.cc/80?img=32", isFollowing: true },
  { id: 2, name: "Kofi Mensah", handle: "@kofi.craft", avatar: "https://i.pravatar.cc/80?img=15", isFollowing: true },
  { id: 3, name: "Jessica M.", handle: "@jess.reviews", avatar: "https://i.pravatar.cc/80?img=44", isFollowing: true },
  { id: 4, name: "Lina Park", handle: "@lina.jewels", avatar: "https://i.pravatar.cc/80?img=9", isFollowing: true },
  { id: 5, name: "David K.", handle: "@david.foodie", avatar: "https://i.pravatar.cc/80?img=52", isFollowing: true },
];

const suggestedPeople = [
  { id: 6, name: "Maya Carter", handle: "@maya.beauty", avatar: "https://i.pravatar.cc/80?img=25", isFollowing: false },
  { id: 7, name: "Liam Chen", handle: "@liam.eats", avatar: "https://i.pravatar.cc/80?img=11", isFollowing: false },
  { id: 8, name: "Sofia Glow", handle: "@sofia.glow", avatar: "https://i.pravatar.cc/80?img=33", isFollowing: false },
];

const ShareSheet = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<"details" | "people">("details");
  const [selectedType, setSelectedType] = useState("general");
  const [title, setTitle] = useState("My Wishlist");
  const [note, setNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeople, setSelectedPeople] = useState<number[]>([]);

  const togglePerson = (id: number) => {
    setSelectedPeople((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const allPeople = [...followingPeople, ...suggestedPeople];
  const filteredPeople = searchQuery
    ? allPeople.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.handle.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  const handleClose = () => {
    setStep("details");
    setSelectedPeople([]);
    setSearchQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100]"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 max-h-[88vh] rounded-t-[28px] bg-background border-t border-border/30 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3">
              <h2 className="text-base font-bold text-foreground">
                {step === "details" ? "Share Wishlist" : "Share With"}
              </h2>
              <button onClick={handleClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform">
                <X size={14} className="text-foreground" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-y-auto max-h-[72vh] px-5 pb-8"
                >
                  {/* Title input */}
                  <div className="mb-4">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Wishlist Name</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-2xl bg-secondary/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
                      placeholder="e.g. Birthday Wishes"
                    />
                  </div>

                  {/* Type selection */}
                  <div className="mb-4">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Wishlist Type</label>
                    <div className="flex flex-col gap-2">
                      {wishlistTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`flex items-center gap-3 rounded-2xl p-3.5 border transition-all duration-200 active:scale-[0.98] ${
                            selectedType === type.id
                              ? "bg-primary/10 border-primary/30"
                              : "bg-secondary/40 border-border/30"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            selectedType === type.id ? "bg-primary/20" : "bg-secondary"
                          }`}>
                            <type.icon size={18} className={selectedType === type.id ? "text-primary" : "text-muted-foreground"} />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className={`text-sm font-semibold ${selectedType === type.id ? "text-foreground" : "text-foreground/80"}`}>{type.label}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{type.description}</p>
                          </div>
                          {selectedType === type.id && (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                              <Check size={12} className="text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Note */}
                  <div className="mb-5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Add a Note (optional)</label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      className="w-full rounded-2xl bg-secondary/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none focus:border-primary/50 transition-colors"
                      placeholder="Add a personal message..."
                    />
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => setStep("people")}
                    className="w-full rounded-full bg-foreground text-background py-3.5 text-sm font-bold active:scale-95 transition-transform duration-150"
                  >
                    Next — Choose People
                  </button>
                </motion.div>
              )}

              {step === "people" && (
                <motion.div
                  key="people"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-y-auto max-h-[72vh] px-5 pb-8"
                >
                  {/* Search */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 rounded-2xl bg-secondary/60 border border-border/30 px-3.5 py-2.5">
                      <Search size={15} className="text-muted-foreground shrink-0" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search people..."
                        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                      />
                    </div>
                  </div>

                  {/* Selected chips */}
                  {selectedPeople.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedPeople.map((id) => {
                        const person = allPeople.find((p) => p.id === id);
                        if (!person) return null;
                        return (
                          <motion.button
                            key={id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={() => togglePerson(id)}
                            className="flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 pl-1 pr-2.5 py-1 active:scale-95 transition-transform"
                          >
                            <img src={person.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-[11px] font-semibold text-foreground">{person.name.split(" ")[0]}</span>
                            <X size={10} className="text-muted-foreground" />
                          </motion.button>
                        );
                      })}
                    </div>
                  )}

                  {/* Search results */}
                  {filteredPeople ? (
                    <div className="mb-4">
                      <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Results</label>
                      <div className="flex flex-col gap-1.5">
                        {filteredPeople.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-6">No people found</p>
                        )}
                        {filteredPeople.map((person) => (
                          <PersonRow key={person.id} person={person} selected={selectedPeople.includes(person.id)} onToggle={() => togglePerson(person.id)} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Following */}
                      <div className="mb-5">
                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">People You Follow</label>
                        <div className="flex flex-col gap-1.5">
                          {followingPeople.map((person) => (
                            <PersonRow key={person.id} person={person} selected={selectedPeople.includes(person.id)} onToggle={() => togglePerson(person.id)} />
                          ))}
                        </div>
                      </div>

                      {/* Suggested */}
                      <div className="mb-5">
                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Suggested</label>
                        <div className="flex flex-col gap-1.5">
                          {suggestedPeople.map((person) => (
                            <PersonRow key={person.id} person={person} selected={selectedPeople.includes(person.id)} onToggle={() => togglePerson(person.id)} />
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Share button */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep("details")}
                      className="flex-1 rounded-full bg-secondary border border-border/30 text-foreground py-3.5 text-sm font-bold active:scale-95 transition-transform duration-150"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleClose}
                      disabled={selectedPeople.length === 0}
                      className="flex-[2] rounded-full bg-foreground text-background py-3.5 text-sm font-bold active:scale-95 transition-transform duration-150 disabled:opacity-40"
                    >
                      Share with {selectedPeople.length || ""} {selectedPeople.length === 1 ? "person" : selectedPeople.length > 1 ? "people" : ""}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PersonRow = ({ person, selected, onToggle }: { person: { id: number; name: string; handle: string; avatar: string; isFollowing: boolean }; selected: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`flex items-center gap-3 rounded-2xl p-3 border transition-all duration-200 active:scale-[0.98] ${
      selected ? "bg-primary/10 border-primary/30" : "bg-secondary/30 border-border/20"
    }`}
  >
    <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
    <div className="flex-1 text-left min-w-0">
      <p className="text-sm font-semibold text-foreground truncate">{person.name}</p>
      <p className="text-[10px] text-muted-foreground">{person.handle}</p>
    </div>
    {!person.isFollowing && (
      <span className="text-[10px] font-semibold text-primary flex items-center gap-0.5 shrink-0">
        <UserPlus size={10} /> Follow
      </span>
    )}
    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
      selected ? "bg-primary border-primary" : "border-border"
    }`}>
      {selected && <Check size={12} className="text-primary-foreground" />}
    </div>
  </button>
);

const Wishlist = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialItems);
  const [isEditing, setIsEditing] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Wishlist</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShareOpen(true)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150">
            <Share2 size={14} className="text-foreground" />
          </button>
          <button onClick={() => setIsEditing(!isEditing)} className={`flex items-center justify-center h-9 w-9 rounded-full backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform duration-150 ${isEditing ? "bg-foreground" : "bg-background/60"}`}>
            <Edit3 size={14} className={isEditing ? "text-background" : "text-foreground"} />
          </button>
        </div>
      </header>

      <main className="px-3 pb-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-24 text-center">
            <Heart size={40} className="text-muted-foreground/30 mb-3" />
            <p className="text-sm font-semibold text-foreground">No saved items yet</p>
            <p className="text-xs text-muted-foreground mt-1">Items you save will appear here</p>
            <button onClick={() => navigate("/")} className="mt-5 rounded-full bg-foreground text-background px-6 py-2.5 text-xs font-semibold active:scale-95 transition-transform duration-150">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-square rounded-[18px] overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform duration-200"
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {isEditing && (
                    <button onClick={() => removeItem(item.id)} className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10 active:scale-90 transition-transform duration-150">
                      <X size={14} className="text-white" />
                    </button>
                  )}
                  {!isEditing && (
                    <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/15 active:scale-90 transition-transform duration-150">
                      <Heart size={16} className="text-white fill-white" strokeWidth={1.5} />
                    </button>
                  )}
                  <div className="absolute top-3 right-3 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <span className="text-white text-[11px] font-bold">{item.price}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/15 backdrop-blur-xl rounded-[12px] px-3 py-2 border border-white/15">
                      <span className="text-white text-[11px] font-semibold truncate block">{item.name}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <ShareSheet open={shareOpen} onClose={() => setShareOpen(false)} />
      <BottomNav />
    </div>
  );
};

export default Wishlist;
