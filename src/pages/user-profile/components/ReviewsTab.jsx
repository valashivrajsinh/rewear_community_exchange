import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewsTab = ({ reviews }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredReviews = reviews?.filter(review => {
    if (filter === 'all') return true;
    return review.type === filter;
  }) || [];

  const filterOptions = [
    { id: 'all', label: 'All Reviews', count: reviews?.length || 0 },
    { id: 'received', label: 'Received', count: reviews?.filter(r => r.type === 'received').length || 0 },
    { id: 'given', label: 'Given', count: reviews?.filter(r => r.type === 'given').length || 0 }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Icon
            key={i}
            name="Star"
            size={16}
            color={i < rating ? "var(--color-warning)" : "var(--color-muted-foreground)"}
            className={i < rating ? "fill-current" : ""}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === option.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-lg p-6 shadow-soft"
            >
              <div className="flex items-start space-x-4">
                {/* User Avatar */}
                <Image
                  src={review.fromUser.avatar}
                  alt={review.fromUser.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-foreground">
                        {review.fromUser.name}
                      </h4>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-foreground mb-3 leading-relaxed">
                    {review.comment}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Swap item:</span> {review.swapItem}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      review.type === 'received' ?'bg-success/10 text-success' :'bg-primary/10 text-primary'
                    }`}>
                      {review.type === 'received' ? 'Received' : 'Given'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center shadow-soft">
          <Icon name="Star" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground mb-2">No reviews yet</h3>
          <p className="text-muted-foreground">
            {filter === 'all' 
              ? "Complete your first swap to start building your reputation!" 
              : `No ${filter} reviews found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;