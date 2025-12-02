import { ProfileForm } from "@/components/profile/profile-form";
import { render, screen } from "@testing-library/react";

const mockUser = {
  id: "1",
  email: "test@test.com",
  fullName: "Test User",
  firstName: "Test",
  lastName: "User",
  role: "Customer",
  phone: "1234567890",
  address: "123 Test St",
};

const mockOnUpdateSuccess = jest.fn();
const mockOnLogout = jest.fn();

describe("ProfileForm", () => {
  beforeEach(() => {
    mockOnUpdateSuccess.mockClear();
    mockOnLogout.mockClear();
  });

  it("renders form fields with user data", () => {
    render(
      <ProfileForm
        user={mockUser}
        token="test-token"
        onUpdateSuccess={mockOnUpdateSuccess}
        onLogout={mockOnLogout}
      />
    );

    expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test@test.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 Test St")).toBeInTheDocument();
  });

  it("renders all form labels", () => {
    render(
      <ProfileForm
        user={mockUser}
        token="test-token"
        onUpdateSuccess={mockOnUpdateSuccess}
        onLogout={mockOnLogout}
      />
    );

    expect(screen.getByText("Nombre completo")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Teléfono")).toBeInTheDocument();
    expect(screen.getByText("Dirección")).toBeInTheDocument();
  });

  it("renders edit and logout buttons", () => {
    render(
      <ProfileForm
        user={mockUser}
        token="test-token"
        onUpdateSuccess={mockOnUpdateSuccess}
        onLogout={mockOnLogout}
      />
    );

    expect(screen.getByText("Editar perfil")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("disables inputs by default", () => {
    render(
      <ProfileForm
        user={mockUser}
        token="test-token"
        onUpdateSuccess={mockOnUpdateSuccess}
        onLogout={mockOnLogout}
      />
    );

    const nameInput = screen.getByDisplayValue("Test User");
    expect(nameInput).toBeDisabled();
  });
});
