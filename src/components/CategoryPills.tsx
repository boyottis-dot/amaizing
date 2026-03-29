import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const tabs = ["Discover", "Following"];

interface SubCategory {
  label: string;
  image: string;
}

interface Category {
  label: string;
  image: string;
  subcategories?: SubCategory[];
}

const categories: Category[] = [
  { label: "Lifestyle", image: "https://picsum.photos/seed/lifestyle/80/80" },
  {
    label: "Basketball",
    image: "https://picsum.photos/seed/basketball/80/80",
    subcategories: [
      { label: "Shoes", image: "https://picsum.photos/seed/bball-shoes/80/80" },
      { label: "Jerseys", image: "https://picsum.photos/seed/jerseys/80/80" },
      { label: "Accessories", image: "https://picsum.photos/seed/bball-acc/80/80" },
    ],
  },
  {
    label: "Running",
    image: "https://picsum.photos/seed/running/80/80",
    subcategories: [
      { label: "Trail", image: "https://picsum.photos/seed/trail/80/80" },
      { label: "Road", image: "https://picsum.photos/seed/road/80/80" },
      { label: "Gear", image: "https://picsum.photos/seed/run-gear/80/80" },
    ],
  },
  {
    label: "Fashion",
    image: "https://picsum.photos/seed/fashion2/80/80",
    subcategories: [
      { label: "Streetwear", image: "https://picsum.photos/seed/streetwear/80/80" },
      { label: "Formal", image: "https://picsum.photos/seed/formal/80/80" },
      { label: "Vintage", image: "https://picsum.photos/seed/vintage/80/80" },
      { label: "Athleisure", image: "https://picsum.photos/seed/athleisure/80/80" },
    ],
  },
  { label: "Jewelry", image: "https://picsum.photos/seed/jewelry2/80/80" },
  {
    label: "Home",
    image: "https://picsum.photos/seed/home2/80/80",
    subcategories: [
      { label: "Decor", image: "https://picsum.photos/seed/decor/80/80" },
      { label: "Kitchen", image: "https://picsum.photos/seed/kitchen/80/80" },
      { label: "Lighting", image: "https://picsum.photos/seed/lighting/80/80" },
    ],
  },
  { label: "Beauty", image: "https://picsum.photos/seed/beauty2/80/80" },
  { label: "Food", image: "https://picsum.photos/seed/food2/80/80" },
];

const CategoryPills = () => {
  const [activeTab, setActiveTab] = useState("Discover");
  const [activeCategory, setActiveCategory] = useState("Lifestyle");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlePillClick = (cat: Category) => {
    if (cat.subcategories) {
      setOpenDropdown(openDropdown === cat.label ? null : cat.label);
    } else {
      setActiveCategory(cat.label);
      setOpenDropdown(null);
    }
  };

  return (
    <div className="mb-1 relative" ref={dropdownRef}>
      {/* Tabs */}
      <div className="flex gap-6 py-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[15px] font-semibold transition-colors relative pb-1 ${
              activeTab === tab ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-foreground" />
            )}
          </button>
        ))}
      </div>

      {/* Category pills */}
      <div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4">
          {categories.map((cat) => (
            <div key={cat.label} className="relative shrink-0">
              <button
                onClick={() => handlePillClick(cat)}
                className={`shrink-0 flex items-center gap-1.5 pl-[3px] pr-3 py-[3px] rounded-full text-[12px] font-semibold transition-all duration-200 backdrop-blur-xl active:scale-95 ${
                  activeCategory === cat.label || openDropdown === cat.label
                    ? "bg-foreground text-background"
                    : "bg-background/60 text-muted-foreground hover:bg-background/80 shadow-sm"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-border/30"
                />
                {cat.label}
                {cat.subcategories && (
                  <ChevronDown
                    size={12}
                    className={`ml-0.5 transition-transform duration-200 ${openDropdown === cat.label ? "rotate-180" : ""}`}
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Subcategory popup */}
      {openDropdown && (() => {
        const cat = categories.find((c) => c.label === openDropdown);
        if (!cat?.subcategories) return null;
        return (
          <div className="absolute left-4 right-4 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="bg-background/70 backdrop-blur-2xl border border-border/20 rounded-[20px] p-3 shadow-[0_8px_40px_-8px_hsl(var(--foreground)/0.15)]">
              <p className="text-[11px] font-semibold text-muted-foreground mb-2 px-1">{cat.label} subcategories</p>
              <div className="flex gap-2 flex-wrap">
                {cat.subcategories.map((sub) => (
                  <button
                    key={sub.label}
                    onClick={() => {
                      setActiveCategory(sub.label);
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center gap-1.5 pl-[3px] pr-3 py-[3px] rounded-full text-[12px] font-semibold transition-all duration-200 backdrop-blur-xl active:scale-95 ${
                      activeCategory === sub.label
                        ? "bg-foreground text-background"
                        : "bg-background/60 text-muted-foreground hover:bg-background/80 shadow-sm border border-border/20"
                    }`}
                  >
                    <img
                      src={sub.image}
                      alt={sub.label}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-border/30"
                    />
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default CategoryPills;
