'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Toy } from '@/types';
import { toyApi } from '@/lib/api';
import { Loading } from '@/components';
import { useCart } from '@/contexts/CartContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ToyDetailContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  
  @media (min-width: 768px) {
    width: 40%;
    height: auto;
    min-height: 400px;
  }
`;

const ImageFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: 600;
`;

const ToyContent = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ToyName = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const ToyType = styled.span`
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const ToyPrice = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #e53e3e;
  margin-bottom: 1.5rem;
`;

const ToyDescription = styled(motion.p)`
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 2rem;
  white-space: pre-wrap;
`;

const ErrorMessage = styled(motion.div)`
  background-color: #fff5f5;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin: 2rem 0;
  text-align: center;
`;

const AddToCartSection = styled(motion.div)`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityLabel = styled.label`
  font-weight: 500;
  color: #4a5568;
  min-width: 50px;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  text-align: center;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e8f0;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  
  &:hover {
    background-color: #cbd5e0;
  }
`;

const AddToCartButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const CommentsButton = styled(motion.button)`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: #f0fff4;
  color: #276749;
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
`;

export default function ToyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [toy, setToy] = useState<Toy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchToy = async () => {
      try {
        setLoading(true);
        const toyId = parseInt(id as string);
        if (isNaN(toyId)) {
          setError('无效的玩具 ID');
          return;
        }
        
        const toyData = await toyApi.getToyById(toyId);
        setToy(toyData);
        setError(null);
      } catch (err) {
        console.error('Error loading toy:', err);
        setError('加载玩具详情失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };
    
    fetchToy();
  }, [id]);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (toy) {
      addToCart(toy, quantity);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };
  
  const goToCart = () => {
    router.push('/cart');
  };

  const goToComments = () => {
    if (toy) {
      router.push(`/toys/${toy.id}/comments`);
    }
  };
  
  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <ErrorMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </ErrorMessage>
      </Container>
    );
  }
  
  if (!toy) {
    return (
      <Container>
        <ErrorMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          玩具不存在
        </ErrorMessage>
      </Container>
    );
  }
  
  return (
    <Container>      
      <ToyDetailContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ImageContainer>
          {!imageError ? (
            <Image
              src={`/images/toys/${toy.id}.png`}
              alt={toy.name}
              fill
              style={{ objectFit: 'cover' }}
              onError={handleImageError}
            />
          ) : (
            <ImageFallback>
              {toy.name.charAt(0).toUpperCase()}
            </ImageFallback>
          )}
        </ImageContainer>
        
        <ToyContent>
          <ToyName
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {toy.name}
          </ToyName>
          
          {toy.toyType && <ToyType>{toy.toyType.name}</ToyType>}
          
          <ToyPrice
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ¥{toy.price.toFixed(2)}
          </ToyPrice>
          
          <ToyDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {toy.detailDescription || toy.description}
          </ToyDescription>

          <CommentsButton
            onClick={goToComments}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            💬 查看评论
          </CommentsButton>
          
          <AddToCartSection
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <QuantityControl>
              <QuantityLabel>数量:</QuantityLabel>
              <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
              <QuantityInput
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
            </QuantityControl>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <AddToCartButton
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                加入购物车
              </AddToCartButton>
              
              <AddToCartButton
                onClick={goToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  backgroundColor: '#4299e1', 
                  background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)' 
                }}
              >
                查看购物车
              </AddToCartButton>
            </div>
            
            <AnimatePresence>
              {showSuccess && (
                <SuccessMessage
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ✅ 已成功添加到购物车
                </SuccessMessage>
              )}
            </AnimatePresence>
          </AddToCartSection>
        </ToyContent>
      </ToyDetailContainer>
    </Container>
  );
}