'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useAuth } from '@/contexts/AuthContext';
import { Review, Toy } from '@/types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled(motion.section)`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #4a5568;
  line-height: 1.6;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReviewCard = styled(motion.div)`
  background: #f7fafc;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid #667eea;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReviewerName = styled.span`
  font-weight: 600;
  color: #2d3748;
`;

const ToyName = styled.span`
  color: #667eea;
  font-weight: 500;
`;

const Rating = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const ReviewDate = styled.span`
  color: #718096;
  font-size: 0.9rem;
`;

const ReviewText = styled.p`
  color: #4a5568;
  line-height: 1.6;
`;

const PostReviewSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 2rem;
  color: #4a5568;
  
  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2d3748;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const RatingSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StarButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.active ? '#ffc107' : '#e2e8f0'};
  transition: color 0.2s;
  
  &:hover {
    color: #ffc107;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #718096;
`;

// Mock data - in real app this would come from API
const mockToys: Toy[] = [
  { id: 1, name: '益智拼图', description: '开发智力的拼图玩具', price: 45, toyTypeId: 1 },
  { id: 2, name: '遥控小车', description: '高速遥控玩具车', price: 120, toyTypeId: 2 },
  { id: 3, name: '毛绒熊', description: '可爱的毛绒玩具', price: 80, toyTypeId: 4 },
];

const mockReviews: Review[] = [
  {
    id: '1',
    userId: 1,
    username: '小明',
    toyId: 1,
    toyName: '益智拼图',
    rating: 5,
    comment: '这个拼图非常有趣，孩子很喜欢！质量也很好，边角都很光滑，安全性很棒。',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: 2,
    username: '妈妈王',
    toyId: 2,
    toyName: '遥控小车',
    comment: '儿子玩了好几个月了，质量很不错，电池续航也很好。推荐给其他家长！',
    rating: 4,
    timestamp: '2024-01-10T15:45:00Z'
  },
  {
    id: '3',
    userId: 3,
    username: '爱玩具的张姐',
    toyId: 3,
    toyName: '毛绒熊',
    rating: 5,
    comment: '超级软萌！女儿抱着睡觉，材质很舒服，没有异味，很值得购买。',
    timestamp: '2024-01-08T20:00:00Z'
  }
];

export default function CommunityPage() {
  const { user, isLoggedIn } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(mockReviews); // Initialize with mock data
  const [selectedToyId, setSelectedToyId] = useState<number | ''>('');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Ensure mock reviews are loaded (this is redundant now but kept for potential API integration)
    if (reviews.length === 0) {
      setReviews(mockReviews);
    }
  }, [reviews.length]);

  const handleRatingClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedToyId || rating === 0 || !comment.trim()) return;

    setIsSubmitting(true);

    const selectedToy = mockToys.find(toy => toy.id === selectedToyId);
    if (!selectedToy || !user) return;

    // Create new review
    const newReview: Review = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      toyId: selectedToy.id,
      toyName: selectedToy.name,
      rating,
      comment: comment.trim(),
      timestamp: new Date().toISOString()
    };

    // In real app, this would be an API call
    setTimeout(() => {
      setReviews(prev => [newReview, ...prev]);
      setSelectedToyId('');
      setRating(0);
      setComment('');
      setIsSubmitting(false);
    }, 1000);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffc107' : '#e2e8f0' }}>
        ★
      </span>
    ));
  };

  return (
    <Container>
      <Hero>
        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🌟 社区分享
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          分享您的玩具使用心得，帮助其他家长做出更好的选择
        </Subtitle>
      </Hero>

      <Content>
        <ReviewsSection>
          <SectionTitle>
            💬 用户评价
          </SectionTitle>
          
          <AnimatePresence>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReviewHeader>
                    <ReviewerInfo>
                      <ReviewerName>{review.username}</ReviewerName>
                      <span>评价了</span>
                      <ToyName>{review.toyName}</ToyName>
                    </ReviewerInfo>
                    <ReviewDate>{formatDate(review.timestamp)}</ReviewDate>
                  </ReviewHeader>
                  
                  <Rating>
                    {renderStars(review.rating)}
                  </Rating>
                  
                  <ReviewText>{review.comment}</ReviewText>
                </ReviewCard>
              ))
            ) : (
              <EmptyState>
                暂无评价，成为第一个分享心得的用户吧！
              </EmptyState>
            )}
          </AnimatePresence>
        </ReviewsSection>

        <PostReviewSection>
          <SectionTitle>
            ✍️ 分享心得
          </SectionTitle>
          
          {isLoggedIn && user ? (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="toy-select">选择玩具</Label>
                <Select
                  id="toy-select"
                  value={selectedToyId}
                  onChange={(e) => setSelectedToyId(e.target.value ? Number(e.target.value) : '')}
                  required
                >
                  <option value="">请选择玩具</option>
                  {mockToys.map(toy => (
                    <option key={toy.id} value={toy.id}>
                      {toy.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>评分</Label>
                <RatingSelector>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarButton
                      key={i}
                      type="button"
                      active={i < rating}
                      onClick={() => handleRatingClick(i + 1)}
                    >
                      ★
                    </StarButton>
                  ))}
                </RatingSelector>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="comment">使用心得</Label>
                <TextArea
                  id="comment"
                  placeholder="分享您的使用体验，帮助其他家长了解这个玩具..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting || !selectedToyId || rating === 0 || !comment.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? '发布中...' : '发布评价'}
              </SubmitButton>
            </Form>
          ) : (
            <LoginPrompt>
              <p>登录后即可分享您的使用心得</p>
              <p>
                <a href="/login">立即登录</a> 或 <a href="/register">注册账户</a>
              </p>
            </LoginPrompt>
          )}
        </PostReviewSection>
      </Content>
    </Container>
  );
}