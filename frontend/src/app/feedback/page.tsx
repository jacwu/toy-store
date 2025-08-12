'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { feedbackApi } from '@/lib/api';
import { CreateFeedbackRequest } from '@/types';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
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

const Subtitle = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled(motion.div)<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${props => props.type === 'success' ? '#f0fff4' : '#fed7d7'};
  border: 2px solid ${props => props.type === 'success' ? '#9ae6b4' : '#feb2b2'};
  color: ${props => props.type === 'success' ? '#2f855a' : '#c53030'};
`;

export default function FeedbackPage() {
  const [formData, setFormData] = useState<CreateFeedbackRequest>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await feedbackApi.submitFeedback(formData);
      setMessage({ type: 'success', text: '感谢您的反馈！我们已收到您的意见，会认真考虑。' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || '提交反馈时出现错误，请稍后重试。' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Container>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Hero>
          <Title
            variants={itemVariants}
            transition={{ duration: 0.8 }}
          >
            反馈建议
          </Title>
          <Subtitle>
            您的意见和建议对我们很重要，请告诉我们您的想法！
          </Subtitle>
        </Hero>

        <FormContainer
          variants={itemVariants}
          transition={{ duration: 0.6 }}
        >
          {message && (
            <Message 
              type={message.type}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.text}
            </Message>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">姓名 *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="请输入您的姓名"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">邮箱 *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="请输入您的邮箱地址"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">反馈内容 *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="请详细描述您的意见或建议..."
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? '提交中...' : '提交反馈'}
            </SubmitButton>
          </Form>
        </FormContainer>
      </motion.div>
    </Container>
  );
}