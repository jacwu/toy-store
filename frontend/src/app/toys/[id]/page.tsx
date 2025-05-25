'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Toy } from '@/types';
import { toyApi } from '@/lib/api';
import { Loading } from '@/components';

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

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: #4a5568;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:hover {
    color: #2d3748;
  }
`;

const ErrorMessage = styled(motion.div)`
  background-color: #fff5f5;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin: 2rem 0;
  text-align: center;
`;

export default function ToyDetailPage() {
  const { id } = useParams();
  const [toy, setToy] = useState<Toy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  
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
  
  const handleBack = () => {
    const router = useRouter();
    router.back();
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
        <BackButton onClick={handleBack}>← 返回</BackButton>
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
        <BackButton onClick={handleBack}>← 返回</BackButton>
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
      <BackButton 
        onClick={handleBack}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        ← 返回
      </BackButton>
      
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
        </ToyContent>
      </ToyDetailContainer>
    </Container>
  );
}