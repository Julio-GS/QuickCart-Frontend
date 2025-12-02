import { ProductCard } from "@/components/product-card";
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
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockAddItem = jest.fn();

jest.mock("@/lib/store", () => ({
  useCartStore: jest.fn(() => ({
    addItem: mockAddItem,
  })),
}));

describe("ProductCard", () => {
  beforeEach(() => {
    mockAddItem.mockClear();
  });

  it("renders product name and price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/\$10.00/)).toBeInTheDocument();
  });

  it("renders add to cart button", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/Agregar al Carrito/i)).toBeInTheDocument();
  });

  it("shows featured badge when product is featured", () => {
    const featuredProduct = { ...mockProduct, isFeatured: true };
    render(<ProductCard product={featuredProduct} />);
    expect(screen.getByText("Destacado")).toBeInTheDocument();
  });

  it("shows out of stock badge when stock is 0", () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);
    const agotadoElements = screen.getAllByText("Agotado");
    expect(agotadoElements.length).toBeGreaterThan(0);
  });

  it("shows low stock badge when stock is low", () => {
    const lowStockProduct = { ...mockProduct, stock: 3 };
    render(<ProductCard product={lowStockProduct} />);
    expect(screen.getByText("Stock Bajo")).toBeInTheDocument();
  });
});
