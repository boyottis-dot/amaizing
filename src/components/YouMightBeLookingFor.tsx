const browseCategories = [
  { label: "Sneakers", image: "https://picsum.photos/seed/browse-sneak/80/80" },
  { label: "Skincare", image: "https://picsum.photos/seed/browse-skin/80/80" },
  { label: "Watches", image: "https://picsum.photos/seed/browse-watch/80/80" },
  { label: "Candles", image: "https://picsum.photos/seed/browse-candle/80/80" },
  { label: "Art Prints", image: "https://picsum.photos/seed/browse-art/80/80" },
  { label: "Bags", image: "https://picsum.photos/seed/browse-bags/80/80" },
  { label: "Earrings", image: "https://picsum.photos/seed/browse-earring/80/80" },
  { label: "Ceramics", image: "https://picsum.photos/seed/browse-ceramic/80/80" },
  { label: "Perfume", image: "https://picsum.photos/seed/browse-perfume/80/80" },
  { label: "Scarves", image: "https://picsum.photos/seed/browse-scarf/80/80" },
];

const YouMightBeLookingFor = () => {
  return (
    <div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-lg font-bold text-foreground">You Might Be Looking For</span>
        <span className="text-[10px] text-muted-foreground align-super">{browseCategories.length}</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {browseCategories.map((cat) => (
          <button
            key={cat.label}
            className="flex items-center gap-1.5 pl-[3px] pr-3 py-[3px] rounded-full text-[12px] font-semibold transition-all duration-200 backdrop-blur-xl active:scale-95 bg-background/60 text-muted-foreground hover:bg-background/80 shadow-sm border border-border/20"
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-border/30"
            />
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YouMightBeLookingFor;
