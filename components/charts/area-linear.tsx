"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A linear area chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export interface ChartAreaLinearProps {
  data: Array<{ month: string; totalSales: number; orderCount: number }>;
}

export function ChartAreaLinear({ data }: ChartAreaLinearProps) {
  const chartConfig = {
    totalSales: {
      label: "Total Sales",
      color: "var(--chart-1)",
    },
    orderCount: {
      label: "Order Count",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas y Órdenes por Mes</CardTitle>
        <CardDescription>
          Visualización de ventas totales y cantidad de órdenes agrupadas por
          mes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => String(value).slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="totalSales"
              type="linear"
              fill="var(--chart-1)"
              fillOpacity={0.4}
              stroke="var(--chart-1)"
              name="Total Sales"
            />
            <Area
              dataKey="orderCount"
              type="linear"
              fill="var(--chart-2)"
              fillOpacity={0.2}
              stroke="var(--chart-2)"
              name="Order Count"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {/* Puedes mostrar aquí insights dinámicos si lo deseas */}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Datos agrupados por mes
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChartAreaLinear;
