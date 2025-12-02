import { API_BASE_URL } from "./config";

// Get all orders for admin
export async function getAllOrders(
  token: string,
  params?: { sortBy?: string; sortOrder?: string }
) {
  const searchParams = new URLSearchParams();
  if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);
  const url = `${API_BASE_URL}/orders${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(errorBody || "No se pudo obtener las órdenes");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "No se pudo obtener las órdenes");
  }
}

// Get user order history
export async function getUserOrderHistory(userId: string, token: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/orders/user/${userId}/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(errorBody || "No se pudo obtener el historial");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "No se pudo obtener el historial");
  }
}

// Update order status (admin)
export async function updateOrderStatus(
  orderId: string,
  status: string,
  token: string
) {
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error updating order status");
  return await res.json();
}

// Fetch product stats for admin charts
export async function getAdminProductStats(token: string) {
  const res = await fetch(`${API_BASE_URL}/products/admin/stats`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error fetching product stats");
  return await res.json();
}

// Fetch order stats for admin charts
export async function getAdminOrderStats(token: string) {
  const res = await fetch(`${API_BASE_URL}/orders/admin/stats`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error fetching order stats");
  return await res.json();
}

// Create a new order
export async function createOrder(
  token: string,
  order: {
    items: Array<{ productId: number; quantity: number }>;
    deliveryAddress: string;
  }
) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error creating order");
  return await res.json();
}
