

# Design Audit: What's Still Missing

After reviewing every component and page, here are the remaining design gaps -- focused purely on improving what already exists.

---

## 1. No Story Ring Indicators
Stories in `StoriesRow.tsx` have no colored border ring to distinguish unwatched from watched. Every social commerce app uses this cue. Without it, all stories look the same.

**Fix**: Add a gradient ring (amber-rose-purple) around unwatched story cards. "Your Story" keeps its current plus-icon style without a ring.

## 2. No Notification Bell on Home
The Header only has Search and Cart icons. There's no way to reach Notifications from the home page without going through Profile > My Orders flow. Users miss alerts.

**Fix**: Add a Bell icon with unread badge to the fixed header icon group, between Search and Cart.

## 3. Cart Badge is Hardcoded
Both Header and Search page show a static "3" badge on the cart icon. Adding/removing items in Cart.tsx has zero effect.

**Fix**: Create a `CartContext` provider so the badge count syncs globally across Header, Search, and Cart pages.

## 4. "View All" Buttons Are Dead
Every section header (Quick Picks, Collections, Near You, Popular People, Pick Your Vibe) has a "View All" button with no `onClick`. Tapping does nothing.

**Fix**: Wire each to navigate to `/search` with a category query param (e.g., `/search?category=collections`).

## 5. FlashSaleSection Exists But Is Unused
`FlashSaleSection.tsx` is a fully built component with countdown timer and product cards, but it's never rendered on any page.

**Fix**: Insert it into the Index page between existing sections for visual variety and urgency.

## 6. Vendor Profile Ignores Route Params
Every `/vendor/:id` route shows the same "Katty Abrahams" data. The `:id` param is never read.

**Fix**: Read the param and use a vendor data map to show different names, avatars, and stats per vendor.

## 7. Messages and Wishlist Have No BottomNav
Both pages are navigation dead-ends. Users must use the browser back button to leave.

**Fix**: Add `<BottomNav />` to both `Messages.tsx` (list view only) and `Wishlist.tsx`.

## 8. PostDetailDialog Has No Entry Animation
The dialog uses `animate-fade-in` which may not be in the Tailwind config, causing an abrupt pop-in.

**Fix**: Add a proper slide-up + fade animation using framer-motion or a defined Tailwind keyframe.

## 9. No Dark Mode Toggle
CSS defines both light and dark themes but there's no UI control. Users are stuck on system default.

**Fix**: Add a dark mode toggle switch to the Settings page with a `ThemeContext` that applies/removes the `dark` class on `<html>`.

## 10. Comment Bar on Home Feed Posts Is Non-Functional
The `CommentBar` below each `FeaturedPostCard` accepts text input but pressing enter does nothing. No submit handler.

**Fix**: Either make it open the `PostDetailDialog` comments section on focus/tap, or add a toast "Comment posted!" interaction.

## 11. Search Page Category Filters Don't Filter
Clicking category pills on the Search page toggles visual state but the displayed products never change.

**Fix**: Filter the product arrays based on `activeFilter` state so the UI actually responds.

## 12. No Empty/Loading States
Product grids, carousels, and vendor rows show no skeleton loaders while images load. First paint shows blank squares until images arrive.

**Fix**: Add skeleton placeholders (using existing `Skeleton` component from `ui/skeleton.tsx`) to ProductGrid, NearYouRow, and carousels.

---

## Implementation Order

| Priority | Items | Effort |
|----------|-------|--------|
| High | 1 (story rings), 2 (bell icon), 3 (cart context), 7 (BottomNav) | Small each |
| Medium | 4 (View All), 5 (FlashSale), 6 (vendor params), 8 (dialog animation) | Small-medium |
| Lower | 9 (dark mode), 10 (comment bar), 11 (filter logic), 12 (skeletons) | Medium each |

All changes are polish/fixes to existing components. No new pages needed.

