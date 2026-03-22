import { Paperclip } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const CommentBar = () => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    toast({ title: "Comment posted!", description: value.trim() });
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 mt-3">
      <img src="https://i.pravatar.cc/32?img=3" alt="You" className="w-8 h-8 rounded-full object-cover shrink-0" />
      <div className="flex-1 flex items-center bg-secondary/10 border border-border/20 rounded-full px-3 py-1.5">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Write a comment..."
          className="flex-1 bg-transparent text-xs text-card-foreground placeholder:text-muted-foreground outline-none"
        />
        <div className="flex items-center gap-2 ml-2">
          <Paperclip size={14} className="text-muted-foreground" />
          <span className="text-xs font-semibold text-muted-foreground">GIF</span>
        </div>
      </div>
    </div>
  );
};

export default CommentBar;
