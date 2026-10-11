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
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

const chartConfig = {
  count: {
    color: "var(--chart-1)",
    label: "Count",
  },
} satisfies ChartConfig;

export const OrderCreatedChart = ({
  data,
}: {
  data: OrderStatistics["createdByDay"];
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Orders Placed Over Time</CardTitle>
      <CardDescription>Daily order volume · Last 30 days</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer className="aspect-video" config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={data}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="created"
            minTickGap={32}
            // tickFormatter={(value) => value.slice(0, 4)}
            tickLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            content={<ChartTooltipContent hideLabel />}
            cursor={false}
          />
          <Bar
            className="max-w-10"
            dataKey="count"
            fill="var(--color-chart-1)"
            radius={4}
          >
            <LabelList
              className="fill-foreground"
              fontSize={12}
              offset={12}
              position="top"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
