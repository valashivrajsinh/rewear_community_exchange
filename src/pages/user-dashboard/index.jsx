import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import UserProfileCard from './components/UserProfileCard';
import QuickStatsRow from './components/QuickStatsRow';
import TabNavigation from './components/TabNavigation';
import MyItemsTab from './components/MyItemsTab';
import ActiveSwapsTab from './components/ActiveSwapsTab';
import SwapHistoryTab from './components/SwapHistoryTab';
import FavoritesTab from './components/FavoritesTab';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-items');

  // Mock user data
  const userData = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    memberSince: "March 2023",
    location: "San Francisco, CA",
    points: 1250,
    rating: 5,
    reviewCount: 47,
    verified: true
  };

  // Mock stats data
  const statsData = {
    totalSwaps: 23,
    itemsListed: 15,
    rating: 4.8,
    pointsEarned: 2840
  };

  // Mock items data
  const myItemsData = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      description: "Classic blue denim jacket from the 90s. Perfect condition with minimal wear. Great for layering in spring and fall.",
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
      description: "Beautiful floral print dress perfect for summer occasions. Lightweight fabric with comfortable fit.",
      category: "Dresses",
      size: "S",
      condition: "Good",
      status: "pending",
      images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop"],
      views: 89,
      likes: 12,
      featured: false,
      createdAt: "2025-01-08"
    },
    {
      id: 3,
      title: "Black Leather Boots",
      description: "Stylish black leather ankle boots. Comfortable for all-day wear with a slight heel.",
      category: "Shoes",
      size: "8",
      condition: "Very Good",
      status: "swapped",
      images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop"],
      views: 67,
      likes: 9,
      featured: false,
      createdAt: "2025-01-05"
    }
  ];

  // Mock active swaps data
  const activeSwapsData = [
    {
      id: 1,
      status: "pending",
      type: "incoming",
      createdAt: "2 hours ago",
      yourItem: {
        id: 1,
        title: "Vintage Denim Jacket",
        category: "Jackets",
        size: "M",
        points: 150,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop"
      },
      theirItem: {
        id: 15,
        title: "Silk Scarf Collection",
        category: "Accessories",
        size: "One Size",
        points: 120,
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop"
      },
      otherUser: {
        id: 25,
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        location: "Oakland, CA"
      }
    },
    {
      id: 2,
      status: "accepted",
      type: "outgoing",
      createdAt: "1 day ago",
      yourItem: {
        id: 2,
        title: "Floral Summer Dress",
        category: "Dresses",
        size: "S",
        points: 180,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop"
      },
      theirItem: {
        id: 22,
        title: "Designer Handbag",
        category: "Bags",
        size: "Medium",
        points: 200,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop"
      },
      otherUser: {
        id: 31,
        name: "Jessica Chen",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        rating: 4.7,
        location: "Berkeley, CA"
      }
    }
  ];

  // Mock swap history data
  const swapHistoryData = [
    {
      id: 1,
      status: "completed",
      completedAt: "Dec 15, 2024",
      yourItem: {
        id: 10,
        title: "Winter Wool Coat",
        category: "Coats",
        size: "M",
        points: 250,
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=100&h=100&fit=crop"
      },
      theirItem: {
        id: 18,
        title: "Cashmere Sweater",
        category: "Sweaters",
        size: "M",
        points: 220,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop"
      },
      otherUser: {
        id: 42,
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 4.8
      },
      yourRating: 5,
      totalSwaps: 12
    },
    {
      id: 2,
      status: "completed",
      completedAt: "Nov 28, 2024",
      yourItem: {
        id: 11,
        title: "Running Sneakers",
        category: "Shoes",
        size: "8",
        points: 120,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop"
      },
      theirItem: {
        id: 19,
        title: "Yoga Leggings",
        category: "Activewear",
        size: "S",
        points: 100,
        image: "https://images.unsplash.com/photo-1506629905607-c28b47d3e6b7?w=100&h=100&fit=crop"
      },
      otherUser: {
        id: 38,
        name: "Lisa Rodriguez",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
        rating: 4.6
      },
      yourRating: 4,
      totalSwaps: 8
    }
  ];

  // Mock favorites data
  const favoritesData = [
    {
      id: 20,
      title: "Vintage Band T-Shirt",
      description: "Authentic vintage band tee from the 80s. Soft cotton with classic graphics.",
      category: "T-Shirts",
      size: "M",
      condition: "Good",
      status: "available",
      points: 80,
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"],
      owner: {
        id: 45,
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.9
      },
      savedAt: "Jan 8, 2025",
      newUpdate: false
    },
    {
      id: 21,
      title: "Designer Sunglasses",
      description: "Luxury designer sunglasses with UV protection. Comes with original case.",
      category: "Accessories",
      size: "One Size",
      condition: "Excellent",
      status: "unavailable",
      points: 200,
      images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop"],
      owner: {
        id: 52,
        name: "Rachel Green",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        rating: 4.7
      },
      savedAt: "Jan 6, 2025",
      newUpdate: true
    }
  ];

  // Tab configuration
  const tabs = [
    {
      id: 'my-items',
      label: 'My Items',
      icon: 'Package',
      badge: myItemsData.filter(item => item.status === 'available').length
    },
    {
      id: 'active-swaps',
      label: 'Active Swaps',
      icon: 'ArrowLeftRight',
      badge: activeSwapsData.length
    },
    {
      id: 'swap-history',
      label: 'History',
      icon: 'History'
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: 'Heart',
      badge: favoritesData.length
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'my-items':
        return <MyItemsTab items={myItemsData} />;
      case 'active-swaps':
        return <ActiveSwapsTab swaps={activeSwapsData} />;
      case 'swap-history':
        return <SwapHistoryTab history={swapHistoryData} />;
      case 'favorites':
        return <FavoritesTab favorites={favoritesData} />;
      default:
        return <MyItemsTab items={myItemsData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-16 pb-20 lg:pb-6 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* User Profile Section */}
          <div className="mb-6">
            <UserProfileCard user={userData} />
          </div>
          
          {/* Quick Stats */}
          <div className="mb-6">
            <QuickStatsRow stats={statsData} />
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
      
      <BottomTabNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default UserDashboard;