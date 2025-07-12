import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FeaturedItemsCarousel = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop",
      user: "Emma Wilson",
      userAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 4.8,
      reviews: 24,
      points: 450,
      category: "Outerwear",
      size: "M",
      condition: "Excellent",
      location: "Brooklyn, NY",
      isNew: true
    },
    {
      id: 2,
      title: "Designer Summer Dress",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
      user: "Sofia Martinez",
      userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4.9,
      reviews: 18,
      points: 380,
      category: "Dresses",
      size: "S",
      condition: "Like New",
      location: "Los Angeles, CA",
      isNew: false
    },
    {
      id: 3,
      title: "Classic Denim Jeans",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop",
      user: "Michael Chen",
      userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 4.7,
      reviews: 31,
      points: 280,
      category: "Bottoms",
      size: "32",
      condition: "Good",
      location: "Chicago, IL",
      isNew: false
    },
    {
      id: 4,
      title: "Silk Blouse",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
      user: "Rachel Green",
      userAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4.6,
      reviews: 15,
      points: 320,
      category: "Tops",
      size: "M",
      condition: "Excellent",
      location: "Miami, FL",
      isNew: true
    },
    {
      id: 5,
      title: "Wool Winter Coat",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop",
      user: "David Kim",
      userAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4.8,
      reviews: 22,
      points: 520,
      category: "Outerwear",
      size: "L",
      condition: "Like New",
      location: "Seattle, WA",
      isNew: false
    },
    {
      id: 6,
      title: "Casual Sneakers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
      user: "Alex Johnson",
      userAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 4.5,
      reviews: 28,
      points: 200,
      category: "Shoes",
      size: "9",
      condition: "Good",
      location: "Austin, TX",
      isNew: false
    }
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setCurrentIndex(Math.max(0, currentIndex - 1));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentIndex(Math.min(featuredItems.length - 1, currentIndex + 1));
    }
  };

  const handleItemClick = (item) => {
    navigate('/item-detail', { state: { item } });
  };

  const handleQuickSwap = (e, item) => {
    e.stopPropagation();
    navigate('/swap-management', { state: { requestItem: item } });
  };

  const handleQuickView = (e, item) => {
    e.stopPropagation();
    // Quick view modal would open here
    console.log('Quick view:', item);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
              Featured Items
            </h2>
            <p className="text-muted-foreground">
              Discover the most popular items in our community
            </p>
          </div>
          
          <div className="hidden sm:flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={currentIndex >= featuredItems.length - 1}
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 swipe-container"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="flex-none w-72 bg-card rounded-xl border border-border shadow-soft hover:shadow-soft-hover transition-all duration-300 cursor-pointer group swipe-item"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {item.isNew && (
                      <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                        New
                      </span>
                    )}
                    <span className="bg-background/90 text-foreground px-2 py-1 rounded-full text-xs font-medium">
                      {item.condition}
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleQuickView(e, item)}
                      className="w-8 h-8 bg-background/90 hover:bg-background"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleQuickSwap(e, item)}
                      className="w-8 h-8 bg-background/90 hover:bg-background"
                    >
                      <Icon name="ArrowLeftRight" size={16} />
                    </Button>
                  </div>

                  {/* Points Badge */}
                  <div className="absolute bottom-3 right-3 bg-primary text-white px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Icon name="Coins" size={14} />
                      <span className="font-mono text-sm font-medium">{item.points}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Title and Category */}
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.category} • Size {item.size}
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    <Image
                      src={item.userAvatar}
                      alt={item.user}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">
                        {item.user}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} color="var(--color-warning)" />
                      <span className="font-medium text-sm text-foreground">
                        {item.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({item.reviews})
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="MapPin" size={14} />
                      <span className="text-xs font-medium">Local</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6 sm:hidden">
            {Array.from({ length: Math.ceil(featuredItems.length / 2) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  Math.floor(currentIndex / 2) === index
                    ? 'bg-primary' :'bg-border'
                }`}
                onClick={() => {
                  const targetIndex = index * 2;
                  setCurrentIndex(targetIndex);
                  scrollRef.current?.scrollTo({
                    left: targetIndex * 320,
                    behavior: 'smooth'
                  });
                }}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/browse-items')}
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All Items
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItemsCarousel;