import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import ImageGallery from './components/ImageGallery';
import ItemInfo from './components/ItemInfo';
import UserProfile from './components/UserProfile';
import ActionButtons from './components/ActionButtons';
import SimilarItems from './components/SimilarItems';
import CommentsSection from './components/CommentsSection';
import SwapHistory from './components/SwapHistory';

const ItemDetail = () => {
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('id') || '1';
  const [item, setItem] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock item data
  const mockItem = {
    id: itemId,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    type: "Jacket",
    size: "Medium",
    condition: "Very Good",
    description: `This vintage denim jacket is a timeless piece that never goes out of style. Made from high-quality cotton denim with a classic fit, it features authentic distressing and fading that gives it character.\n\nThe jacket has been well-maintained and shows minimal signs of wear. Perfect for layering over t-shirts or dresses. The medium size fits true to size with a slightly relaxed fit.\n\nOriginally purchased from a boutique vintage store, this piece would make a great addition to any wardrobe. Smoke-free home.`,
    points: 150,
    status: "available",
    tags: ["vintage", "denim", "classic", "unisex", "layering"],
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=800&fit=crop"
    ],
    user: {
      id: "user123",
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      location: "Brooklyn, NY",
      distance: "2.3 miles",
      rating: 4.8,
      reviewCount: 47,
      verified: true,
      itemsListed: 23,
      successfulSwaps: 18,
      points: 2450,
      memberSince: "March 2023"
    }
  };

  const mockSimilarItems = [
    {
      id: "2",
      title: "Classic Blue Jeans",
      category: "Bottoms",
      size: "M",
      status: "available",
      points: 120,
      distance: "1.8 mi",
      images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"]
    },
    {
      id: "3",
      title: "Leather Boots",
      category: "Footwear",
      size: "8",
      status: "pending",
      points: 200,
      distance: "3.1 mi",
      images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"]
    },
    {
      id: "4",
      title: "Cotton T-Shirt",
      category: "Tops",
      size: "M",
      status: "available",
      points: 80,
      distance: "0.9 mi",
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"]
    },
    {
      id: "5",
      title: "Summer Dress",
      category: "Dresses",
      size: "S",
      status: "available",
      points: 180,
      distance: "2.7 mi",
      images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop"]
    }
  ];

  const mockComments = [
    {
      id: 1,
      user: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      content: "Hi! Does this jacket run true to size? I\'m usually between a small and medium.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      replies: [
        {
          id: 11,
          user: {
            name: "Emma Rodriguez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          },
          content: "Hi Alex! It fits true to size with a slightly relaxed fit. If you're between sizes, I'd recommend going with the medium for a comfortable fit.",
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "Maya Patel",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      content: "Love this jacket! Are you open to trading for a similar vintage piece in a different color?",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      replies: []
    }
  ];

  const mockSwapHistory = [
    {
      id: 1,
      type: "swap",
      date: "2024-06-15",
      fromUser: {
        name: "Jessica Kim",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      toUser: {
        name: "Emma Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      exchangedItem: "Vintage Band T-Shirt",
      rating: 5
    },
    {
      id: 2,
      type: "points",
      date: "2024-05-20",
      fromUser: {
        name: "Michael Torres",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      toUser: {
        name: "Previous Owner",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
      },
      pointsUsed: 140,
      rating: 4
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setItem(mockItem);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [itemId]);

  const handleSwapRequest = async () => {
    console.log('Swap request sent for item:', item.id);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleRedeemPoints = async () => {
    console.log('Redeeming item with points:', item.points);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    console.log('Favorite toggled:', !isFavorited);
  };

  const handleAddComment = (comment) => {
    console.log('New comment added:', comment);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="lg:ml-64 pt-16 pb-20 lg:pb-6">
          <div className="animate-pulse">
            {/* Image Gallery Skeleton */}
            <div className="aspect-square lg:aspect-[4/3] bg-muted" />
            
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Item Info Skeleton */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
                
                {/* Sidebar Skeleton */}
                <div className="space-y-6">
                  <div className="h-32 bg-muted rounded" />
                  <div className="h-24 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <BottomTabNavigation />
        <FloatingActionButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16 pb-20 lg:pb-6">
        {/* Image Gallery */}
        <ImageGallery images={item.images} itemTitle={item.title} />
        
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Item Information */}
              <ItemInfo item={item} />
              
              {/* Similar Items */}
              <SimilarItems items={mockSimilarItems} />
              
              {/* Comments Section */}
              <CommentsSection 
                comments={mockComments} 
                onAddComment={handleAddComment} 
              />
              
              {/* Swap History */}
              <SwapHistory swaps={mockSwapHistory} />
            </div>
            
            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* User Profile */}
              <UserProfile user={item.user} />
              
              {/* Action Buttons */}
              <div className="sticky top-24">
                <ActionButtons
                  item={item}
                  onSwapRequest={handleSwapRequest}
                  onRedeemPoints={handleRedeemPoints}
                  onFavorite={handleFavorite}
                  isFavorited={isFavorited}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BottomTabNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default ItemDetail;