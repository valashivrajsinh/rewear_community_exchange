import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SwapFilters = ({ onFilterChange, onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    itemType: '',
    sortBy: 'newest'
  });

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'declined', label: 'Declined' },
    { value: 'countered', label: 'Countered' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' }
  ];

  const itemTypeOptions = [
    { value: '', label: 'All Items' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const sortByOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'status', label: 'By Status' },
    { value: 'user', label: 'By User' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: '',
      dateRange: '',
      itemType: '',
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    onFilterChange(clearedFilters);
    onSearch('');
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== 'newest') || searchQuery;

  return (
    <div className="bg-background border-b border-border">
      {/* Search Bar */}
      <div className="p-4">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            type="search"
            placeholder="Search by user, item, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Icon name="Filter" size={18} />
          </Button>
        </form>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <Select
              label="Status"
              options={statusOptions}
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
            
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />
            
            <Select
              label="Item Type"
              options={itemTypeOptions}
              value={filters.itemType}
              onChange={(value) => handleFilterChange('itemType', value)}
            />
            
            <Select
              label="Sort By"
              options={sortByOptions}
              value={filters.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-muted-foreground">
              {hasActiveFilters ? 'Filters applied' : 'No filters applied'}
            </span>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapFilters;