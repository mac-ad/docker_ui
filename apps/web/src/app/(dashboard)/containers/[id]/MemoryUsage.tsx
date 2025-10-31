

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { convertSize, getMemoryPercentage, getTimeFromISO } from '@repo/shared'
import { Activity, Microchip } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'

const MemoryUsage = ({
    data,
    refresh_interval,
}: {
    data: {
        time: string;
        memory: number;
        totalMemory: number;
    };
    refresh_interval: number;
}) => {

    const [chartData, setChartData] = useState<{
        memory: number | string;
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
        setChartData((prev) => {
            const usedMemory = convertSize({
                sizeInBytes: data?.memory,
                addSuffix: false,
            })
            return ([
                ...prev,
                {
                    time: getTimeFromISO(data?.time),
                    memory: usedMemory,
                    perc: getMemoryPercentage({
                        used: parseInt(usedMemory),
                        total: data?.totalMemory
                    })
                }
            ])
        })
    }, [data])

    return (
        <Card>
            <CardHeader>
                <div className="flex lg:items-center flex-col lg:flex-row gap-2">
                    <div className="flex items-center gap-2">
                        <Microchip className="h-5" />
                        <h1>Memory usage</h1>
                    </div>
                    <p className="text-muted-foreground text-xs">Refreshes every {refresh_interval / 1000} seconds.</p>
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
                            tickFormatter={(value) => `${value}MB`}
                            domain={[0, 200]}
                        />
                        {/* <ChartTooltip
                            content={<ChartTooltipContent formatter={((value, name, item)) => `${value} MB `} />}
                        /> */}
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    formatter={(value, name, item) => {
                                        const point = item?.payload;
                                        console.log("point = ", point)
                                        return `${value} MB`
                                    }}
                                />
                            }
                        />
                        <Area
                            dataKey="memory"
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

export default MemoryUsage
