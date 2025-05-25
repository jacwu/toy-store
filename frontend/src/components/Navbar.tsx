'use client';

// useEffect and useState are no longer needed for auth state here
// import { useEffect, useState } from 'react'; 
// useRouter is no longer needed for logout redirection
// import { useRouter, usePathname } from 'next/navigation'; 
import { usePathname } from 'next/navigation'; // Keep if other parts of Navbar use it
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

const NavContainer = styled(motion.nav)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const Logo = styled(motion.h1)`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(motion.a)`
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  cursor: pointer; // Added for button-like NavLinks if used with onClick

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const NavButton = styled(motion.button)`
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1); // Slightly different background to distinguish
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const WelcomeText = styled(motion.span)`
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem; // Adjusted spacing
`;

const CartButton = styled(motion.a)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export default function Navbar() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  // const router = useRouter(); // Not needed for logout anymore
  const pathname = usePathname(); // Keep if used for other path-dependent logic
  const { user, isLoggedIn, logout, isLoading } = useAuth(); // Use AuthContext

  // Local state and useEffect for auth are removed. AuthProvider handles this.

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    // Redirection is handled by AuthContext's logout
  };
  
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  // Optionally, show a loading state or nothing until auth status is confirmed
  // if (isLoading) {
  //   return null; // Or a loading spinner, or a simplified Navbar
  // }

  return (
    <NavContainer
      variants={navVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
    >
      <NavContent>
        <Link href="/" passHref>
          <Logo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🧸 玩具商店
          </Logo>
        </Link>

        <NavLinks>
          <Link href="/" passHref>
            <NavLink
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              首页
            </NavLink>
          </Link>
          <Link href="/about" passHref>
            <NavLink
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              关于我们
            </NavLink>
          </Link>

          {/* Display content based on isLoading and isLoggedIn */}
          {!isLoading && isLoggedIn && user ? (
            <>
              <WelcomeText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                欢迎, {user.username}
              </WelcomeText>
              <NavButton
                onClick={handleLogout} // Uses context's logout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                退出
              </NavButton>
            </>
          ) : !isLoading && !isLoggedIn ? (
            <>
              <Link href="/login" passHref>
                <NavLink
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  登录
                </NavLink>
              </Link>
              <Link href="/register" passHref>
                <NavLink
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  注册
                </NavLink>
              </Link>
            </>
          ) : null} {/* Render nothing or a placeholder during isLoading */}


          <Link href="/cart" passHref>
            <CartButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              购物车 ({itemCount})
            </CartButton>
          </Link>

        </NavLinks>
      </NavContent>
    </NavContainer>
  );
}
