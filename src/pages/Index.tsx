import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import StoriesRow from "@/components/StoriesRow";
import CategoryPills from "@/components/CategoryPills";
import TrendingVendorsRow from "@/components/TrendingVendorsRow";
import ProductGrid from "@/components/ProductGrid";

import CollectionsRow from "@/components/CollectionsRow";
import FlashSaleSection from "@/components/FlashSaleSection";

import StackedCards from "@/components/StackedCards";
import PostDetailDialog, { PostDetailData } from "@/components/PostDetailDialog";

const postsGrid1 = [
  { id: 1, name: "Silk Dress", handle: "@amara.style", price: "$89", image: "https://picsum.photos/seed/p1/400/400", avatar: "https://i.pravatar.cc/40?img=32" },
  { id: 2, name: "Gold Necklace", handle: "@lina.jewels", price: "$120", image: "https://picsum.photos/seed/p2/400/400", avatar: "https://i.pravatar.cc/40?img=9" },
  { id: 3, name: "Leather Bag", handle: "@kofi.craft", price: "$65", image: "https://picsum.photos/seed/p3/400/400", avatar: "https://i.pravatar.cc/40?img=15" },
  { id: 4, name: "Sunglasses", handle: "@marco.optics", price: "$45", image: "https://picsum.photos/seed/p4/400/400", avatar: "https://i.pravatar.cc/40?img=12" },
];

const postsGrid2 = [
  { id: 5, name: "Skincare Set", handle: "@sofia.glow", price: "$55", image: "https://picsum.photos/seed/p5/400/400", avatar: "https://i.pravatar.cc/40?img=25" },
  { id: 6, name: "Candle Trio", handle: "@chen.home", price: "$38", image: "https://picsum.photos/seed/p6/400/400", avatar: "https://i.pravatar.cc/40?img=33" },
  { id: 7, name: "Art Print", handle: "@priya.art", price: "$28", image: "https://picsum.photos/seed/p7/400/400", avatar: "https://i.pravatar.cc/40?img=23" },
  { id: 8, name: "Sneakers", handle: "@liam.kicks", price: "$110", image: "https://picsum.photos/seed/p8/400/400", avatar: "https://i.pravatar.cc/40?img=11" },
];

const featuredPosts: PostDetailData[] = [
  {
    image: "https://picsum.photos/seed/feat1/600/600",
    name: "Amara Okafor",
    vendorName: "Amara Okafor",
    vendorHandle: "@amara.style",
    vendorAvatar: "https://i.pravatar.cc/40?img=32",
    likes: 234,
    comments: 18,
    shares: 12,
    caption: "New collection just dropped 🔥 Handmade silk pieces inspired by West African textiles. Each piece tells a story. #handmade #fashion #africanprint",
    price: "$89",
  },
  {
    image: "https://picsum.photos/seed/rev1/600/600",
    name: "Jessica M.",
    vendorName: "Jessica M.",
    vendorHandle: "@jess.reviews",
    vendorAvatar: "https://i.pravatar.cc/40?img=44",
    likes: 56,
    comments: 7,
    shares: 3,
    caption: "Absolutely in love with this silk dress from @amara.style! The quality is incredible and it fits perfectly. Highly recommend 💕",
    price: "$89",
  },
  {
    image: "https://picsum.photos/seed/rev2/600/600",
    name: "David K.",
    vendorName: "David K.",
    vendorHandle: "@david.foodie",
    vendorAvatar: "https://i.pravatar.cc/40?img=52",
    likes: 91,
    comments: 14,
    shares: 6,
    caption: "Best ramen I've had outside of Japan! @liam.eats is a genius. The broth is SO rich. Already ordering again for next weekend 🙌",
    price: "$32",
  },
  {
    image: "https://picsum.photos/seed/feat4/600/600",
    name: "Kofi Mensah",
    vendorName: "Kofi Mensah",
    vendorHandle: "@kofi.craft",
    vendorAvatar: "https://i.pravatar.cc/40?img=15",
    likes: 145,
    comments: 22,
    shares: 17,
    caption: "Hand-stitched leather goods, made to last a lifetime 🧵 Each piece takes 3 days to craft. Limited stock available. #leather #handcraft #quality",
    price: "$65",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<PostDetailData | null>(null);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background px-4 pb-28">
      <Header />
      <StoriesRow />
      <CategoryPills />

      <div onClick={() => setSelectedPost(featuredPosts[0])} className="cursor-pointer">
        <FeaturedPostCard
          vendorName="Amara Okafor"
          vendorHandle="@amara.style"
          vendorAvatar="https://i.pravatar.cc/40?img=32"
          image="https://picsum.photos/seed/feat1/600/600"
          likes={234}
          comments={18}
          shares={12}
          caption="New collection just dropped 🔥 Handmade silk pieces inspired by West African textiles. Each piece tells a story. #handmade #fashion #africanprint"
          price="$89"
          onAvatarClick={() => navigate("/vendor/amara")}
        />
      </div>

      <FlashSaleSection />

      <ProductGrid title="Quick Picks" count={24} products={postsGrid1} />

      <div className="mt-4" onClick={() => setSelectedPost(featuredPosts[1])}>
        <div className="cursor-pointer">
          <FeaturedPostCard
            vendorName="Jessica M."
            vendorHandle="@jess.reviews"
            vendorAvatar="https://i.pravatar.cc/40?img=44"
            image="https://picsum.photos/seed/rev1/600/600"
            likes={56}
            comments={7}
            shares={3}
            caption="Absolutely in love with this silk dress from @amara.style! The quality is incredible and it fits perfectly. Highly recommend 💕"
            isReview
            rating={5}
            price="$89"
            onAvatarClick={() => navigate("/customer/jessica")}
          />
        </div>
      </div>

      <TrendingVendorsRow />
      <ProductGrid title="Posts" count={48} products={postsGrid1} />
      <CollectionsRow />
      <ProductGrid title="Trending Products" count={32} products={postsGrid2} />

      <div className="mt-4" onClick={() => setSelectedPost(featuredPosts[2])}>
        <div className="cursor-pointer">
          <FeaturedPostCard
            vendorName="David K."
            vendorHandle="@david.foodie"
            vendorAvatar="https://i.pravatar.cc/40?img=52"
            image="https://picsum.photos/seed/rev2/600/600"
            likes={91}
            comments={14}
            shares={6}
            caption="Best ramen I've had outside of Japan! @liam.eats is a genius. The broth is SO rich. Already ordering again for next weekend 🙌"
            isReview
            rating={4}
            price="$32"
            onAvatarClick={() => navigate("/customer/david")}
          />
        </div>
      </div>

      
      <StackedCards />

      <div className="mt-4" onClick={() => setSelectedPost(featuredPosts[3])}>
        <div className="cursor-pointer">
          <FeaturedPostCard
            vendorName="Kofi Mensah"
            vendorHandle="@kofi.craft"
            vendorAvatar="https://i.pravatar.cc/40?img=15"
            image="https://picsum.photos/seed/feat4/600/600"
            likes={145}
            comments={22}
            shares={17}
            caption="Hand-stitched leather goods, made to last a lifetime 🧵 Each piece takes 3 days to craft. Limited stock available. #leather #handcraft #quality"
            price="$65"
            onAvatarClick={() => navigate("/vendor/kofi")}
          />
        </div>
      </div>

      <BottomNav />

      {selectedPost && (
        <PostDetailDialog open={!!selectedPost} onClose={() => setSelectedPost(null)} post={selectedPost} />
      )}
    </div>
  );
};

export default Index;
