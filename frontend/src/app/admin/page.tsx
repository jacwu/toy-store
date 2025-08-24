'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { useAuth } from '@/contexts/AuthContext';
import { userApi } from '@/lib/api';
import { motion } from 'framer-motion';

// Styled components
const AdminContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #3f51b5;
  margin-bottom: 1rem;
  text-align: center;
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background-color: #3f51b5;
  color: white;
`;

const TableRow = styled(motion.tr)`
  background-color: white;
  &:nth-of-type(even) {
    background-color: #f5f5f5;
  }
  &:hover {
    background-color: #e8eaf6;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const NoUsersMessage = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #757575;
  font-size: 1.2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #757575;
  font-size: 1.2rem;
`;

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  // Fetch users on page load
  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    const fetchUsers = async () => {
      try {
        const usersData = await userApi.getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <AdminContainer>
      <Title>用户管理页面</Title>
      
      {loading ? (
        <LoadingMessage>加载用户数据中...</LoadingMessage>
      ) : users.length > 0 ? (
        <UserTable>
          <TableHeader>
            <tr>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>用户名</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {users.map((user, index) => (
              <TableRow 
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </UserTable>
      ) : (
        <NoUsersMessage>没有找到用户。</NoUsersMessage>
      )}
    </AdminContainer>
  );
}