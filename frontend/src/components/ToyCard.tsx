'use client';

import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useState } from 'react';
import { Toy } from '@/types';

const ToyCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e1e8ed;
  height: 400px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ToyImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  position: relative;
  background: #f7fafc;
  
  img {
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ToyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const ToyDescription = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  min-height: 4.5em;
`;

const ToyMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ToyPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #e53e3e;
`;

const ToyType = styled.span`
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ToyImageFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
`;

interface ToyCardComponentProps {
  toy: Toy;
  onClick?: () => void;
}

export default function ToyCardComponent({ toy, onClick }: ToyCardComponentProps) {
  const [imageError, setImageError] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <ToyCard
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >      <ToyImage>
        {!imageError ? (
          <Image
            src={`/images/toys/${toy.id}.png`}
            alt={toy.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
          />
        ) : (
          <ToyImageFallback>
            {toy.name.charAt(0).toUpperCase()}
          </ToyImageFallback>
        )}
      </ToyImage>
      <ToyTitle>{toy.name}</ToyTitle>
      <ToyDescription>{toy.description}</ToyDescription>
      <ToyMeta>
        <ToyPrice>¥{toy.price.toFixed(2)}</ToyPrice>
        {toy.toyType && <ToyType>{toy.toyType.name}</ToyType>}
      </ToyMeta>
    </ToyCard>
  );
}
