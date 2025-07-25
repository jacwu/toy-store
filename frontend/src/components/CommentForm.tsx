'use client';

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { CreateCommentRequest } from '@/types';

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e5e5;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarButton = styled.button<{ selected: boolean }>`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.selected ? '#ffc107' : '#e5e5e5'};
  cursor: pointer;
  transition: color 0.2s ease, transform 0.1s ease;
  padding: 0.25rem;

  &:hover {
    color: #ffc107;
    transform: scale(1.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const SubmitButton = styled(motion.button)`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #545b62;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

interface CommentFormErrors {
  author?: string;
  content?: string;
  rating?: string;
}

interface CommentFormProps {
  onSubmit: (comment: CreateCommentRequest) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState<CreateCommentRequest>({
    author: '',
    content: '',
    rating: 5
  });
  const [errors, setErrors] = useState<CommentFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: CommentFormErrors = {};

    if (!formData.author.trim()) {
      newErrors.author = '请输入您的姓名';
    } else if (formData.author.length > 50) {
      newErrors.author = '姓名长度不能超过50个字符';
    }

    if (!formData.content.trim()) {
      newErrors.content = '请输入评论内容';
    } else if (formData.content.length > 1000) {
      newErrors.content = '评论内容不能超过1000个字符';
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = '请选择1-5星评分';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({
        author: '',
        content: '',
        rating: 5
      });
      setErrors({});
    } catch (error) {
      console.error('提交评论失败:', error);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    setErrors(prev => ({ ...prev, rating: undefined }));
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarButton
        key={index}
        type="button"
        selected={index < formData.rating}
        onClick={() => handleRatingClick(index + 1)}
      >
        ★
      </StarButton>
    ));
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormTitle>发表评论</FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="author">您的姓名 *</Label>
          <Input
            id="author"
            type="text"
            value={formData.author}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, author: e.target.value }));
              setErrors(prev => ({ ...prev, author: undefined }));
            }}
            placeholder="请输入您的姓名"
            disabled={loading}
          />
          {errors.author && <ErrorMessage>{errors.author}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label>评分 *</Label>
          <RatingContainer>
            {renderStars()}
            <span style={{ marginLeft: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
              ({formData.rating}/5)
            </span>
          </RatingContainer>
          {errors.rating && <ErrorMessage>{errors.rating}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="content">评论内容 *</Label>
          <TextArea
            id="content"
            value={formData.content}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, content: e.target.value }));
              setErrors(prev => ({ ...prev, content: undefined }));
            }}
            placeholder="请分享您对这款玩具的使用体验..."
            disabled={loading}
          />
          {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
        </FormField>

        <ButtonGroup>
          <SubmitButton
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? '提交中...' : '发表评论'}
          </SubmitButton>
          
          {onCancel && (
            <CancelButton type="button" onClick={onCancel} disabled={loading}>
              取消
            </CancelButton>
          )}
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default CommentForm;