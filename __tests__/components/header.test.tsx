import { Header } from "@/components/header";
import { render, screen } from "@testing-library/react";

// Mock Zustand stores
jest.mock("@/lib/store", () => ({
  useCartStore: jest.fn(() => ({
    totalItems: () => 0,
  })),
  useSessionStore: jest.fn(() => ({
    user: null,
    isLoggedIn: false,
    logout: jest.fn(),
  })),
}));

describe("Header", () => {
  it("renders logo and navigation", () => {
    render(<Header />);
    expect(screen.getByText(/QuickCart/i)).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Header />);
    const searchInputs = screen.getAllByPlaceholderText(/search products/i);
    expect(searchInputs.length).toBeGreaterThan(0);
  });

  it("renders cart and user buttons", () => {
    render(<Header />);
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.getByText(/user menu/i)).toBeInTheDocument();
  });
});
