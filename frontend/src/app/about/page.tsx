'use client';

import { motion } from 'framer-motion';
import styled from '@emotion/styled';

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

const Content = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  color: #4a5568;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: '🧸';
    position: absolute;
    left: 0;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
`;

const ContactIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 0.75rem;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.div`
  color: #4a5568;
  font-size: 0.9rem;
`;

export default function AboutPage() {
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
            关于我们
          </Title>
        </Hero>

        <Content
          variants={itemVariants}
          transition={{ duration: 0.6 }}
        >
          <Section>
            <SectionTitle>我们的使命</SectionTitle>
            <Text>
              玩具商店致力于为全世界的孩子们提供最优质、最有趣的玩具体验。我们相信玩具不仅仅是娱乐工具，
              更是孩子们学习、成长和发展创造力的重要伙伴。
            </Text>
          </Section>

          <Section>
            <SectionTitle>产品特色</SectionTitle>
            <FeatureList>
              <FeatureItem>益智玩具：开发智力，培养逻辑思维能力</FeatureItem>
              <FeatureItem>遥控玩具：提升手眼协调，增强操控技能</FeatureItem>
              <FeatureItem>户外玩具：促进运动，培养户外活动兴趣</FeatureItem>
              <FeatureItem>玩偶玩具：培养情感表达和社交能力</FeatureItem>
            </FeatureList>
          </Section>

          <Section>
            <SectionTitle>我们的承诺</SectionTitle>
            <Text>
              我们严格把控产品质量，所有玩具均经过安全认证，使用环保材料制作。
              我们承诺为每一位顾客提供优质的购物体验和完善的售后服务。
            </Text>
            <Text>
              让每个孩子都能在安全、快乐的环境中享受玩具带来的无穷乐趣，这是我们永恒的追求。
            </Text>
          </Section>

          <Section>
            <SectionTitle>联系我们</SectionTitle>
            <Text>
              我们随时为您提供咨询和服务支持，欢迎通过以下方式联系我们：
            </Text>
            <ContactInfo>
              <ContactItem>
                <ContactIcon>📞</ContactIcon>
                <ContactDetails>
                  <ContactLabel>客服热线</ContactLabel>
                  <ContactValue>400-123-4567</ContactValue>
                </ContactDetails>
              </ContactItem>
              <ContactItem>
                <ContactIcon>📧</ContactIcon>
                <ContactDetails>
                  <ContactLabel>邮箱地址</ContactLabel>
                  <ContactValue>service@toystore.com</ContactValue>
                </ContactDetails>
              </ContactItem>
              <ContactItem>
                <ContactIcon>📍</ContactIcon>
                <ContactDetails>
                  <ContactLabel>门店地址</ContactLabel>
                  <ContactValue>北京市朝阳区玩具大厦101号</ContactValue>
                </ContactDetails>
              </ContactItem>
              <ContactItem>
                <ContactIcon>🕒</ContactIcon>
                <ContactDetails>
                  <ContactLabel>营业时间</ContactLabel>
                  <ContactValue>周一至周日 9:00-21:00</ContactValue>
                </ContactDetails>
              </ContactItem>
            </ContactInfo>
          </Section>
        </Content>
      </motion.div>
    </Container>
  );
}
