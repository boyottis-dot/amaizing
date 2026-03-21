import { useState } from "react";

const tabs = ["Discover", "Following"];
const categories = [
  { label: "Lifestyle", image: "https://picsum.photos/seed/lifestyle/80/80" },
  { label: "Basketball", image: "https://picsum.photos/seed/basketball/80/80" },
  { label: "Running", image: "https://picsum.photos/seed/running/80/80" },
  { label: "Fashion", image: "https://picsum.photos/seed/fashion2/80/80" },
  { label: "Jewelry", image: "https://picsum.photos/seed/jewelry2/80/80" },
  { label: "Home", image: "https://picsum.photos/seed/home2/80/80" },
  { label: "Beauty", image: "https://picsum.photos/seed/beauty2/80/80" },
  { label: "Food", image: "https://picsum.photos/seed/food2/80/80" },
];

const CategoryPills = () => {
  const [activeTab, setActiveTab] = useState("Discover");
  const [activeCategory, setActiveCategory] = useState("Lifestyle");

  return (
    <div className="mb-1">
      {/* Tabs */}
      <div className="flex gap-6 py-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[15px] font-semibold transition-colors relative pb-1 ${
              activeTab === tab
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-foreground" />
            )}
          </button>
        ))}
      </div>

      {/* Category pills with images */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={`shrink-0 flex items-center gap-1.5 pl-[3px] pr-3 py-[3px] rounded-full text-[12px] font-semibold transition-all duration-200 backdrop-blur-xl active:scale-95 ${
              activeCategory === cat.label
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
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPills;
