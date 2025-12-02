import { API_BASE_URL } from "./config";

// Create checkout session (Stripe + cart persistence)
export async function createCheckoutSession(
  userId: string,
  items: any[],
  token: string
): Promise<{ sessionId: string; stripeUrl: string }> {
  const total = items.reduce(
    (sum, item) =>
      sum + Math.round(parseFloat(item.price) * 100) * item.quantity,
    0
  );

  const payload = {
    userId,
    items: items.map((item) => ({
      productId: String(item.id),
      quantity: item.quantity,
      price: Math.round(parseFloat(item.price) * 100),
    })),
    total,
    currency: "usd",
    successUrl: `${window.location.origin}/checkout/confirmation`,
    cancelUrl: `${window.location.origin}/checkout/cancel`,
  };

  const response = await fetch(`${API_BASE_URL}/payments/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create checkout session");
  }

  const data = await response.json();
  return data;
}

// Get checkout session data
export async function getCheckoutSession(sessionId: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/payments/session/${sessionId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error fetching checkout session");
  }
  return await res.json();
}

// Mark checkout session as complete
export async function completeCheckoutSession(
  sessionId: string,
  token: string
) {
  const res = await fetch(
    `${API_BASE_URL}/payments/session/${sessionId}/complete`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error completing checkout session");
  }
  return await res.json();
}
