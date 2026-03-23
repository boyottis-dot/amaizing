import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Send, Paperclip, MoreHorizontal } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const contacts = [
  { id: 1, name: "Thoko Atelier", snippet: "Your woven tote is packed and ready.", unread: 2, avatar: "https://i.pravatar.cc/40?img=32", online: true },
  { id: 2, name: "Mzuzu Tech Hub", snippet: "We just restocked the wireless speakers.", unread: 0, avatar: "https://i.pravatar.cc/40?img=11", online: false },
  { id: 3, name: "Kaya Beauty", snippet: "Want the full skincare bundle instead?", unread: 1, avatar: "https://i.pravatar.cc/40?img=25", online: true },
  { id: 4, name: "Zuri Designs", snippet: "Your custom order is in progress!", unread: 0, avatar: "https://i.pravatar.cc/40?img=44", online: false },
  { id: 5, name: "Liam Eats", snippet: "Thanks for the 5-star review 🙏", unread: 4, avatar: "https://i.pravatar.cc/40?img=52", online: true },
  { id: 6, name: "Amara Style", snippet: "New silk collection dropping Friday!", unread: 0, avatar: "https://i.pravatar.cc/40?img=9", online: false },
  { id: 7, name: "Kofi Craft", snippet: "Your leather bag is almost done 🧵", unread: 1, avatar: "https://i.pravatar.cc/40?img=15", online: true },
];

const fakeChatMessages = [
  { id: 1, fromMe: false, text: "Hey! Your woven tote is packed and ready for shipping 📦", time: "10:30 AM" },
  { id: 2, fromMe: true, text: "Amazing! When will it arrive?", time: "10:32 AM" },
  { id: 3, fromMe: false, text: "Should be there by Friday. I'll send you tracking details soon!", time: "10:33 AM" },
  { id: 4, fromMe: true, text: "Perfect, thank you so much! 🙏", time: "10:35 AM" },
  { id: 5, fromMe: false, text: "You're welcome! Let me know if you need anything else.", time: "10:36 AM" },
];

const Messages = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeContact = contacts.find((c) => c.id === activeChat);

  if (activeChat && activeContact) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto relative flex flex-col">
        <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border/20">
          <button type="button" onClick={() => setActiveChat(null)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30">
            <ArrowLeft size={16} className="text-foreground" />
          </button>
          <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-border/20" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground truncate">{activeContact.name}</p>
            <p className="text-[11px] text-muted-foreground">{activeContact.online ? "Online" : "Last seen 2h ago"}</p>
          </div>
          <button type="button" className="w-9 h-9 rounded-full flex items-center justify-center">
            <MoreHorizontal size={18} className="text-muted-foreground" />
          </button>
        </header>

        <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
          {fakeChatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-[18px] px-4 py-2.5 ${msg.fromMe ? "bg-foreground text-background rounded-br-[6px]" : "bg-secondary/80 text-foreground border border-border/30 rounded-bl-[6px]"}`}>
                <p className="text-[13px] leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.fromMe ? "text-background/50" : "text-muted-foreground"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 px-4 py-3 bg-background/80 backdrop-blur-xl border-t border-border/20">
          <div className="flex items-center gap-2.5 bg-secondary/60 rounded-full px-4 py-2 border border-border/30">
            <Paperclip size={18} className="text-muted-foreground shrink-0" />
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
            {message && (
              <button className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center shrink-0">
                <Send size={14} className="text-background" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      {/* Sticky header with centered title */}
      <header className="sticky top-0 z-50 flex items-center px-4 py-4 bg-background/80 backdrop-blur-xl">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center justify-center h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] border border-border/30 active:scale-90 transition-transform">
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-[0_2px_12px_-2px_hsl(var(--foreground)/0.08)] px-5 py-2">
            <span className="text-sm font-bold text-foreground">Messages</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-secondary/50 rounded-2xl h-11 px-3 border border-border/20">
          <Search size={15} className="text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search conversations..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
        </div>
      </div>

      <div className="px-4 space-y-2 pb-8">
        {contacts
          .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((chat) => (
            <button key={chat.id} type="button" onClick={() => setActiveChat(chat.id)} className="flex w-full items-center gap-3 rounded-[18px] bg-secondary/40 backdrop-blur-xl px-4 py-3.5 text-left transition-colors hover:bg-secondary/60 border border-border/20">
              <div className="relative shrink-0">
                <img src={chat.avatar} alt={chat.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-border/20" />
                {chat.online && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background" />}
              </div>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-bold text-foreground">{chat.name}</span>
                  {chat.unread > 0 && (
                    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">{chat.unread}</span>
                  )}
                </span>
                <span className="mt-0.5 block truncate text-[12px] text-muted-foreground">{chat.snippet}</span>
              </span>
            </button>
          ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Messages;
