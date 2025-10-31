import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { convertSize, getTimeFromISO } from '@repo/shared'
import { Activity, Cable } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'

const IOUsage = ({
    data,
    refresh_interval
}: {
    data: {
        time: number;
        read: number;
        write: number;
    }
    refresh_interval: number;
}) => {

    const [chartData, setChartData] = useState<{
        time: string;
        read: string;
        write: string;
    }[]>([])


    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
            icon: Activity,
        },
    } satisfies ChartConfig

    console.log("data", data)

    useEffect(() => {
        if (!data || !data?.time) return;

        let dataToAdd = {
            time: getTimeFromISO(data?.time?.toString()),
            read: convertSize({
                sizeInBytes: data.read,
                addSuffix: false
            }),
            write: convertSize({
                sizeInBytes: data.write,
                addSuffix: false
            })
        }
        setChartData((prev) => ([
            ...prev,
            dataToAdd
        ]))
    }, [data])

    console.log("chartData", chartData)

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Cable className="h-5" />
                    <h1>I/O usage (aggregate) </h1>
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
                            tickFormatter={(value) => `${value} MB`}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent formatter={(value, name, item) => `${name} : ${value} MB`} indicator='dashed' />}
                        />
                        <Area type="monotone" dataKey="read" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="write" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default IOUsage
