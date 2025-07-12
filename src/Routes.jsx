import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomepageLanding from "pages/homepage-landing";
import BrowseItems from "pages/browse-items";
import ItemDetail from "pages/item-detail";
import AddEditItem from "pages/add-edit-item";
import UserDashboard from "pages/user-dashboard";
import SwapManagement from "pages/swap-management";
import UserProfile from "pages/user-profile";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomepageLanding />} />
        <Route path="/homepage-landing" element={<HomepageLanding />} />
        <Route path="/browse-items" element={<BrowseItems />} />
        <Route path="/item-detail" element={<ItemDetail />} />
        <Route path="/add-edit-item" element={<AddEditItem />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/swap-management" element={<SwapManagement />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;