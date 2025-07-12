import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      icon: 'Home',
      path: '/homepage-landing',
      description: 'Community hub'
    },
    {
      label: 'Browse Items',
      icon: 'Search',
      path: '/browse-items',
      description: 'Discover clothing'
    },
    {
      label: 'My Dashboard',
      icon: 'User',
      path: '/user-dashboard',
      description: 'Personal overview'
    },
    {
      label: 'Add Item',
      icon: 'Plus',
      path: '/add-edit-item',
      description: 'List new item'
    },
    {
      label: 'Swap Management',
      icon: 'ArrowLeftRight',
      path: '/swap-management',
      description: 'Active exchanges',
      badge: 2
    }
  ];

  const quickActions = [
    {
      label: 'Messages',
      icon: 'MessageCircle',
      action: () => console.log('Open messages'),
      badge: 5
    },
    {
      label: 'Favorites',
      icon: 'Heart',
      action: () => console.log('Open favorites')
    },
    {
      label: 'Settings',
      icon: 'Settings',
      action: () => console.log('Open settings')
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/browse-items') {
      return location.pathname === '/browse-items' || location.pathname === '/item-detail';
    }
    return location.pathname === path;
  };

  return (
    <aside className="hidden lg:flex lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:w-64 lg:bg-background lg:border-r lg:border-border lg:z-100">
      <div className="flex flex-col w-full p-6">
        {/* User Profile Section */}
        <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg mb-6">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-medium text-sm text-foreground truncate">
              Sarah Johnson
            </p>
            <div className="flex items-center space-x-1">
              <Icon name="Coins" size={12} color="var(--color-success)" />
              <span className="font-mono text-xs text-success">1,250 pts</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-2 mb-8">
          <h3 className="font-heading font-medium text-xs uppercase tracking-wide text-muted-foreground mb-3">
            Navigation
          </h3>
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    color={active ? 'white' : 'currentColor'}
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className={`text-xs ${active ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="space-y-2 mb-8">
          <h3 className="font-heading font-medium text-xs uppercase tracking-wide text-muted-foreground mb-3">
            Quick Actions
          </h3>
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={action.action}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors duration-200"
            >
              <div className="relative">
                <Icon name={action.icon} size={18} />
                {action.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                    {action.badge}
                  </span>
                )}
              </div>
              <span className="font-medium text-sm">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Community Stats */}
        <div className="mt-auto p-4 bg-success/10 rounded-lg">
          <h4 className="font-heading font-medium text-sm text-success mb-2">
            Community Impact
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Items saved</span>
              <span className="font-mono text-xs font-medium text-success">2,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">CO₂ reduced</span>
              <span className="font-mono text-xs font-medium text-success">156kg</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;