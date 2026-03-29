import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const collections = [
{ id: 1, title: "Summer Essentials", likes: 1240, main: "https://picsum.photos/seed/col1/600/600", thumbs: ["https://picsum.photos/seed/col1a/200/200", "https://picsum.photos/seed/col1b/200/200", "https://picsum.photos/seed/col1c/200/200"], vendors: ["https://i.pravatar.cc/40?img=32", "https://i.pravatar.cc/40?img=9", "https://i.pravatar.cc/40?img=15"] },
{ id: 2, title: "Handmade Picks", likes: 876, main: "https://picsum.photos/seed/col2/600/600", thumbs: ["https://picsum.photos/seed/col2a/200/200", "https://picsum.photos/seed/col2b/200/200", "https://picsum.photos/seed/col2c/200/200"], vendors: ["https://i.pravatar.cc/40?img=15"] },
{ id: 3, title: "Street Style", likes: 2100, main: "https://picsum.photos/seed/col3/600/600", thumbs: ["https://picsum.photos/seed/col3a/200/200", "https://picsum.photos/seed/col3b/200/200", "https://picsum.photos/seed/col3c/200/200"], vendors: ["https://i.pravatar.cc/40?img=25", "https://i.pravatar.cc/40?img=44"] }];


const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const CollectionsRow = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-foreground">​Best Budget Collections      </span>
          <span className="text-[10px] text-muted-foreground align-super">{collections.length}</span>
        </div>
        <button
          onClick={() => navigate("/search?category=Collections")}
          className="text-xs font-semibold text-primary active:scale-95 transition-transform duration-150">
          
          View All
        </button>
      </div>
      <div className="relative -mx-4">
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
          {collections.map((col) =>
          <div key={col.id} className="shrink-0 w-[270px] aspect-square rounded-[20px] overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform duration-200">
              <img src={col.main} alt={col.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center -space-x-2 z-10">
                {col.vendors.map((av, idx) => (
                  <img key={idx} src={av} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white/40" style={{ zIndex: col.vendors.length - idx }} />
                ))}
              </div>
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
      </div>
    </div>);

};

export default CollectionsRow;