"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { updateUserProfile } from "@/lib/api";
import { User } from "@/lib/types";
import { sanitizeInput } from "@/lib/validators";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ProfileFormProps {
  user: User | null;
  token: string | null;
  onUpdateSuccess: (userData: Partial<User>) => void;
  onLogout: () => void;
  isLoading?: boolean;
  initialData?: Partial<User>;
}

export function ProfileForm({
  user,
  token,
  onUpdateSuccess,
  onLogout,
  isLoading: isDataLoading = false,
  initialData,
}: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const userData = initialData || user;

  const form = useForm({
    defaultValues: {
      fullName: userData?.fullName || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
    },
    mode: "onChange",
  });

  // Sync form values when initialData or user changes
  useEffect(() => {
    const currentData = initialData || user;
    if (currentData) {
      form.reset({
        fullName: currentData.fullName || "",
        email: currentData.email || "",
        phone: currentData.phone || "",
        address: currentData.address || "",
      });
    }
  }, [initialData, user, form]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    const currentData = initialData || user;
    if (currentData) {
      form.reset({
        fullName: currentData.fullName || "",
        email: currentData.email || "",
        phone: currentData.phone || "",
        address: currentData.address || "",
      });
    }
  };

  const handleSave = form.handleSubmit(async (values) => {
    if (!user?.id || !token) return;

    setIsSaving(true);
    try {
      // Sanitize all user inputs (OWASP - Input Sanitization)
      const sanitizedData = {
        fullName: sanitizeInput(values.fullName),
        email: values.email, // Email doesn't need sanitization (already validated)
        phone: sanitizeInput(values.phone || ""),
        address: sanitizeInput(values.address || ""),
      };

      const updatedUser = await updateUserProfile({
        id: user.id,
        token,
        ...sanitizedData,
      });

      // Update both local state and global store
      onUpdateSuccess(updatedUser);

      // Update form with new data
      form.reset({
        fullName: updatedUser.fullName || sanitizedData.fullName,
        email: updatedUser.email || sanitizedData.email,
        phone: updatedUser.phone || sanitizedData.phone,
        address: updatedUser.address || sanitizedData.address,
      });

      setIsEditing(false);
      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido guardados.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "No se pudo actualizar el perfil.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  });

  return (
    <div className="bg-card rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6">Mi Perfil</h2>
      <Form {...form}>
        <form onSubmit={handleSave} className="space-y-4">
          <FormItem>
            <FormLabel>Nombre completo</FormLabel>
            <FormControl>
              <Input
                id="fullName"
                type="text"
                {...form.register("fullName", { required: true })}
                disabled={!isEditing}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                {...form.register("email", { required: true })}
                disabled={!isEditing}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Teléfono</FormLabel>
            <FormControl>
              <Input
                id="phone"
                type="text"
                {...form.register("phone", { required: true })}
                disabled={!isEditing}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Input
                id="address"
                type="text"
                {...form.register("address", { required: true })}
                disabled={!isEditing}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <div className="flex gap-2 mt-4">
            {isEditing ? (
              <>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Guardando..." : "Guardar"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={handleEdit}
                disabled={isDataLoading}
              >
                Editar perfil
              </Button>
            )}
            <Button
              type="button"
              variant="destructive"
              onClick={onLogout}
              disabled={isDataLoading}
            >
              Logout
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
