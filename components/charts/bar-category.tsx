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

const chartConfig = {
  count: {
    label: "Productos",
    color: "var(--chart-1)",
  },
};

interface BarCategoryChartProps {
  data: Array<{ category: string; count: number }>;

  total: number;
  lowStock: number;
  outOfStock: number;
  featured: number;
  loading?: boolean;
  error?: string | null;
}

export default function BarCategoryChart({
  data,
  total,
  lowStock,
  outOfStock,
  featured,
  loading,
  error,
}: BarCategoryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos por Categoría</CardTitle>
        <CardDescription>
          Distribución de productos por categoría
        </CardDescription>
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
                <div className="text-xs text-muted-foreground">Stock bajo</div>
                <div className="font-bold text-lg">{lowStock}</div>
              </div>
              <div className="bg-muted rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">Sin stock</div>
                <div className="font-bold text-lg">{outOfStock}</div>
              </div>
              <div className="bg-muted rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">Destacados</div>
                <div className="font-bold text-lg">{featured}</div>
              </div>
            </div>
            <ChartContainer
              config={chartConfig}
              className="min-h-[220px] w-full"
            >
              <BarChart data={data} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis allowDecimals={false} />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="count" fill="var(--chart-1)" name="Productos" />
              </BarChart>
            </ChartContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}
