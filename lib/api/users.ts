import { API_BASE_URL } from "./config";

// Get full user data by ID (authenticated)
export async function getUserById(id: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(errorBody || "No se pudo obtener los datos del usuario");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(
      error?.message || "No se pudo obtener los datos del usuario"
    );
  }
}

// Update user profile
export async function updateUserProfile({
  id,
  token,
  fullName,
  email,
  phone,
  address,
}: {
  id: string;
  token: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fullName, email, phone, address }),
      cache: "no-store",
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(errorBody || "No se pudo actualizar el perfil");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "No se pudo actualizar el perfil");
  }
}
