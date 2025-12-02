import { AddToCartButton } from "@/components/add-to-cart-button";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockProduct = {
  id: 1,
  name: "Test Product",
  slug: "test-product",
  description: "Test description",
  price: "10.00",
  priceInCents: 1000,
  category: "Test",
  stock: 10,
  imageUrl: "/test.jpg",
  isFeatured: false,
  isAvailable: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

const mockAddItem = jest.fn();

jest.mock("@/lib/store", () => ({
  useCartStore: jest.fn(() => ({
    addItem: mockAddItem,
  })),
}));

describe("AddToCartButton", () => {
  beforeEach(() => {
    mockAddItem.mockClear();
  });

  it("renders add to cart button", () => {
    render(<AddToCartButton product={mockProduct} />);
    expect(screen.getByText(/Agregar al Carrito/i)).toBeInTheDocument();
  });

  it("shows quantity controls", () => {
    render(<AddToCartButton product={mockProduct} />);
    expect(screen.getByText("Cantidad")).toBeInTheDocument();
    expect(screen.getByText("10 disponibles")).toBeInTheDocument();
  });

  it("disables button when stock is 0", () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<AddToCartButton product={outOfStockProduct} />);
    expect(screen.getByText(/Agotado/i)).toBeDisabled();
  });
});
