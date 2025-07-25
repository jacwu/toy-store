'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Toy, Comment, CreateCommentRequest } from '@/types';
import { toyApi, commentApi } from '@/lib/api';
import { CommentList, CommentForm, Loading } from '@/components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ToyName = styled.h1`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
`;

const ToyPrice = styled.p`
  margin: 0 0 1rem 0;
  color: #007bff;
  font-size: 1.2rem;
  font-weight: 600;
`;

const BackButton = styled(motion.button)`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #545b62;
  }
`;

const CommentsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.4rem;
  font-weight: 600;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const SuccessMessage = styled(motion.div)`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const CommentsPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [toy, setToy] = useState<Toy | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const toyId = parseInt(id as string);
        
        if (isNaN(toyId)) {
          setError('无效的玩具 ID');
          return;
        }

        // Fetch toy details and comments in parallel
        const [toyData, commentsData] = await Promise.all([
          toyApi.getToyById(toyId),
          commentApi.getCommentsByToyId(toyId)
        ]);

        setToy(toyData);
        setComments(commentsData);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('加载数据失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (commentData: CreateCommentRequest) => {
    if (!toy) return;

    try {
      setSubmitting(true);
      const newComment = await commentApi.createComment(toy.id, commentData);
      
      // Add the new comment to the list
      setComments(prev => [newComment, ...prev]);
      
      // Show success message
      setSuccessMessage('评论发表成功！');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Error submitting comment:', err);
      setError(err.message || '发表评论失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Container>
        <ContentWrapper>
          <Loading />
        </ContentWrapper>
      </Container>
    );
  }

  if (error && !toy) {
    return (
      <Container>
        <ContentWrapper>
          <ErrorMessage>{error}</ErrorMessage>
          <BackButton
            onClick={handleBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            返回
          </BackButton>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        <Header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ToyName>{toy?.name}</ToyName>
          <ToyPrice>¥{toy?.price}</ToyPrice>
          <BackButton
            onClick={handleBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            返回玩具详情
          </BackButton>
        </Header>

        <CommentsSection>
          <SectionTitle>用户评论 ({comments.length})</SectionTitle>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {successMessage && (
            <SuccessMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {successMessage}
            </SuccessMessage>
          )}

          <CommentForm
            onSubmit={handleCommentSubmit}
            loading={submitting}
          />

          <CommentList comments={comments} />
        </CommentsSection>
      </ContentWrapper>
    </Container>
  );
};

export default CommentsPage;