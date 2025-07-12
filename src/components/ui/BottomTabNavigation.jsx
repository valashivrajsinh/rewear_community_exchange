import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      label: 'Home',
      icon: 'Home',
      path: '/homepage-landing',
      badge: null
    },
    {
      label: 'Browse',
      icon: 'Search',
      path: '/browse-items',
      badge: null
    },
    {
      label: 'Dashboard',
      icon: 'User',
      path: '/user-dashboard',
      badge: null
    },
    {
      label: 'Swaps',
      icon: 'ArrowLeftRight',
      path: '/swap-management',
      badge: 2
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/browse-items') {
      return location.pathname === '/browse-items' || location.pathname === '/item-detail';
    }
    if (path === '/user-dashboard') {
      return location.pathname === '/user-dashboard' || location.pathname === '/add-edit-item';
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-100 lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          
          return (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors duration-200 ${
                active 
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon 
                  name={tab.icon} 
                  size={20} 
                  strokeWidth={active ? 2.5 : 2}
                />
                {tab.badge && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-caption ${active ? 'font-medium' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;