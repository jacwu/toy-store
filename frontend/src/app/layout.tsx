import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext'; // Import AuthProvider

export const metadata: Metadata = {
  title: '玩具商店 - 发现精彩玩具世界',
  description: '专业的玩具电商平台，提供益智玩具、遥控玩具、户外玩具等各类优质玩具产品',
  keywords: '玩具,益智玩具,遥控玩具,户外玩具,玩偶,电商',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <AuthProvider> {/* Wrap with AuthProvider */}
          <CartProvider>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
