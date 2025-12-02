// Type definitions for the application

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  id: string;
  productId: number;
  productName: string;
  quantity: number;
  priceInCents: number;
  totalPrice: string;
}

export interface Order {
  id: string;
  userId: string;
  userFullName: string;
  userEmail: string;
  status: OrderStatus;
  totalAmountInCents: number;
  deliveryAddress: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  role: string;
  phone?: string;
  address?: string;
}
