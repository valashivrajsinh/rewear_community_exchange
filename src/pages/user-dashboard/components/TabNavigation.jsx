import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-1 shadow-soft">
      <div className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon 
              name={tab.icon} 
              size={16} 
              color={activeTab === tab.id ? 'white' : 'currentColor'} 
            />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                activeTab === tab.id
                  ? 'bg-primary-foreground text-primary'
                  : 'bg-accent text-accent-foreground'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;