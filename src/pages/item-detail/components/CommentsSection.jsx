import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentsSection = ({ comments: initialComments, onAddComment }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const comment = {
        id: Date.now(),
        user: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        },
        content: newComment,
        timestamp: new Date(),
        replies: []
      };
      
      setComments([...comments, comment]);
      setNewComment('');
      onAddComment?.(comment);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-background">
      <h3 className="font-heading font-medium text-lg text-foreground mb-4">
        Questions & Answers ({comments.length})
      </h3>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Ask a question about this item..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!newComment.trim() || isSubmitting}
              loading={isSubmitting}
            >
              Post Question
            </Button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={48} className="text-muted mx-auto mb-3" />
            <p className="text-muted-foreground">No questions yet</p>
            <p className="text-sm text-muted-foreground">Be the first to ask about this item</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-border pb-4 last:border-b-0">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <Image
                    src={comment.user.avatar}
                    alt={`${comment.user.name}'s avatar`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-heading font-medium text-sm text-foreground">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-2">
                    {comment.content}
                  </p>
                  
                  {/* Comment Actions */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful</span>
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-foreground">
                      Reply
                    </button>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 ml-4 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <Image
                              src={reply.user.avatar}
                              alt={`${reply.user.name}'s avatar`}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-heading font-medium text-xs text-foreground">
                                {reply.user.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(reply.timestamp)}
                              </span>
                            </div>
                            <p className="text-xs text-foreground">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;