import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import HeroSection from './components/HeroSection';
import FeaturedItemsCarousel from './components/FeaturedItemsCarousel';
import CommunityStats from './components/CommunityStats';
import RecentActivity from './components/RecentActivity';
import CategoryGrid from './components/CategoryGrid';
import Footer from './components/Footer';

const HomepageLanding = () => {
  useEffect(() => {
    // Set page title
    document.title = 'ReWear Community - Sustainable Fashion Exchange';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 pb-20 lg:pb-6">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Items Carousel */}
        <FeaturedItemsCarousel />

        {/* Community Stats */}
        <CommunityStats />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Recent Activity */}
        <RecentActivity />

        {/* Footer */}
        <Footer />
      </main>

      {/* Bottom Tab Navigation for mobile */}
      <BottomTabNavigation />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default HomepageLanding;