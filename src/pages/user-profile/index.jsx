import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import TabNavigation from './components/TabNavigation';
import AboutTab from './components/AboutTab';
import ItemsTab from './components/ItemsTab';
import ReviewsTab from './components/ReviewsTab';
import ActivityTab from './components/ActivityTab';
import SettingsModal from './components/SettingsModal';
import EditProfileModal from './components/EditProfileModal';

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Mock user data - in real app this would come from context/props/API
  const userData = {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarah_rewear",
    email: "sarah.johnson@email.com",
    bio: "Passionate about sustainable fashion and conscious living. Love finding new homes for beautiful pieces and discovering unique treasures from fellow community members.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop",
    memberSince: "March 2023",
    location: "San Francisco, CA",
    points: 1250,
    rating: 4.8,
    reviewCount: 47,
    verified: true,
    interests: ["Vintage Fashion", "Sustainable Living", "Designer Pieces", "Bohemian Style"],
    preferredCategories: ["Dresses", "Jackets", "Accessories", "Shoes"],
    swapPreferences: {
      willingToShip: true,
      localMeetups: true,
      preferredDistance: "25 miles",
      responseTime: "Within 24 hours"
    },
    privacy: {
      showEmail: false,
      showLocation: true,
      showActivity: true,
      allowMessages: true
    }
  };

  // Mock stats data
  const statsData = {
    totalSwaps: 34,
    itemsListed: 28,
    communityRating: 4.8,
    sustainabilityImpact: "127 items saved from waste"
  };

  // Mock user items
  const userItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      description: "Classic blue denim jacket from the 90s",
      category: "Jackets",
      size: "M",
      condition: "Excellent",
      status: "available",
      images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop"],
      views: 124,
      likes: 18,
      featured: true,
      createdAt: "2025-01-10"
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      description: "Beautiful floral print dress perfect for summer",
      category: "Dresses",
      size: "S",
      condition: "Good",
      status: "pending",
      images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop"],
      views: 89,
      likes: 12,
      featured: false,
      createdAt: "2025-01-08"
    }
  ];

  // Mock reviews
  const userReviews = [
    {
      id: 1,
      fromUser: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Amazing swap experience! Sarah\'s item was exactly as described and in perfect condition.",
      swapItem: "Vintage Silk Scarf",
      date: "Jan 8, 2025",
      type: "received"
    },
    {
      id: 2,
      fromUser: {
        name: "Jessica Chen",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Great communication and fast shipping. Highly recommend!",
      swapItem: "Designer Handbag",
      date: "Dec 28, 2024",
      type: "received"
    }
  ];

  // Mock activity feed
  const activityData = [
    {
      id: 1,
      type: "swap_completed",
      description: "Completed swap with Emma Wilson",
      item: {
        title: "Vintage Denim Jacket",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop"
      },
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "item_listed",
      description: "Listed new item for swap",
      item: {
        title: "Floral Summer Dress",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop"
      },
      timestamp: "1 day ago"
    },
    {
      id: 3,
      type: "review_received",
      description: "Received 5-star review from Jessica Chen",
      timestamp: "3 days ago"
    }
  ];

  // Tab configuration
  const tabs = [
    {
      id: 'about',
      label: 'About',
      icon: 'User'
    },
    {
      id: 'items',
      label: 'Items',
      icon: 'Package',
      badge: userItems.filter(item => item.status === 'available').length
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: 'Star',
      badge: userReviews.length
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: 'Clock'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutTab user={userData} />;
      case 'items':
        return <ItemsTab items={userItems} />;
      case 'reviews':
        return <ReviewsTab reviews={userReviews} />;
      case 'activity':
        return <ActivityTab activities={activityData} />;
      default:
        return <AboutTab user={userData} />;
    }
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleShareProfile = () => {
    // Handle sharing profile
    console.log('Share profile');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-16 pb-20 lg:pb-6 lg:pl-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Profile Header */}
          <div className="mb-6">
            <ProfileHeader 
              user={userData}
              onEdit={handleEditProfile}
              onSettings={handleSettings}
              onShare={handleShareProfile}
            />
          </div>
          
          {/* Profile Stats */}
          <div className="mb-6">
            <ProfileStats stats={statsData} />
          </div>
          
          {/* Tab Navigation */}
          <div className="mb-6">
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={tabs}
            />
          </div>
          
          {/* Tab Content */}
          <div className="min-h-[400px]">
            {renderTabContent()}
          </div>
        </div>
      </main>
      
      {/* Modals */}
      {showSettings && (
        <SettingsModal
          user={userData}
          onClose={() => setShowSettings(false)}
        />
      )}
      
      {showEditProfile && (
        <EditProfileModal
          user={userData}
          onClose={() => setShowEditProfile(false)}
        />
      )}
      
      <BottomTabNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default UserProfile;