import { useToast } from "@/components/ui/use-toast";
import { loginUser } from "@/lib/api";
import { useSessionStore } from "@/lib/store";
import { validateEmail } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const login = useSessionStore((state) => state.login);

  const handleLogin = async (email: string, password: string) => {
    // Validate email format (OWASP - Input Validation)
    if (!validateEmail(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginUser(email, password);
      login(data.user, data.accessToken);

      toast({
        title: "Login exitoso",
        description: `Bienvenido ${data.user.fullName || data.user.email}!`,
      });

      // Redirect based on user role
      const redirectPath = data.user.role === "Admin" ? "/admin" : "/profile";
      router.push(redirectPath);
    } catch (err: any) {
      // Never expose sensitive system information in error messages (OWASP)
      toast({
        title: "Error de login",
        description: err.message || "No se pudo iniciar sesión.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
}
