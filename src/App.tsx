import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import VendorProfile from "./pages/VendorProfile.tsx";
import StoryViewer from "./pages/StoryViewer.tsx";
import Search from "./pages/Search.tsx";
import Cart from "./pages/Cart.tsx";
import Messages from "./pages/Messages.tsx";
import NotFound from "./pages/NotFound.tsx";
import Profile from "./pages/Profile.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import CreatePost from "./pages/CreatePost.tsx";
import CustomerProfile from "./pages/CustomerProfile.tsx";
import MyOrders from "./pages/MyOrders.tsx";
import OrderTracking from "./pages/OrderTracking.tsx";
import Following from "./pages/Following.tsx";
import Notifications from "./pages/Notifications.tsx";
import Returns from "./pages/Returns.tsx";
import Settings from "./pages/Settings.tsx";
import CreateReview from "./pages/CreateReview.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vendor/:id" element={<VendorProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/story/:id" element={<StoryViewer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/customer/:id" element={<CustomerProfile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/order-tracking/:id" element={<OrderTracking />} />
          <Route path="/following" element={<Following />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create-review/:orderId" element={<CreateReview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
