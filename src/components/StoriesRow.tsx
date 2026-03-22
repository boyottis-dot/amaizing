import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stories = [
  { id: 1, name: "Your Story", img: "https://i.pravatar.cc/90?img=3", isYou: true },
  { id: 2, name: "Aisha", img: "https://i.pravatar.cc/90?img=5", post: "https://picsum.photos/seed/st2/200/200", watched: false },
  { id: 3, name: "Marco", img: "https://i.pravatar.cc/90?img=12", post: "https://picsum.photos/seed/st3/200/200", watched: false },
  { id: 4, name: "Lina", img: "https://i.pravatar.cc/90?img=9", post: "https://picsum.photos/seed/st4/200/200", watched: true },
  { id: 5, name: "Kofi", img: "https://i.pravatar.cc/90?img=15", post: "https://picsum.photos/seed/st5/200/200", watched: false },
  { id: 6, name: "Priya", img: "https://i.pravatar.cc/90?img=23", post: "https://picsum.photos/seed/st6/200/200", watched: true },
];

const StoriesRow = () => {
  const navigate = useNavigate();
  return (
  <div className="pt-4 pb-2">
    <div className="flex items-baseline gap-1 mb-3">
      <span className="text-lg font-bold text-foreground">Stories</span>
      <span className="text-[10px] text-muted-foreground align-super">{stories.length}</span>
    </div>

    <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pt-1">
      {stories.map((s) => (
        <div key={s.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 transition-transform duration-150" onClick={() => s.isYou ? navigate("/create-post") : navigate(`/story/${s.id}`)}>
          <div className="relative">
            {/* Gradient ring for unwatched stories */}
            {!s.isYou && (
              <div
                className={`absolute -inset-[3px] rounded-[21px] ${
                  s.watched
                    ? "bg-muted-foreground/30"
                    : "bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600"
                }`}
              />
            )}
            <div className="relative w-[72px] h-[90px] rounded-[18px] overflow-hidden bg-secondary">
              {s.isYou ? (
                <>
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                      <Plus size={16} className="text-primary-foreground" strokeWidth={2.5} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img src={s.post} alt={s.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                    <img
                      src={s.img}
                      alt={s.name}
                      className="w-6 h-6 rounded-full object-cover border-2 border-background"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">{s.name}</span>
        </div>
      ))}
    </div>
  </div>
  );
};

export default StoriesRow;
