"use client";

import { AdminDashboardSkeleton } from "@/components/admin/admin-dashboard-skeleton";
import { OrderFilters } from "@/components/admin/order-filters";
import { OrdersTable } from "@/components/admin/orders-table";
import BarCategoryChart from "@/components/charts/bar-category";
import BarOrderStatusChart from "@/components/charts/bar-order-status";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrderStats } from "@/lib/hooks/use-order-stats";
import { useOrderStatusUpdate } from "@/lib/hooks/use-order-status-update";
import { useOrders } from "@/lib/hooks/use-orders";
import { useProductStats } from "@/lib/hooks/use-product-stats";
import { useSessionStore } from "@/lib/store";
import { OrderStatus } from "@/lib/types";
import { BarChart3, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function AdminPage() {
  const { user, isLoggedIn, token } = useSessionStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchId, setSearchId] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Route protection
  useEffect(() => {
    if (!mounted) return;

    if (!isLoggedIn || user?.role !== "Admin") {
      router.replace("/");
    }
  }, [mounted, isLoggedIn, user, router]);

  // Fetch data using custom hooks
  const {
    orders,
    setOrders,
    isLoading: ordersLoading,
  } = useOrders({
    token,
    mounted,
  });

  const {
    stats: productStats,
    isLoading: productStatsLoading,
    error: productStatsError,
  } = useProductStats({ token, mounted });

  const {
    stats: orderStats,
    isLoading: orderStatsLoading,
    error: orderStatsError,
    refetch: refetchOrderStats,
  } = useOrderStats({ token, mounted });

  // Handle order status updates
  const { updateStatus, updatingOrderId } = useOrderStatusUpdate({
    token,
    onSuccess: refetchOrderStats,
  });

  const handleStatusUpdate = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    await updateStatus(orderId, newStatus, (id, status) => {
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order))
      );
    });
  };

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) => {
      const statusMatch =
        statusFilter === "all" ? true : order.status === statusFilter;
      const idMatch =
        searchId.trim() === "" ||
        order.id?.toLowerCase().includes(searchId.trim().toLowerCase());
      return statusMatch && idMatch;
    });
  }, [orders, statusFilter, searchId]);

  // Show skeleton while loading or before mount
  if (!mounted || ordersLoading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Revisa las órdenes y el rendimiento de tu tienda.
        </p>
      </div>

      {/* Mobile: Tabs para organizar contenido */}
      <Tabs defaultValue="orders" className="space-y-6 md:hidden">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Órdenes
          </TabsTrigger>
          <TabsTrigger value="stats" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Estadísticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Órdenes Recientes</CardTitle>
              <CardDescription className="text-sm">
                Revisa y gestiona las órdenes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <OrderFilters
                statusFilter={statusFilter}
                searchId={searchId}
                onStatusChange={setStatusFilter}
                onSearchChange={setSearchId}
              />
              <div className="overflow-x-auto -mx-4 px-4">
                <OrdersTable
                  orders={filteredOrders}
                  updatingOrderId={updatingOrderId}
                  onStatusUpdate={handleStatusUpdate}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <BarCategoryChart
            data={productStats?.byCategory || []}
            total={productStats?.total || 0}
            lowStock={productStats?.lowStock || 0}
            outOfStock={productStats?.outOfStock || 0}
            featured={productStats?.featured || 0}
            loading={productStatsLoading}
            error={productStatsError}
          />
          <BarOrderStatusChart
            data={orderStats?.byStatus || []}
            total={orderStats?.total || 0}
            totalRevenue={orderStats?.totalRevenue || 0}
            averageOrderValue={orderStats?.averageOrderValue || 0}
            recentOrders={orderStats?.recentOrders || 0}
            loading={orderStatsLoading}
            error={orderStatsError}
          />
        </TabsContent>
      </Tabs>

      {/* Desktop: Layout tradicional */}
      <div className="hidden md:block space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <BarCategoryChart
            data={productStats?.byCategory || []}
            total={productStats?.total || 0}
            lowStock={productStats?.lowStock || 0}
            outOfStock={productStats?.outOfStock || 0}
            featured={productStats?.featured || 0}
            loading={productStatsLoading}
            error={productStatsError}
          />
          <BarOrderStatusChart
            data={orderStats?.byStatus || []}
            total={orderStats?.total || 0}
            totalRevenue={orderStats?.totalRevenue || 0}
            averageOrderValue={orderStats?.averageOrderValue || 0}
            recentOrders={orderStats?.recentOrders || 0}
            loading={orderStatsLoading}
            error={orderStatsError}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Órdenes Recientes</CardTitle>
            <CardDescription>
              Revisa y gestiona las órdenes de los clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrderFilters
              statusFilter={statusFilter}
              searchId={searchId}
              onStatusChange={setStatusFilter}
              onSearchChange={setSearchId}
            />
            <OrdersTable
              orders={filteredOrders}
              updatingOrderId={updatingOrderId}
              onStatusUpdate={handleStatusUpdate}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
