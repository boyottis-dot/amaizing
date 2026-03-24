import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const collections = [
{ id: 1, title: "Summer Essentials", likes: 1240, main: "https://picsum.photos/seed/col1/600/600", thumbs: ["https://picsum.photos/seed/col1a/200/200", "https://picsum.photos/seed/col1b/200/200", "https://picsum.photos/seed/col1c/200/200"] },
{ id: 2, title: "Handmade Picks", likes: 876, main: "https://picsum.photos/seed/col2/600/600", thumbs: ["https://picsum.photos/seed/col2a/200/200", "https://picsum.photos/seed/col2b/200/200", "https://picsum.photos/seed/col2c/200/200"] },
{ id: 3, title: "Street Style", likes: 2100, main: "https://picsum.photos/seed/col3/600/600", thumbs: ["https://picsum.photos/seed/col3a/200/200", "https://picsum.photos/seed/col3b/200/200", "https://picsum.photos/seed/col3c/200/200"] }];


const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const CollectionsRow = () => {
  const navigate = useNavigate();

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-foreground">​Best weekend collections      </span>
          <span className="text-[10px] text-muted-foreground align-super">{collections.length}</span>
        </div>
        <button
          onClick={() => navigate("/search?category=Collections")}
          className="text-xs font-semibold text-primary active:scale-95 transition-transform duration-150">
          
          View All
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
        {collections.map((col) =>
        <div key={col.id} className="shrink-0 w-[270px] aspect-square rounded-[20px] overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform duration-200">
            <img src={col.main} alt={col.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <div className="flex gap-1.5 mb-3">
                {col.thumbs.map((thumb, i) =>
              <div key={i} className="w-11 h-11 rounded-[10px] overflow-hidden border-2 border-white/30">
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                  </div>
              )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white truncate mr-2">{col.title}</span>
                <button className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20 hover:bg-white/25 transition-all duration-300 ease-out">
                  <Heart size={20} className="text-rose-400 fill-rose-400" />
                  <span className="text-sm text-white font-semibold">{formatCount(col.likes)}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

};

export default CollectionsRow;