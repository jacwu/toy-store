'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { toyApi, toyTypeApi } from '@/lib/api';
import { Toy, ToyType } from '@/types';
import ToyCard from '@/components/ToyCard';
import ToyFilter from '@/components/ToyFilter';
import Loading from '@/components/Loading';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled(motion.section)`
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ToysGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  color: #4a5568;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const EmptyStateSubtext = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

const ErrorMessage = styled(motion.div)`
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin: 2rem 0;
`;

export default function HomePage() {
  const [toys, setToys] = useState<Toy[]>([]);
  const [toyTypes, setToyTypes] = useState<ToyType[]>([]);
  const [filteredToys, setFilteredToys] = useState<Toy[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // This is for toy data loading
  const [error, setError] = useState<string | null>(null);

  const { user, isLoggedIn, isLoading: isAuthLoading } = useAuth(); // Auth state

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterToys();
  }, [toys, selectedTypeId, searchQuery]);
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [toysData, toyTypesData] = await Promise.all([
        toyApi.getAllToys(),
        toyTypeApi.getAllToyTypes()
      ]);
      // 确保数据是数组格式
      setToys(Array.isArray(toysData) ? toysData : []);
      setToyTypes(Array.isArray(toyTypesData) ? toyTypesData : []);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data, please try again later');
      // 设置默认空数组
      setToys([]);
      setToyTypes([]);
    } finally {
      setLoading(false);
    }
  };
  const filterToys = () => {
    // 确保 toys 是数组
    if (!Array.isArray(toys)) {
      setFilteredToys([]);
      return;
    }

    let filtered = toys;

    // 按类型筛选
    if (selectedTypeId !== null) {
      filtered = filtered.filter(toy => toy.toyTypeId === selectedTypeId);
    }

    // 按搜索关键词筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(toy =>
        toy.name.toLowerCase().includes(query) ||
        toy.description.toLowerCase().includes(query) ||
        (toy.toyType && toy.toyType.name.toLowerCase().includes(query))
      );
    }

    setFilteredToys(filtered);
  };

  const router = useRouter();

  const handleToyClick = (toy: Toy) => {
    // 导航到玩具详情页
    router.push(`/toys/${toy.id}`);
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

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <Hero>
        <HeroTitle
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Toy Store
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Subtitle content will be conditional */}
        </HeroSubtitle>

        {/* Conditional Subtitle Logic */}
        {!isAuthLoading && isLoggedIn && user ? (
          <HeroSubtitle
            key="user-subtitle" // Adding key for AnimatePresence or conditional rendering
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Hello, {user.username}! Welcome back to Toy Store.
          </HeroSubtitle>
        ) : !isAuthLoading && !isLoggedIn ? (
          <HeroSubtitle
            key="guest-subtitle" // Adding key
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover exciting toys, from educational puzzles to remote control vehicles, bringing endless fun and learning experiences to your children
          </HeroSubtitle>
        ) : null } {/* Or a placeholder/spinner if isAuthLoading */}
      </Hero>

      {error && (
        <ErrorMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </ErrorMessage>
      )}

      <ToyFilter
        toyTypes={toyTypes}
        selectedTypeId={selectedTypeId}
        searchQuery={searchQuery}
        onTypeSelect={setSelectedTypeId}
        onSearchChange={setSearchQuery}
      />

      <AnimatePresence mode="wait">
        {filteredToys.length > 0 ? (
          <ToysGrid
            key="toys-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredToys.map((toy) => (
              <motion.div key={toy.id} variants={itemVariants}>
                <ToyCard
                  toy={toy}
                  onClick={() => handleToyClick(toy)}
                />
              </motion.div>
            ))}
          </ToysGrid>
        ) : (
          <EmptyState
            key="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyStateIcon>🔍</EmptyStateIcon>
            <EmptyStateText>
              {searchQuery || selectedTypeId !== null ? 'No matching toys found' : 'No toys available'}
            </EmptyStateText>
            <EmptyStateSubtext>
              {searchQuery || selectedTypeId !== null
                ? 'Please try adjusting the filters or search keywords'
                : 'Please check back later'}
            </EmptyStateSubtext>
          </EmptyState>
        )}
      </AnimatePresence>
    </Container>
  );
}
