import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getTimeFromISO } from '@repo/shared';
import { Activity, Cpu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';

const CpuUsage = ({
    data,
    refresh_interval
}: {
    data: {
        time: string;
        cpu: number | string;
    };
    refresh_interval: number;
}) => {

    const [chartData, setChartData] = useState<{
        cpu: number | string;
        time: string;
    }[]>([])


    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
            icon: Activity,
        },
    } satisfies ChartConfig


    useEffect(() => {
        if (!data || !data?.time) return;
        setChartData((prev) => ([
            ...prev,
            {
                time: getTimeFromISO(data?.time),
                cpu: data?.cpu
            }
        ]))
    }, [data])


    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Cpu className="h-5" />
                    <h1>Cpu usage</h1>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="time"
                        />
                        <YAxis
                            tickFormatter={(value) => `${value}`}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent formatter={(value) => `${value} %`} />}
                        />
                        <Area
                            dataKey="cpu"
                            type="monotone"
                            fill="var(--color-primary)"
                            fillOpacity={0.4}
                            stroke="var(--color-primary)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>

    )
}

export default CpuUsage
