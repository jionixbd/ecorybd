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
  type ChartConfig,
} from "@/components/ui/chart";
import type { OrderStatistics } from "@/features/order/types/order";
import { formatBDT } from "@/lib/format-bdt";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  cancelled: {
    color: "var(--chart-3)",
    label: "Cancelled",
  },
  confirmed: {
    color: "var(--chart-2)",
    label: "Confirmed",
  },
  pending: {
    color: "var(--chart-1)",
    label: "pending",
  },
} satisfies ChartConfig;

export const OrderMonetaryChart = ({
  data,
}: {
  data: OrderStatistics["amountByStatus"];
}) => (
  <Card className="flex flex-col">
    <CardHeader className="items-center pb-0">
      <CardTitle>Order Value by Status</CardTitle>
      <CardDescription>
        Total order amount per status · Last 30 days
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-1 pb-0">
      <ChartContainer className="aspect-video" config={chartConfig}>
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent hideLabel />}
            cursor={false}
          />
          <Pie
            data={data.map((item) => ({
              ...item,
              fill: `var(--color-${item.status})`,
            }))}
            dataKey="sum"
            label={({ value }) => formatBDT(value)}
            nameKey="status"
          />
        </PieChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
