"use client";

import { OrderDetailsModal } from "@/components/profile/order-details-modal";
import { OrdersTable } from "@/components/profile/orders-table";
import { OrdersTableSkeleton } from "@/components/profile/orders-table-skeleton";
import { ProfileForm } from "@/components/profile/profile-form";
import { ProfileFormSkeleton } from "@/components/profile/profile-form-skeleton";
import { useOrderHistory } from "@/lib/hooks/use-order-history";
import { useUserData } from "@/lib/hooks/use-user-data";
import { useSessionStore } from "@/lib/store";
import { Order } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, isLoggedIn, updateUser, logout, token } = useSessionStore();
  const [mounted, setMounted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const router = useRouter();

  // Wait for component mount to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Route protection - only logged in Clients
  useEffect(() => {
    if (!mounted) return;

    if (!isLoggedIn || user?.role !== "Client") {
      router.replace("/");
    }
  }, [isLoggedIn, user, router, mounted]);
  // Fetch user data using custom hook (SRP)
  const handleUserDataSuccess = useCallback(
    (userData: any) => {
      updateUser(userData);
    },
    [updateUser]
  );

  const {
    userData,
    isLoading: isUserDataLoading,
    refetch: refetchUserData,
  } = useUserData({
    userId: user?.id,
    token,
    onSuccess: handleUserDataSuccess,
  });

  // Fetch order history using custom hook (SRP)
  const { orders, isLoading: isOrdersLoading } = useOrderHistory({
    userId: user?.id,
    userRole: user?.role,
    isLoggedIn,
    token,
  });

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
    setOrderModalOpen(true);
  };

  const handleModalClose = () => {
    setOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const handleProfileUpdate = useCallback(
    (userData: Partial<import("@/lib/types").User>) => {
      updateUser(userData);
      refetchUserData();
    },
    [updateUser, refetchUserData]
  );

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="container mx-auto min-h-[80vh] px-4 py-12 flex flex-col gap-8 max-w-5xl">
        <ProfileFormSkeleton />
        <div className="bg-card rounded-lg shadow p-8">
          <h3 className="font-semibold text-xl mb-4">Historial de órdenes</h3>
          <OrdersTableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-[80vh] px-4 py-12 flex flex-col gap-8 max-w-5xl">
      {isUserDataLoading ? (
        <ProfileFormSkeleton />
      ) : (
        <ProfileForm
          user={user}
          token={token}
          onUpdateSuccess={handleProfileUpdate}
          onLogout={logout}
          initialData={userData || undefined}
        />
      )}

      <div className="bg-card rounded-lg shadow p-8">
        <h3 className="font-semibold text-xl mb-4">Historial de órdenes</h3>
        {isOrdersLoading ? (
          <OrdersTableSkeleton />
        ) : (
          <OrdersTable orders={orders} onOrderSelect={handleOrderSelect} />
        )}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isOrderModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
