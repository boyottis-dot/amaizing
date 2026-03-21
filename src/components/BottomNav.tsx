import { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  Expand,
  Home,
  MessageCircle,
  ShoppingBag,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home", icon: Home, badge: 0 },
  { to: "/search", label: "Shop", icon: ShoppingBag, badge: 0 },
  { to: "/profile", label: "Profile", icon: User, badge: 3 },
] as const;

const recentChats = [
  {
    id: 1,
    name: "Thoko Atelier",
    snippet: "Your woven tote is packed and ready.",
    unread: 2,
    avatar: "https://i.pravatar.cc/40?img=32",
  },
  {
    id: 2,
    name: "Mzuzu Tech Hub",
    snippet: "We just restocked the wireless speakers.",
    unread: 0,
    avatar: "https://i.pravatar.cc/40?img=11",
  },
  {
    id: 3,
    name: "Kaya Beauty",
    snippet: "Want the full skincare bundle instead?",
    unread: 1,
    avatar: "https://i.pravatar.cc/40?img=25",
  },
  {
    id: 4,
    name: "Zuri Designs",
    snippet: "Your custom order is in progress!",
    unread: 0,
    avatar: "https://i.pravatar.cc/40?img=44",
  },
  {
    id: 5,
    name: "Liam Eats",
    snippet: "Thanks for the 5-star review 🙏",
    unread: 4,
    avatar: "https://i.pravatar.cc/40?img=52",
  },
] as const;

interface BottomNavProps {
  className?: string;
}

const navItemClass =
  "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[20px] px-2 py-2 text-[10px] font-medium text-muted-foreground/80 transition-colors duration-300";

const BottomNav = ({ className }: BottomNavProps) => {
  const [isQuickPanelOpen, setIsQuickPanelOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsQuickPanelOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isQuickPanelOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsQuickPanelOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isQuickPanelOpen]);

  const totalUnread = recentChats.reduce((s, c) => s + c.unread, 0);

  return (
    <div ref={rootRef} className={cn("fixed inset-x-0 bottom-4 z-40 flex justify-center px-4", className)}>
      <div className="relative w-full max-w-[21rem]">
        <AnimatePresence>
          {isQuickPanelOpen && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-full right-0 mb-3 w-[18.75rem] overflow-hidden rounded-[28px] border border-border/35 bg-background/88 p-2 shadow-[0_18px_44px_hsl(var(--foreground)/0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-background/82"
            >
              <div className="relative overflow-hidden rounded-[22px] border border-border/30 bg-secondary/82 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">Recent chats</h3>
                  {totalUnread > 0 && (
                    <div className="rounded-full border border-border/35 bg-background px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                      {totalUnread} unread
                    </div>
                  )}
                </div>

                {/* Scrollable chat list */}
                <div className="space-y-2 max-h-[240px] overflow-y-auto no-scrollbar">
                  {recentChats.map((chat) => (
                    <button
                      key={chat.id}
                      type="button"
                      onClick={() => { setIsQuickPanelOpen(false); navigate("/messages"); }}
                      className="flex w-full items-center gap-3 rounded-[16px] bg-background px-3 py-3 text-left transition-colors duration-300 hover:bg-background/80 border border-border/20"
                    >
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-border/20"
                      />

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-semibold text-foreground">{chat.name}</span>
                          {chat.unread > 0 ? (
                            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
                              {chat.unread}
                            </span>
                          ) : (
                            <ChevronRight size={14} className="text-muted-foreground" />
                          )}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                          {chat.snippet}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                {/* Expand to full messages page */}
                <button
                  type="button"
                  onClick={() => { setIsQuickPanelOpen(false); navigate("/messages"); }}
                  className="mt-3 w-full flex items-center justify-center gap-2 rounded-full bg-foreground/10 py-2.5 text-[12px] font-semibold text-foreground hover:bg-foreground/15 transition-colors"
                >
                  <Expand size={14} />
                  View All Messages
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex w-full items-center gap-1.5 overflow-hidden rounded-[26px] border border-border/35 bg-background/25 p-1.5 shadow-[0_20px_60px_hsl(var(--foreground)/0.18)] backdrop-blur-[28px] supports-[backdrop-filter]:bg-background/20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.4),transparent_35%),radial-gradient(circle_at_bottom_right,hsl(var(--accent)/0.28),transparent_38%)] opacity-90" />
          <div className="pointer-events-none absolute inset-[1px] rounded-[24px] border border-border/20" />

          {navItems.map(({ to, label, icon: Icon, badge }) => {
            return (
              <NavLink
                key={label}
                to={to}
                className={navItemClass}
                activeClassName="text-foreground"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="bottom-nav-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-[20px] border border-border/30 bg-background/50 shadow-[inset_0_1px_0_hsl(var(--background)/0.45),0_10px_24px_hsl(var(--foreground)/0.12)] backdrop-blur-xl"
                      />
                    )}
                    <span className="relative z-10">
                      <Icon size={16} strokeWidth={1.9} />
                      {badge > 0 && (
                        <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 rounded-full bg-[hsl(0,75%,30%)] text-[9px] font-bold text-white flex items-center justify-center px-1">
                          {badge}
                        </span>
                      )}
                    </span>
                    <span className="relative z-10">{label}</span>
                  </>
                )}
              </NavLink>
            );
          })}

          <button
            type="button"
            aria-label="Messages"
            aria-expanded={isQuickPanelOpen}
            onClick={() => setIsQuickPanelOpen((open) => !open)}
            className={cn(
              "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] border border-border/35 text-foreground shadow-[0_14px_24px_hsl(var(--foreground)/0.16),inset_0_1px_0_hsl(var(--background)/0.55)] backdrop-blur-xl transition-all duration-300 active:scale-95",
              isQuickPanelOpen
                ? "bg-[hsl(var(--foreground)/0.92)] text-[hsl(var(--background))]"
                : "bg-background/50",
            )}
          >
            <span className="pointer-events-none absolute inset-[1px] rounded-[17px] bg-[linear-gradient(180deg,hsl(var(--background)/0.45),transparent)]" />
            <MessageCircle size={18} strokeWidth={1.9} className="relative z-10" />
            {totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-[hsl(0,75%,30%)] text-[9px] font-bold text-white flex items-center justify-center px-1 z-20">
                {totalUnread}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
