'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderItem } from '@/types';
import { CartItem } from '@/contexts/CartContext';

// Order context interface
interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], totalAmount: number) => string;
  getOrderById: (id: string) => Order | undefined;
}

// Create the context with default values
const OrderContext = createContext<OrderContextType>({
  orders: [],
  addOrder: () => '',
  getOrderById: () => undefined,
});

// OrderProvider component
export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on initial mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('toyStoreOrders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Failed to parse orders from localStorage:', error);
        localStorage.removeItem('toyStoreOrders');
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('toyStoreOrders', JSON.stringify(orders));
    } catch (error) {
      console.error('Failed to save orders to localStorage:', error);
    }
  }, [orders]);

  // Add a new order
  const addOrder = (items: CartItem[], totalAmount: number): string => {
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    const orderItems: OrderItem[] = items.map(item => ({
      id: item.id,
      toy: item.toy,
      quantity: item.quantity,
      price: item.toy.price, // Capture price at time of order
    }));

    const newOrder: Order = {
      id: orderId,
      timestamp,
      items: orderItems,
      totalAmount,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]); // Add new order at the beginning
    return orderId;
  };

  // Get order by ID
  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrderContext.Provider 
      value={{ 
        orders, 
        addOrder, 
        getOrderById 
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// Custom hook to use the order context
export function useOrder() {
  return useContext(OrderContext);
}