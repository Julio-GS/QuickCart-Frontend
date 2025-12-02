import { API_BASE_URL } from "./config";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  priceInCents: number;
  stock: number;
  category: string;
  imageUrl: string;
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export async function getProducts(params?: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();

  if (params?.search) searchParams.append("search", params.search);
  if (params?.category) searchParams.append("category", params.category);
  if (params?.minPrice)
    searchParams.append("minPrice", params.minPrice.toString());
  if (params?.maxPrice)
    searchParams.append("maxPrice", params.maxPrice.toString());
  if (params?.inStock !== undefined)
    searchParams.append("inStock", params.inStock.toString());
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);

  const url = `${API_BASE_URL}/products${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  try {
    // Strategic caching: cache static product lists but not searches/filters
    const cacheStrategy =
      params?.search || params?.category || params?.page
        ? { cache: "no-store" as const }
        : { next: { revalidate: 60 } };

    const response = await fetch(url, cacheStrategy);
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to fetch products: ${response.status} ${errorBody}`
      );
    }

    const raw = await response.json();

    // Normalize structure for ShopPage
    let products: Product[] = [];
    let meta: any = {};
    if (Array.isArray(raw)) {
      products = raw;
      meta = {};
    } else if (raw.products && Array.isArray(raw.products)) {
      products = raw.products;
      meta = raw.pagination || {};
    } else if (raw.data && Array.isArray(raw.data)) {
      products = raw.data;
      meta = raw.meta || {};
    } else {
      products = [];
      meta = {};
    }

    return { data: products, meta };
  } catch (error) {
    throw new Error(`Error fetching products: ${error}`);
  }
}

export async function getFeaturedProducts() {
  try {
    // Cache featured products for 5 minutes
    const response = await fetch(`${API_BASE_URL}/products?limit=50`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to fetch featured products: ${response.status} ${errorBody}`
      );
    }

    const data = await response.json();

    // Handle different response formats
    let products = [];
    if (Array.isArray(data)) {
      products = data;
    } else if (data.data && Array.isArray(data.data)) {
      products = data.data;
    } else if (data.products && Array.isArray(data.products)) {
      products = data.products;
    }

    const featuredProducts = products
      .filter((p: Product) => p.isFeatured && p.isAvailable)
      .slice(0, 6);

    return featuredProducts;
  } catch (error) {
    throw new Error(`Error fetching featured products: ${error}`);
  }
}

export async function getCategories() {
  // Cache categories for 10 minutes - they rarely change
  const response = await fetch(`${API_BASE_URL}/products/categories`, {
    next: { revalidate: 600 },
  });
  if (!response.ok) throw new Error("Failed to fetch categories");

  return response.json();
}

export async function getProductById(id: number | string) {
  try {
    // Cache individual products for 5 minutes
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Product not found: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching product by ID: ${error}`);
  }
}

export async function getProductBySlug(slug: string) {
  try {
    // Cache product by slug for 5 minutes
    // Note: The API accepts slug directly as /products/{slug}, not /products/slug/{slug}
    const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Product not found: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching product by slug: ${error}`);
  }
}
