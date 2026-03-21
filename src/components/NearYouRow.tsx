import { Heart } from "lucide-react";

const items = [
  { id: 1, name: "Handmade Earrings", price: "$24", image: "https://picsum.photos/seed/near1/400/400" },
  { id: 2, name: "Organic Soap Set", price: "$18", image: "https://picsum.photos/seed/near2/400/400" },
  { id: 3, name: "Ceramic Mug", price: "$32", image: "https://picsum.photos/seed/near3/400/400" },
  { id: 4, name: "Woven Basket", price: "$45", image: "https://picsum.photos/seed/near4/400/400" },
];

const NearYouRow = () => (
  <div className="py-4">
    <div className="flex items-center justify-between mb-3">
      <span className="text-lg font-bold text-foreground">Near You</span>
      <button className="text-xs font-semibold text-primary active:scale-95 transition-transform duration-150">View All</button>
    </div>
    <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
      {items.map((item) => (
        <div key={item.id} className="shrink-0 w-[200px] aspect-square rounded-[18px] overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform duration-200">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          {/* Heart top-left */}
          <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/15 active:scale-90 transition-transform duration-150">
            <Heart size={16} className="text-white" strokeWidth={1.5} />
          </button>
          {/* Price badge top-right */}
          <div className="absolute top-3 right-3 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10">
            <span className="text-white text-[11px] font-bold">{item.price}</span>
          </div>
          {/* Glassmorphic caption bottom */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-white/15 backdrop-blur-xl rounded-[12px] px-3 py-2 border border-white/15">
              <span className="text-white text-[11px] font-semibold truncate block">{item.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NearYouRow;
