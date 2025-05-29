'use client';

import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { ToyType } from '@/types';

const FilterContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

// 修改为使用 data-active 属性而不是 active 属性
const FilterButton = styled(motion.button)<{ 'data-active': boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border: 2px solid ${props => props['data-active'] ? '#4299e1' : '#e2e8f0'};
  background: ${props => props['data-active'] ? '#4299e1' : 'white'};
  color: ${props => props['data-active'] ? 'white' : '#4a5568'};
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4299e1;
    background: ${props => props['data-active'] ? '#3182ce' : '#f7fafc'};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #4299e1;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

interface ToyFilterProps {
  toyTypes: ToyType[];
  selectedTypeId: number | null;
  searchQuery: string;
  onTypeSelect: (typeId: number | null) => void;
  onSearchChange: (query: string) => void;
}

export default function ToyFilter({
  toyTypes,
  selectedTypeId,
  searchQuery,
  onTypeSelect,
  onSearchChange,
}: ToyFilterProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <FilterContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <SearchInput
        type="text"
        placeholder="搜索玩具..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      <FilterTitle>按类型筛选</FilterTitle>      <FilterOptions>
        <FilterButton
          data-active={selectedTypeId === null}
          onClick={() => onTypeSelect(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          全部
        </FilterButton>
        {Array.isArray(toyTypes) && toyTypes.map((type) => (
          <FilterButton
            key={type.id}
            data-active={selectedTypeId === type.id}
            onClick={() => onTypeSelect(type.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.name}
          </FilterButton>
        ))}
      </FilterOptions>
    </FilterContainer>
  );
}
