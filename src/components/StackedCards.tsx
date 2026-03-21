import { useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Bookmark } from "lucide-react";

const cards = [
  {
    id: 1,
    image: "https://picsum.photos/seed/stack1/600/600",
    title: "Urban Collection",
    avatars: [
      "https://i.pravatar.cc/40?img=32",
      "https://i.pravatar.cc/40?img=9",
      "https://i.pravatar.cc/40?img=15",
    ],
    likes: 234,
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/stack2/600/600",
    title: "Artisan Series",
    avatars: [
      "https://i.pravatar.cc/40?img=15",
      "https://i.pravatar.cc/40?img=23",
    ],
    likes: 145,
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/stack3/600/600",
    title: "Glow Essentials",
    avatars: [
      "https://i.pravatar.cc/40?img=25",
      "https://i.pravatar.cc/40?img=44",
      "https://i.pravatar.cc/40?img=12",
    ],
    likes: 312,
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/stack4/600/600",
    title: "Street Kicks",
    avatars: [
      "https://i.pravatar.cc/40?img=11",
    ],
    likes: 189,
  },
];

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const StackedCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const navigate = useCallback(
    (dir: "left" | "right") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setTimeout(() => {
        setActiveIndex((prev) =>
          dir === "right"
            ? (prev + 1) % cards.length
            : (prev - 1 + cards.length) % cards.length
        );
        setDirection(null);
        setIsAnimating(false);
      }, 400);
    },
    [isAnimating]
  );

  const goToIndex = useCallback(
    (target: number) => {
      if (isAnimating || target === activeIndex) return;
      const diff = (target - activeIndex + cards.length) % cards.length;
      navigate(diff <= cards.length / 2 ? "right" : "left");
    },
    [isAnimating, activeIndex, navigate]
  );

  const getCardStyle = (index: number) => {
    const total = cards.length;
    let offset = (index - activeIndex + total) % total;
    if (direction === "right") offset = (offset - 1 + total) % total;
    else if (direction === "left") offset = (offset + 1) % total;

    if (offset === 0)
      return { zIndex: total, transform: "translateX(0) scale(1)", opacity: 1, filter: "brightness(1)" };
    if (offset === 1)
      return { zIndex: total - 1, transform: "translateX(28px) scale(0.95)", opacity: 1, filter: "brightness(0.45)" };
    if (offset === total - 1)
      return { zIndex: total - 1, transform: "translateX(-28px) scale(0.95)", opacity: 1, filter: "brightness(0.45)" };
    return {
      zIndex: 0,
      transform: `translateX(${offset > total / 2 ? -48 : 48}px) scale(0.9)`,
      opacity: 0,
      filter: "brightness(0.3)",
    };
  };

  const isFrontCard = (index: number) => {
    const total = cards.length;
    const currentOffset = (index - activeIndex + total) % total;
    return (
      (currentOffset === 0 && !direction) ||
      (direction === "right" && currentOffset === 1) ||
      (direction === "left" && currentOffset === total - 1)
    );
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-foreground">Pick Your Vibe</span>
        <button className="text-xs font-semibold text-primary active:scale-95 transition-transform duration-150">View All</button>
      </div>

      {/* Card stack — swipeable */}
      <div className="flex flex-col items-center">
        <div
          className="relative w-[280px] aspect-square touch-pan-y"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            (e.currentTarget as any)._startX = touch.clientX;
          }}
          onTouchEnd={(e) => {
            const startX = (e.currentTarget as any)._startX;
            if (startX == null) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 40) {
              navigate(diff > 0 ? "right" : "left");
            }
          }}
        >
          {cards.map((card, i) => {
            const style = getCardStyle(i);
            const front = isFrontCard(i);
            return (
              <div
                key={card.id}
                className="absolute inset-0 overflow-hidden rounded-[20px] transition-all duration-500"
                style={{
                  ...style,
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Full-bleed image */}
                <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" draggable={false} />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Stacked vendor avatars — top-left */}
                <div className="absolute top-3 left-3 flex items-center">
                  <div className="flex items-center -space-x-2">
                    {card.avatars.map((av, idx) => (
                      <img
                        key={idx}
                        src={av}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border-2 border-white/40"
                        style={{ zIndex: card.avatars.length - idx }}
                      />
                    ))}
                  </div>
                </div>

                {/* Heart + Save top-right */}
                <div
                  className="absolute top-3 right-3 flex flex-col items-center gap-1.5 transition-all duration-500"
                  style={{ opacity: front ? 1 : 0, transform: front ? "translateY(0)" : "translateY(-6px)" }}
                >
                  <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center active:scale-90 transition-transform duration-150">
                    <Heart size={16} className="text-rose-400 fill-rose-400" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center active:scale-90 transition-transform duration-150">
                    <Bookmark size={16} className="text-white/80" />
                  </button>
                </div>

                {/* Bottom content — title is the hero element */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-500"
                  style={{ opacity: front ? 1 : 0, transform: front ? "translateY(0)" : "translateY(8px)" }}
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-[12px] px-3.5 py-2.5 border border-white/15">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-[14px] font-bold">{card.title}</span>
                      <div className="flex items-center gap-1">
                        <Heart size={12} className="text-rose-400 fill-rose-400" />
                        <span className="text-white/70 text-[10px] font-semibold">{formatCount(card.likes)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => navigate("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 active:scale-90 transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeft size={16} className="text-foreground/60" />
          </button>

          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                aria-label={`Go to card ${i + 1}`}
              >
                <span
                  className="block rounded-full transition-all duration-400"
                  style={{
                    width: i === activeIndex ? 20 : 6,
                    height: 6,
                    background: i === activeIndex
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground) / 0.3)",
                    boxShadow: i === activeIndex ? "0 0 8px hsl(var(--primary) / 0.4)" : "none",
                  }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 active:scale-90 transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight size={16} className="text-foreground/60" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StackedCards;
