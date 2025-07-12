import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import SwapCard from './components/SwapCard';
import SwapTabs from './components/SwapTabs';
import SwapFilters from './components/SwapFilters';
import EmptyState from './components/EmptyState';
import BulkActions from './components/BulkActions';
import SwapDetailModal from './components/SwapDetailModal';
import { Checkbox } from '../../components/ui/Checkbox';

const SwapManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('incoming');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    itemType: '',
    sortBy: 'newest'
  });

  // Mock data for swaps
  const mockSwaps = {
    incoming: [
      {
        id: 'inc_001',
        user: {
          name: 'Emma Wilson',
          rating: 4.8,
          swapCount: 23,
          location: 'San Francisco, CA'
        },
        desiredItem: {
          id: 'item_001',
          title: 'Vintage Denim Jacket',
          brand: 'Levi\'s',
          size: 'M',
          condition: 'Good',
          points: 450,
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'
        },
        offeredItem: {
          id: 'item_002',
          title: 'Silk Blouse',
          brand: 'Zara',
          size: 'S',
          condition: 'Excellent',
          points: 380,
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'
        },
        status: 'pending',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        lastMessage: {
          content: 'Hi! I love your denim jacket. Would you be interested in swapping for my silk blouse?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          sender: 'Emma Wilson'
        },
        messages: [
          {
            content: 'Hi! I love your denim jacket. Would you be interested in swapping for my silk blouse?',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            sender: 'Emma Wilson'
          }
        ]
      },
      {
        id: 'inc_002',
        user: {
          name: 'Michael Chen',
          rating: 4.9,
          swapCount: 31,
          location: 'Los Angeles, CA'
        },
        desiredItem: {
          id: 'item_003',
          title: 'Designer Sneakers',
          brand: 'Nike',
          size: '9',
          condition: 'Like New',
          points: 650,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
        },
        pointsOffered: 600,
        status: 'pending',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        lastMessage: {
          content: 'Would you accept 600 points for the sneakers?',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          sender: 'Michael Chen'
        }
      }
    ],
    outgoing: [
      {
        id: 'out_001',
        user: {
          name: 'Sarah Johnson',
          rating: 4.7,
          swapCount: 18,
          location: 'Seattle, WA'
        },
        desiredItem: {
          id: 'item_004',
          title: 'Wool Coat',
          brand: 'Uniqlo',
          size: 'L',
          condition: 'Good',
          points: 520,
          image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'
        },
        offeredItem: {
          id: 'item_005',
          title: 'Cashmere Sweater',
          brand: 'J.Crew',
          size: 'M',
          condition: 'Excellent',
          points: 480,
          image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'
        },
        status: 'pending',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        lastMessage: {
          content: 'I sent a swap request for your wool coat. Let me know if you\'re interested!',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          sender: 'You'
        }
      }
    ],
    progress: [
      {
        id: 'prog_001',
        user: {
          name: 'Lisa Rodriguez',
          rating: 4.9,
          swapCount: 42,
          location: 'Austin, TX'
        },
        desiredItem: {
          id: 'item_006',
          title: 'Summer Dress',
          brand: 'H&M',
          size: 'S',
          condition: 'Good',
          points: 280,
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'
        },
        offeredItem: {
          id: 'item_007',
          title: 'Leather Boots',
          brand: 'Dr. Martens',
          size: '8',
          condition: 'Good',
          points: 320,
          image: 'https://images.unsplash.com/photo-1608256246200-53e8b47b2dc1?w=400'
        },
        status: 'accepted',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        progress: {
          step: 2,
          currentStep: 'Waiting for shipping confirmation'
        },
        lastMessage: {
          content: 'Great! I\'ll ship the boots tomorrow. Tracking number will follow.',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          sender: 'You'
        }
      }
    ],
    completed: [
      {
        id: 'comp_001',
        user: {
          name: 'David Kim',
          rating: 4.8,
          swapCount: 27,
          location: 'Portland, OR'
        },
        desiredItem: {
          id: 'item_008',
          title: 'Graphic T-Shirt',
          brand: 'Vintage',
          size: 'M',
          condition: 'Good',
          points: 150,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
        },
        pointsOffered: 150,
        status: 'completed',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        rated: false
      }
    ]
  };

  const [swaps, setSwaps] = useState(mockSwaps);

  // Calculate counts for tabs
  const counts = {
    incoming: swaps.incoming.length,
    outgoing: swaps.outgoing.length,
    progress: swaps.progress.length,
    completed: swaps.completed.length
  };

  // Get current tab data
  const getCurrentSwaps = () => {
    let currentSwaps = swaps[activeTab] || [];
    
    // Apply search filter
    if (searchQuery) {
      currentSwaps = currentSwaps.filter(swap =>
        swap.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        swap.desiredItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (swap.offeredItem && swap.offeredItem.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (swap.lastMessage && swap.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.status) {
      currentSwaps = currentSwaps.filter(swap => swap.status === filters.status);
    }

    if (filters.itemType) {
      currentSwaps = currentSwaps.filter(swap => 
        swap.desiredItem.category === filters.itemType ||
        (swap.offeredItem && swap.offeredItem.category === filters.itemType)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'oldest':
        currentSwaps.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'status':
        currentSwaps.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'user':
        currentSwaps.sort((a, b) => a.user.name.localeCompare(b.user.name));
        break;
      default: // newest
        currentSwaps.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    return currentSwaps;
  };

  const currentSwaps = getCurrentSwaps();

  // Handle swap actions
  const handleSwapAction = (swapId, action, data = null) => {
    console.log(`Action: ${action} on swap ${swapId}`, data);
    
    switch (action) {
      case 'accept':
        // Move from incoming to progress
        setSwaps(prev => {
          const swap = prev.incoming.find(s => s.id === swapId);
          if (swap) {
            return {
              ...prev,
              incoming: prev.incoming.filter(s => s.id !== swapId),
              progress: [...prev.progress, { ...swap, status: 'accepted', progress: { step: 1, currentStep: 'Swap accepted - preparing for exchange' } }]
            };
          }
          return prev;
        });
        break;
      
      case 'decline':
        // Remove from incoming
        setSwaps(prev => ({
          ...prev,
          incoming: prev.incoming.filter(s => s.id !== swapId)
        }));
        break;
      
      case 'counter': console.log('Counter offer:', data);
        break;
      
      case 'message': console.log('Send message:', data);
        break;
      
      case 'ship':
        // Update progress
        setSwaps(prev => ({
          ...prev,
          progress: prev.progress.map(s => 
            s.id === swapId 
              ? { ...s, progress: { step: 3, currentStep: 'Item shipped - awaiting delivery' } }
              : s
          )
        }));
        break;
      
      case 'rate': navigate('/user-dashboard?tab=reviews');
        break;
      
      default:
        console.log('Unknown action:', action);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action, items) => {
    console.log(`Bulk action: ${action}`, items);
    
    switch (action) {
      case 'accept':
        items.forEach(itemId => handleSwapAction(itemId, 'accept'));
        break;
      case 'decline':
        items.forEach(itemId => handleSwapAction(itemId, 'decline'));
        break;
      default:
        console.log('Bulk action not implemented:', action);
    }
    
    setSelectedItems([]);
  };

  // Handle item selection
  const handleItemSelection = (swapId, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, swapId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== swapId));
    }
  };

  const handleSelectAll = () => {
    setSelectedItems(currentSwaps.map(swap => swap.id));
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  // Handle empty state actions
  const handleEmptyStateAction = () => {
    switch (activeTab) {
      case 'incoming': case'outgoing': navigate('/browse-items');
        break;
      case 'progress': setActiveTab('incoming');
        break;
      case 'completed':
        navigate('/add-edit-item');
        break;
      default:
        // Clear filters
        setSearchQuery('');
        setFilters({
          status: '',
          dateRange: '',
          itemType: '',
          sortBy: 'newest'
        });
    }
  };

  // Handle swap detail view
  const handleSwapDetail = (swap) => {
    setSelectedSwap(swap);
    setShowDetailModal(true);
  };

  // Clear selection when tab changes
  useEffect(() => {
    setSelectedItems([]);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16 pb-20 lg:pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="px-4 py-6 border-b border-border bg-background">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-bold text-2xl text-foreground">
                  Swap Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track and manage all your clothing exchanges
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="font-mono font-bold text-lg text-primary">
                    {counts.incoming + counts.outgoing}
                  </div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div className="text-center">
                  <div className="font-mono font-bold text-lg text-success">
                    {counts.completed}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="font-mono font-bold text-lg text-accent">
                    {counts.progress}
                  </div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <SwapTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={counts}
          />

          {/* Filters */}
          <SwapFilters
            onFilterChange={setFilters}
            onSearch={setSearchQuery}
          />

          {/* Content */}
          <div className="p-4">
            {currentSwaps.length === 0 ? (
              <EmptyState
                type={searchQuery || Object.values(filters).some(f => f && f !== 'newest') ? 'filtered' : activeTab}
                onAction={handleEmptyStateAction}
              />
            ) : (
              <div className="space-y-4">
                {/* Selection Mode Toggle */}
                {activeTab === 'incoming' && currentSwaps.length > 1 && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedItems.length === currentSwaps.length}
                        indeterminate={selectedItems.length > 0 && selectedItems.length < currentSwaps.length}
                        onChange={selectedItems.length === currentSwaps.length ? handleClearSelection : handleSelectAll}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {selectedItems.length > 0 ? `${selectedItems.length} selected` : 'Select all'}
                      </span>
                    </div>
                    
                    {selectedItems.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        Bulk actions available
                      </span>
                    )}
                  </div>
                )}

                {/* Swap Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {currentSwaps.map((swap) => (
                    <div key={swap.id} className="relative">
                      {/* Selection Checkbox */}
                      {activeTab === 'incoming' && (
                        <div className="absolute top-2 left-2 z-10">
                          <Checkbox
                            checked={selectedItems.includes(swap.id)}
                            onChange={(e) => handleItemSelection(swap.id, e.target.checked)}
                            className="bg-background/80 backdrop-blur-sm"
                          />
                        </div>
                      )}
                      
                      <div onClick={() => handleSwapDetail(swap)} className="cursor-pointer">
                        <SwapCard
                          swap={swap}
                          type={activeTab}
                          onAction={handleSwapAction}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <BulkActions
          selectedItems={selectedItems}
          onBulkAction={handleBulkAction}
          onSelectAll={handleSelectAll}
          onClearSelection={handleClearSelection}
          totalItems={currentSwaps.length}
        />
      )}

      {/* Swap Detail Modal */}
      <SwapDetailModal
        swap={selectedSwap}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onAction={handleSwapAction}
      />

      <BottomTabNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default SwapManagement;