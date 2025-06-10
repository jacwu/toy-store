'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useOrder } from '@/contexts/OrderContext';
import { Order } from '@/types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
`;

const PageTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const EmptyOrdersMessage = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const EmptyOrdersIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyOrdersText = styled.h2`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
`;

const ContinueShoppingButton = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const OrderId = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const OrderDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const OrderSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem 0;
`;

const ItemType = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin: 0;
`;

const ItemQuantity = styled.span`
  font-weight: 500;
  color: #333;
  margin-right: 1rem;
`;

const ItemPrice = styled.span`
  font-weight: 600;
  color: #667eea;
`;

const TotalPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #667eea;
`;

export default function OrdersPage() {
  const { orders } = useOrder();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (itemId: string) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  if (orders.length === 0) {
    return (
      <Container>
        <PageTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Orders
        </PageTitle>
        <EmptyOrdersMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EmptyOrdersIcon>📋</EmptyOrdersIcon>
          <EmptyOrdersText>You don&apos;t have any orders yet</EmptyOrdersText>
          <Link href="/" passHref>
            <ContinueShoppingButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              开始购物
            </ContinueShoppingButton>
          </Link>
        </EmptyOrdersMessage>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Orders
      </PageTitle>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <OrdersContainer>
          <AnimatePresence>
            {orders.map((order, index) => (
              <OrderCard
                key={order.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <OrderHeader>
                  <OrderId>Order ID: {order.id}</OrderId>
                  <OrderDate>{formatDate(order.timestamp)}</OrderDate>
                </OrderHeader>

                <OrderSummary>
                  <span>共 {order.itemCount} 件商品</span>
                  <TotalPrice>总计: ¥{order.totalAmount.toFixed(2)}</TotalPrice>
                </OrderSummary>

                <OrderItems>
                  {order.items.map((item) => (
                    <OrderItem key={`${order.id}_${item.id}`}>
                      <ItemImage>
                        {imageErrors[`${order.id}_${item.id}`] ? (
                          item.toy.name.charAt(0)
                        ) : (
                          <Image
                            src={`/images/toys/${item.toy.id}.png`}
                            alt={item.toy.name}
                            width={60}
                            height={60}
                            style={{ 
                              borderRadius: '8px',
                              objectFit: 'cover',
                              width: '100%',
                              height: '100%'
                            }}
                            onError={() => handleImageError(`${order.id}_${item.id}`)}
                          />
                        )}
                      </ItemImage>
                      <ItemInfo>
                        <ItemName>{item.toy.name}</ItemName>
                        {item.toy.toyType && (
                          <ItemType>{item.toy.toyType.name}</ItemType>
                        )}
                      </ItemInfo>
                      <ItemQuantity>数量: {item.quantity}</ItemQuantity>
                      <ItemPrice>¥{(item.price * item.quantity).toFixed(2)}</ItemPrice>
                    </OrderItem>
                  ))}
                </OrderItems>
              </OrderCard>
            ))}
          </AnimatePresence>
        </OrdersContainer>
      </motion.div>
    </Container>
  );
}