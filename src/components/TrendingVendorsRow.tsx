import { useNavigate } from "react-router-dom";

const vendors = [
  { id: 1, name: "Sienna James", followers: "2.1k", img: "https://i.pravatar.cc/400?img=32" },
  { id: 2, name: "Maya Carter", followers: "1.8k", img: "https://i.pravatar.cc/400?img=25" },
  { id: 3, name: "Liam Chen", followers: "3.4k", img: "https://i.pravatar.cc/400?img=11" },
];

const TrendingVendorsRow = () => {
  const navigate = useNavigate();
  return (
    <div className="py-4">
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-lg font-bold text-foreground">Popular People</span>
        <span className="text-[10px] text-muted-foreground align-super">{vendors.length}</span>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
        {vendors.map((v) => (
          <div
            key={v.id}
            onClick={() => navigate(`/vendor/${v.id}`)}
            className="shrink-0 w-[150px] h-[180px] rounded-[18px] overflow-hidden relative cursor-pointer active:scale-95 transition-transform"
          >
            <img
              src={v.img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-125 blur-xl opacity-90 saturate-200"
            />
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute top-3 left-3 right-3 z-10">
              <p className="text-white text-base font-bold truncate drop-shadow-md">
                {v.name}
              </p>
              <p className="text-white/60 text-[10px] font-medium">{v.followers} followers</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <img
                src={v.img}
                alt={v.name}
                className="w-[90px] h-[90px] rounded-full object-cover border-[3px] border-white/30 shadow-xl"
              />
            </div>
            <div className="absolute bottom-2.5 left-3 right-3 z-10">
              <button className="w-full py-1.5 rounded-full bg-white/15 backdrop-blur-xl text-white text-xs font-semibold border border-white/20 hover:bg-white/25 transition-colors">
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingVendorsRow;
