'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { messageApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Message } from '@/types';

const Container = styled.div`
  max-width: 900px;
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

const Section = styled(motion.section)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
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
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageCard = styled(motion.div)`
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const MessageTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const MessageMeta = styled.div`
  text-align: right;
  font-size: 0.875rem;
  color: #718096;
`;

const MessageContent = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  border: 1px solid #fc8181;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background: #c6f6d5;
  border: 1px solid #68d391;
  color: #2f855a;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 2rem;
  background: #edf2f7;
  border-radius: 8px;
  color: #4a5568;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
`;

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { user, isLoggedIn } = useAuth();

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const response = await messageApi.getAllMessages();
      if (response && response.success) {
        setMessages(response.data || []);
      }
    } catch (err: any) {
      console.error('Error loading messages:', err);
      setError('加载留言失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('标题和内容不能为空');
      return;
    }

    if (!user) {
      setError('请先登录后再留言');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await messageApi.createMessage(title.trim(), content.trim(), user.id);
      if (response && response.success) {
        setSuccess('留言提交成功！');
        setTitle('');
        setContent('');
        // Reload messages to show the new one
        await loadMessages();
      } else {
        setError(response?.message || '提交失败，请重试');
      }
    } catch (err: any) {
      console.error('Error submitting message:', err);
      setError(err?.message || '提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
            用户留言
          </Title>
        </Hero>

        {/* Submit Message Form */}
        <Section
          variants={itemVariants}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ marginBottom: '1.5rem', color: '#2d3748' }}>发表留言</h2>
          
          {!isLoggedIn ? (
            <LoginPrompt>
              <p>请先登录后再发表留言</p>
            </LoginPrompt>
          ) : (
            <>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {success && <SuccessMessage>{success}</SuccessMessage>}
              
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="title">标题</Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="请输入留言标题"
                    disabled={isSubmitting}
                    maxLength={100}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="content">内容</Label>
                  <TextArea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="请输入留言内容"
                    disabled={isSubmitting}
                    maxLength={1000}
                  />
                </FormGroup>
                
                <Button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? '提交中...' : '提交留言'}
                </Button>
              </Form>
            </>
          )}
        </Section>

        {/* Messages List */}
        <Section
          variants={itemVariants}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 style={{ marginBottom: '1.5rem', color: '#2d3748' }}>所有留言</h2>
          
          {isLoading ? (
            <LoadingSpinner>加载中...</LoadingSpinner>
          ) : messages.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>
              暂无留言
            </div>
          ) : (
            <MessageList>
              {messages.map((message) => (
                <MessageCard
                  key={message.id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageHeader>
                    <MessageTitle>{message.title}</MessageTitle>
                    <MessageMeta>
                      <div>{message.username}</div>
                      <div>{new Date(message.createdAt).toLocaleString('zh-CN')}</div>
                    </MessageMeta>
                  </MessageHeader>
                  <MessageContent>{message.content}</MessageContent>
                </MessageCard>
              ))}
            </MessageList>
          )}
        </Section>
      </motion.div>
    </Container>
  );
}