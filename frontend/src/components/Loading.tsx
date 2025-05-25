'use client';

import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  flex-direction: column;
  gap: 1rem;
`;

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #4299e1;
  border-radius: 50%;
`;

const LoadingText = styled(motion.p)`
  color: #4a5568;
  font-size: 1rem;
  font-weight: 500;
`;

export default function Loading() {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <LoadingContainer>
      <Spinner
        variants={spinnerVariants}
        animate="animate"
      />
      <LoadingText
        variants={textVariants}
        animate="animate"
      >
        加载中...
      </LoadingText>
    </LoadingContainer>
  );
}
