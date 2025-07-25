'use client';

import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Comment } from '@/types';

const CommentListContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CommentCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e5e5;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const AuthorName = styled.h4`
  margin: 0;
  color: #333;
  font-weight: 600;
  font-size: 1rem;
`;

const CommentDate = styled.span`
  color: #666;
  font-size: 0.875rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${props => props.filled ? '#ffc107' : '#e5e5e5'};
  font-size: 1.1rem;
`;

const CommentContent = styled.p`
  margin: 0;
  color: #333;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  background: #f8f9fa;
  border-radius: 12px;
`;

interface CommentListProps {
  comments: Comment[];
  loading?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ comments, loading = false }) => {
  if (loading) {
    return (
      <CommentListContainer>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          加载评论中...
        </div>
      </CommentListContainer>
    );
  }

  if (comments.length === 0) {
    return (
      <EmptyState>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#999' }}>暂无评论</h3>
        <p style={{ margin: 0, color: '#666' }}>成为第一个评论的人吧！</p>
      </EmptyState>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} filled={index < rating}>
        ★
      </Star>
    ));
  };

  return (
    <CommentListContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {comments.map((comment, index) => (
        <CommentCard
          key={comment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <CommentHeader>
            <AuthorName>{comment.author}</AuthorName>
            <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
          </CommentHeader>
          
          <Rating>
            {renderStars(comment.rating)}
            <span style={{ marginLeft: '0.5rem', color: '#666', fontSize: '0.875rem' }}>
              ({comment.rating}/5)
            </span>
          </Rating>
          
          <CommentContent>{comment.content}</CommentContent>
        </CommentCard>
      ))}
    </CommentListContainer>
  );
};

export default CommentList;