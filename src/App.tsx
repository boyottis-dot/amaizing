import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "@/components/PageTransition";
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
import PersonalDetails from "./pages/settings/PersonalDetails.tsx";
import SavedAddresses from "./pages/settings/SavedAddresses.tsx";
import LocationMode from "./pages/settings/LocationMode.tsx";
import NotificationPreferences from "./pages/settings/NotificationPreferences.tsx";
import PaymentMethods from "./pages/settings/PaymentMethods.tsx";
import GiftCards from "./pages/settings/GiftCards.tsx";
import PrivacySettings from "./pages/settings/PrivacySettings.tsx";
import HelpSupport from "./pages/settings/HelpSupport.tsx";

const queryClient = new QueryClient();

const P = ({ children }: { children: React.ReactNode }) => (
  <PageTransition>{children}</PageTransition>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<P><Index /></P>} />
        <Route path="/vendor/:id" element={<P><VendorProfile /></P>} />
        <Route path="/search" element={<P><Search /></P>} />
        <Route path="/cart" element={<P><Cart /></P>} />
        <Route path="/messages" element={<P><Messages /></P>} />
        <Route path="/story/:id" element={<P><StoryViewer /></P>} />
        <Route path="/profile" element={<P><Profile /></P>} />
        <Route path="/wishlist" element={<P><Wishlist /></P>} />
        <Route path="/create-post" element={<P><CreatePost /></P>} />
        <Route path="/customer/:id" element={<P><CustomerProfile /></P>} />
        <Route path="/my-orders" element={<P><MyOrders /></P>} />
        <Route path="/order-tracking/:id" element={<P><OrderTracking /></P>} />
        <Route path="/following" element={<P><Following /></P>} />
        <Route path="/notifications" element={<P><Notifications /></P>} />
        <Route path="/returns" element={<P><Returns /></P>} />
        <Route path="/settings" element={<P><Settings /></P>} />
        <Route path="/settings/personal-details" element={<P><PersonalDetails /></P>} />
        <Route path="/settings/saved-addresses" element={<P><SavedAddresses /></P>} />
        <Route path="/settings/location-mode" element={<P><LocationMode /></P>} />
        <Route path="/settings/notifications" element={<P><NotificationPreferences /></P>} />
        <Route path="/settings/payment-methods" element={<P><PaymentMethods /></P>} />
        <Route path="/settings/gift-cards" element={<P><GiftCards /></P>} />
        <Route path="/settings/privacy" element={<P><PrivacySettings /></P>} />
        <Route path="/settings/help" element={<P><HelpSupport /></P>} />
        <Route path="/create-review/:orderId" element={<P><CreateReview /></P>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<P><NotFound /></P>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
