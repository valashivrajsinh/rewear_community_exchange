import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterChip from './components/FilterChip';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';

import DesktopFilters from './components/DesktopFilters';
import ItemGrid from './components/ItemGrid';

const BrowseItems = () => {
  const location = useLocation();
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    conditions: [],
    pointRange: [0, 500],
    distance: 25
  });

  // Mock data for items
  const mockItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket - Classic Blue",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      points: 120,
      size: "M",
      condition: "good",
      owner: "Emma Wilson",
      distance: 2.3,
      status: "new",
      isFavorited: false
    },
    {
      id: 2,
      title: "Floral Summer Dress - Perfect for Events",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      points: 85,
      size: "S",
      condition: "new",
      owner: "Sarah Chen",
      distance: 1.8,
      status: "urgent",
      isFavorited: true
    },
    {
      id: 3,
      title: "Black Leather Boots - Barely Worn",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      points: 150,
      size: "8",
      condition: "new",
      owner: "Mike Johnson",
      distance: 4.2,
      status: "available",
      isFavorited: false
    },
    {
      id: 4,
      title: "Cozy Wool Sweater - Winter Essential",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
      points: 95,
      size: "L",
      condition: "good",
      owner: "Lisa Park",
      distance: 3.1,
      status: "available",
      isFavorited: false
    },
    {
      id: 5,
      title: "Designer Handbag - Authentic Leather",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      points: 200,
      size: "One Size",
      condition: "fair",
      owner: "Anna Rodriguez",
      distance: 5.7,
      status: "available",
      isFavorited: true
    },
    {
      id: 6,
      title: "Casual White Sneakers - Clean & Fresh",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      points: 75,
      size: "9",
      condition: "good",
      owner: "David Kim",
      distance: 2.9,
      status: "new",
      isFavorited: false
    },
    {
      id: 7,
      title: "Elegant Black Blazer - Professional Look",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      points: 110,
      size: "M",
      condition: "new",
      owner: "Rachel Green",
      distance: 1.5,
      status: "available",
      isFavorited: false
    },
    {
      id: 8,
      title: "Vintage Band T-Shirt - Rare Find",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      points: 65,
      size: "L",
      condition: "fair",
      owner: "Tom Wilson",
      distance: 6.2,
      status: "urgent",
      isFavorited: false
    }
  ];

  const [items, setItems] = useState(mockItems);

  // Get search query from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    
    if (searchQuery) {
      // Filter items based on search query
      const filteredItems = mockItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setItems(filteredItems);
    } else {
      setItems(mockItems);
    }
  }, [location.search]);

  const getActiveFilters = () => {
    const activeFilters = [];
    
    if (filters.categories.length > 0) {
      filters.categories.forEach(category => {
        const categoryLabels = {
          'tops': 'Tops',
          'bottoms': 'Bottoms',
          'dresses': 'Dresses',
          'outerwear': 'Outerwear',
          'shoes': 'Shoes',
          'accessories': 'Accessories'
        };
        activeFilters.push({
          type: 'category',
          value: category,
          label: categoryLabels[category]
        });
      });
    }
    
    if (filters.sizes.length > 0) {
      filters.sizes.forEach(size => {
        activeFilters.push({
          type: 'size',
          value: size,
          label: `Size ${size}`
        });
      });
    }
    
    if (filters.conditions.length > 0) {
      filters.conditions.forEach(condition => {
        const conditionLabels = {
          'new': 'Like New',
          'good': 'Good',
          'fair': 'Fair'
        };
        activeFilters.push({
          type: 'condition',
          value: condition,
          label: conditionLabels[condition]
        });
      });
    }
    
    if (filters.pointRange[1] < 500) {
      activeFilters.push({
        type: 'points',
        value: 'points',
        label: `Up to ${filters.pointRange[1]} pts`
      });
    }
    
    if (filters.distance < 100) {
      activeFilters.push({
        type: 'distance',
        value: 'distance',
        label: `Within ${filters.distance}mi`
      });
    }
    
    return activeFilters;
  };

  const removeFilter = (filterToRemove) => {
    const newFilters = { ...filters };
    
    switch (filterToRemove.type) {
      case 'category':
        newFilters.categories = newFilters.categories.filter(c => c !== filterToRemove.value);
        break;
      case 'size':
        newFilters.sizes = newFilters.sizes.filter(s => s !== filterToRemove.value);
        break;
      case 'condition':
        newFilters.conditions = newFilters.conditions.filter(c => c !== filterToRemove.value);
        break;
      case 'points':
        newFilters.pointRange = [0, 500];
        break;
      case 'distance':
        newFilters.distance = 100;
        break;
    }
    
    setFilters(newFilters);
  };

  const handlePullToRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="hidden lg:flex pt-16">
        {/* Desktop Filters Sidebar */}
        <DesktopFilters filters={filters} onFiltersChange={setFilters} />
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading font-semibold text-2xl text-foreground">
                Browse Items
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover amazing clothing from your community
              </p>
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map((filter, index) => (
                <FilterChip
                  key={`${filter.type}-${filter.value}-${index}`}
                  label={filter.label}
                  onRemove={() => removeFilter(filter)}
                />
              ))}
            </div>
          )}

          {/* Items Grid */}
          <ItemGrid items={items} loading={loading} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden pt-16 pb-20">
        {/* Mobile Controls */}
        <div className="sticky top-16 bg-background border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilterPanel(true)}
                iconName="Filter"
                iconPosition="left"
              >
                Filters
                {activeFilters.length > 0 && (
                  <span className="ml-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <FilterChip
                    key={`${filter.type}-${filter.value}-${index}`}
                    label={filter.label}
                    onRemove={() => removeFilter(filter)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pull to Refresh */}
        <div className="p-4">
          {refreshing && (
            <div className="flex items-center justify-center py-4">
              <Icon name="RotateCw" size={20} className="animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Refreshing...</span>
            </div>
          )}

          {/* Items Grid */}
          <ItemGrid items={items} loading={loading} />
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
};

export default BrowseItems;