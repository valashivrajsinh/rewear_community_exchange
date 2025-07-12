import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const getPageTitle = () => {
    const titles = {
      '/homepage-landing': 'ReWear Community',
      '/browse-items': 'Browse Items',
      '/item-detail': 'Item Details',
      '/user-dashboard': 'My Dashboard',
      '/add-edit-item': 'Add Item',
      '/swap-management': 'Swap Management'
    };
    return titles[location.pathname] || 'ReWear Community';
  };

  const showBackButton = () => {
    return !['/homepage-landing', '/browse-items', '/user-dashboard', '/swap-management'].includes(location.pathname);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse-items?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  const handleNotifications = () => {
    // Handle notifications
    console.log('Show notifications');
  };

  const handleProfile = () => {
    navigate('/user-dashboard');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-200">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {showBackButton() ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="lg:hidden"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Recycle" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-lg text-primary hidden sm:block">
                ReWear
              </span>
            </div>
          )}
          
          <h1 className="font-heading font-semibold text-lg text-foreground">
            {getPageTitle()}
          </h1>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Points Display */}
          <div className="hidden sm:flex items-center space-x-1 bg-success/10 px-3 py-1 rounded-full">
            <Icon name="Coins" size={16} color="var(--color-success)" />
            <span className="font-mono text-sm font-medium text-success">1,250</span>
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden"
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotifications}
            className="relative"
          >
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Profile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfile}
          >
            <Icon name="User" size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="md:hidden px-4 pb-4 bg-background border-b border-border">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;