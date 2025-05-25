'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { Loading } from '@/components';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const CartContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr auto;
  padding: 1rem;
  background-color: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  color: #4a5568;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CartItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr auto;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto auto;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-row: 1 / span 3;
  }
`;

const ImageFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 1;
  }
`;

const ProductName = styled.h3`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const ProductType = styled.p`
  font-size: 0.875rem;
  color: #718096;
`;

const Price = styled.div`
  color: #4a5568;
  text-align: center;

  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 2;
    text-align: left;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 3;
    justify-content: flex-start;
  }
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: #e2e8f0;
  color: #4a5568;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 28px;
  text-align: center;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  margin: 0 0.5rem;
`;

const Subtotal = styled.div`
  font-weight: 600;
  color: #4a5568;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RemoveButton = styled.button`
  color: #e53e3e;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;

  &:hover {
    color: #c53030;
  }

  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 3;
    justify-self: flex-end;
  }
`;

const CartSummary = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #4a5568;

  &:last-child {
    margin-bottom: 0;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
  }
`;

const CheckoutButton = styled(motion.button)`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const EmptyCartMessage = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const EmptyCartText = styled.h2`
  font-size: 1.5rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

const ContinueShoppingButton = styled(motion.a)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const OrderSuccessContainer = styled(motion.div)`
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SuccessIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SuccessMessage = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
`;

const BackToShoppingButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    color: #38a169;
  }
`;

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };
  const handleCheckout = () => {
    setLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setLoading(false);
      setOrderSuccess(true);
    }, 1500);
  };

  const handleBackToShopping = () => {
    setOrderSuccess(false);
    // Clear cart after successful order
    items.forEach(item => removeFromCart(item.id));
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

  if (items.length === 0) {
    return (
      <Container>
        <PageTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          购物车
        </PageTitle>
        <EmptyCartMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EmptyCartIcon>🛒</EmptyCartIcon>
          <EmptyCartText>您的购物车是空的</EmptyCartText>
          <Link href="/" passHref>
            <ContinueShoppingButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              继续购物
            </ContinueShoppingButton>
          </Link>
        </EmptyCartMessage>
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
        购物车
      </PageTitle>

      <AnimatePresence>
        {orderSuccess && (
          <OrderSuccessContainer
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <SuccessIcon>✅</SuccessIcon>
            <SuccessTitle>订单提交成功！</SuccessTitle>
            <SuccessMessage>感谢您的购买，我们将尽快为您处理订单。</SuccessMessage>
            <Link href="/" passHref>
              <BackToShoppingButton
                onClick={handleBackToShopping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                继续购物
              </BackToShoppingButton>
            </Link>
          </OrderSuccessContainer>
        )}
      </AnimatePresence>

      {!orderSuccess && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <CartContainer variants={itemVariants}>
          <CartHeader>
            <div>商品</div>
            <div>名称</div>
            <div>单价</div>
            <div>数量</div>
            <div>小计</div>
            <div></div>
          </CartHeader>

          <AnimatePresence>
            {items.map(item => (
              <CartItem
                key={item.id}
                variants={itemVariants}
                exit={{ opacity: 0, x: -100 }}
              >
                <ImageContainer>
                  {!imageErrors[item.id] ? (
                    <Image
                      src={`/images/toys/${item.id}.png`}
                      alt={item.toy.name}
                      fill
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <ImageFallback>
                      {item.toy.name.charAt(0).toUpperCase()}
                    </ImageFallback>
                  )}
                </ImageContainer>

                <ProductInfo>
                  <ProductName>{item.toy.name}</ProductName>
                  {item.toy.toyType && (
                    <ProductType>{item.toy.toyType.name}</ProductType>
                  )}
                </ProductInfo>

                <Price>¥{item.toy.price.toFixed(2)}</Price>

                <QuantityControl>
                  <QuantityButton
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </QuantityButton>
                  <QuantityInput
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                    }
                  />
                  <QuantityButton
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>

                <Subtotal>¥{(item.toy.price * item.quantity).toFixed(2)}</Subtotal>

                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  ×
                </RemoveButton>
              </CartItem>
            ))}
          </AnimatePresence>
        </CartContainer>

        <CartSummary
          variants={itemVariants}
          transition={{ delay: 0.2 }}
        >
          <SummaryRow>
            <span>商品总数:</span>
            <span>{items.reduce((sum, item) => sum + item.quantity, 0)} 件</span>
          </SummaryRow>
          <SummaryRow>
            <span>总计:</span>
            <span>¥{getCartTotal().toFixed(2)}</span>
          </SummaryRow>          <CheckoutButton
            onClick={handleCheckout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            提交订单
          </CheckoutButton>
        </CartSummary>
        </motion.div>
      )}
    </Container>
  );
}