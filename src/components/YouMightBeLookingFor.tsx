import { useRef } from "react";

const browseCategories = [
  // Row 1
  [
    { label: "Sneakers", image: "https://picsum.photos/seed/browse-sneak/80/80" },
    { label: "Skincare", image: "https://picsum.photos/seed/browse-skin/80/80" },
    { label: "Watches", image: "https://picsum.photos/seed/browse-watch/80/80" },
    { label: "Candles", image: "https://picsum.photos/seed/browse-candle/80/80" },
    { label: "Art Prints", image: "https://picsum.photos/seed/browse-art/80/80" },
    { label: "Bags", image: "https://picsum.photos/seed/browse-bags/80/80" },
  ],
  // Row 2
  [
    { label: "Earrings", image: "https://picsum.photos/seed/browse-earring/80/80" },
    { label: "Ceramics", image: "https://picsum.photos/seed/browse-ceramic/80/80" },
    { label: "Perfume", image: "https://picsum.photos/seed/browse-perfume/80/80" },
    { label: "Scarves", image: "https://picsum.photos/seed/browse-scarf/80/80" },
    { label: "Hats", image: "https://picsum.photos/seed/browse-hats/80/80" },
    { label: "Shoes", image: "https://picsum.photos/seed/browse-shoes/80/80" },
  ],
  // Row 3
  [
    { label: "Jackets", image: "https://picsum.photos/seed/browse-jacket/80/80" },
    { label: "Rings", image: "https://picsum.photos/seed/browse-rings/80/80" },
    { label: "Sunglasses", image: "https://picsum.photos/seed/browse-sun/80/80" },
    { label: "Bracelets", image: "https://picsum.photos/seed/browse-brace/80/80" },
    { label: "Decor", image: "https://picsum.photos/seed/browse-decor/80/80" },
    { label: "Plants", image: "https://picsum.photos/seed/browse-plant/80/80" },
  ],
];

const totalCount = browseCategories.reduce((sum, row) => sum + row.length, 0);

const YouMightBeLookingFor = () => {
  return (
    <div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-lg font-bold text-foreground">You Might Be Looking For</span>
        <span className="text-[10px] text-muted-foreground align-super">{totalCount}</span>
      </div>
      <div className="flex flex-col gap-2.5 -mx-4">
        {browseCategories.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="relative"
          >
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-4">
              {row.map((cat) => (
                <button
                  key={cat.label}
                  className="flex items-center gap-1.5 pl-[3px] pr-3 py-[3px] rounded-full text-[12px] font-semibold transition-all duration-200 backdrop-blur-xl active:scale-95 bg-background/60 text-muted-foreground hover:bg-background/80 shadow-sm border border-border/20 shrink-0"
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
        ))}
      </div>
    </div>
  );
};

export default YouMightBeLookingFor;
