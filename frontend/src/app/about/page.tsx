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
            About Us
          </Title>
        </Hero>

        <Content
          variants={itemVariants}
          transition={{ duration: 0.6 }}
        >
          <Section>
            <SectionTitle>Our Mission</SectionTitle>
            <Text>
              Toy Store is dedicated to providing the highest quality and most enjoyable toy experiences 
              for children around the world. We believe that toys are not just entertainment tools, 
              but important companions for children&apos;s learning, growth, and creativity development.
            </Text>
          </Section>

          <Section>
            <SectionTitle>Product Features</SectionTitle>
            <FeatureList>
              <FeatureItem>Educational Toys: Develop intelligence and logical thinking skills</FeatureItem>
              <FeatureItem>Remote Control Toys: Improve hand-eye coordination and control skills</FeatureItem>
              <FeatureItem>Outdoor Toys: Promote exercise and cultivate interest in outdoor activities</FeatureItem>
              <FeatureItem>Doll Toys: Foster emotional expression and social skills</FeatureItem>
            </FeatureList>
          </Section>

          <Section>
            <SectionTitle>Our Commitment</SectionTitle>
            <Text>
              We strictly control product quality, all toys have passed safety certification and are made with eco-friendly materials.
              We promise to provide high-quality shopping experience and comprehensive after-sales service to every customer.
            </Text>
            <Text>
              Ensuring every child can enjoy endless fun from toys in a safe and happy environment is our eternal pursuit.
            </Text>
          </Section>
        </Content>
      </motion.div>
    </Container>
  );
}
