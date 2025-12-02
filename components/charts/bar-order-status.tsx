"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export interface BarOrderStatusChartProps {
  data: Array<{ status: string; count: number }>;
  total: number;
  totalRevenue: number;
  averageOrderValue: number;
  recentOrders: number;
  loading?: boolean;
  error?: string | null;
}

const chartConfig = {
  count: {
    label: "Órdenes",
    color: "var(--chart-2)",
  },
};

export default function BarOrderStatusChart({
  data,
  total,
  totalRevenue,
  averageOrderValue,
  recentOrders,
  loading,
  error,
}: BarOrderStatusChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Órdenes por Estado</CardTitle>
        <CardDescription>Distribución de órdenes por estado</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-center text-muted-foreground">
            Cargando estadísticas...
          </div>
        ) : error ? (
          <div className="py-8 text-center text-destructive">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-muted rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">Total</div>
                <div className="font-bold text-lg">{total}</div>
              </div>
              <div className="bg-muted rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">Ingresos</div>
                <div className="font-bold text-lg">
                  ${(totalRevenue / 100).toLocaleString()}
                </div>
              </div>
              <div className="bg-muted rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">
                  Promedio orden
                </div>
                <div className="font-bold text-lg">
                  ${(averageOrderValue / 100).toLocaleString()}
                </div>
              </div>
              <div className="bg-muted rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">
                  Órdenes recientes
                </div>
                <div className="font-bold text-lg">{recentOrders}</div>
              </div>
            </div>
            <ChartContainer
              config={chartConfig}
              className="min-h-[220px] w-full"
            >
              <BarChart data={data} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="status"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis allowDecimals={false} />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="count" fill="var(--chart-2)" name="Órdenes" />
              </BarChart>
            </ChartContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}
