import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/lib/api";
import { useSessionStore } from "@/lib/store";
import {
  sanitizeInput,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "@/lib/validators";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const login = useSessionStore((state) => state.login);

  const handleRegister = async ({
    name,
    email,
    password,
    confirmPassword,
  }: RegisterData) => {
    // Validate password match
    const passwordMatchValidation = validatePasswordMatch(
      password,
      confirmPassword
    );
    if (!passwordMatchValidation.isValid) {
      toast({
        title: "Error",
        description: passwordMatchValidation.error,
        variant: "destructive",
      });
      return;
    }

    // Validate email format (OWASP - Input Validation)
    if (!validateEmail(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
        variant: "destructive",
      });
      return;
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast({
        title: "Contraseña débil",
        description: passwordValidation.error,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Sanitize input (OWASP - Input Sanitization)
      const sanitizedName = sanitizeInput(name);

      const data = await registerUser({
        email,
        password,
        fullName: sanitizedName,
      });

      login(data.user, data.access_token);

      toast({
        title: "Registro exitoso",
        description: `Bienvenido ${data.user.fullName || sanitizedName}!`,
      });

      // Redirect based on user role
      const redirectPath = data.user.role === "Admin" ? "/admin" : "/profile";
      router.push(redirectPath);
    } catch (err: any) {
      // Never expose sensitive system information (OWASP)
      toast({
        title: "Error de registro",
        description: err.message || "No se pudo crear la cuenta.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, isLoading };
}
