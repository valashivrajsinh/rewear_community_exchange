import React from 'react';

const SwapTabs = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    { id: 'incoming', label: 'Incoming', count: counts.incoming },
    { id: 'outgoing', label: 'Outgoing', count: counts.outgoing },
    { id: 'progress', label: 'In Progress', count: counts.progress },
    { id: 'completed', label: 'Completed', count: counts.completed }
  ];

  return (
    <div className="border-b border-border bg-background">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SwapTabs;