import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { convertSize, getTimeFromISO } from '@repo/shared';
import { Activity, Network } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

const NetworkUsage = ({
    data,
    refresh_interval,
    time
}: {
    data: any;
    refresh_interval: number;
    time: number;
}) => {

    const [chartData, setChartData] = useState<{
        time: string;
        [key: string]: string | number;
    }[]>([])

    const [keys, setKeys] = useState<Set<string>>(new Set());


    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
            icon: Activity,
        },
    } satisfies ChartConfig

    useEffect(() => {
        if (!data) return;

        const dataToAdd: {
            time: string;
            [key: string]: string | number;
        }[] = Object.keys(data)?.map((key: string) => {

            setKeys(prev => {
                const newKeys = new Set(prev);
                newKeys.add(`rx_on_${key}`);
                newKeys.add(`tx_on_${key}`);
                return newKeys;
            });

            return {
                time: getTimeFromISO(time.toString()),
                [`rx_on_${key}`]: convertSize({
                    sizeInBytes: data?.[key]?.rx_bytes,
                    addSuffix: false
                }),
                [`tx_on_${key}`]: convertSize({
                    sizeInBytes: data?.[key]?.tx_bytes,
                    addSuffix: false
                }),
            }
        })


        setChartData((prev) => ([
            ...prev,
            ...dataToAdd
        ]))
    }, [data])

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Network className="h-5" />
                    <h1>Network usage</h1>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
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
                            content={<ChartTooltipContent formatter={(value, name, item) => `${name} : ${value} MB`} indicator='dashed' />}
                        />
                        {
                            Array.from(keys)?.map((key: string) => (
                                <Line
                                    key={key}
                                    dataKey={key}
                                    type="monotone"
                                    stroke={
                                        [
                                            "#8884d8", // purple
                                            "#82ca9d", // green
                                            "#ffc658", // yellow
                                            "#d88484", // red
                                            "#84d8c6", // teal
                                            "#a484d8", // lavender
                                            "#d8b484", // tan
                                            "#84a4d8"  // blue
                                        ][
                                        Array.from(keys).indexOf(key) % 8
                                        ]
                                    }
                                />
                            ))
                        }
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default NetworkUsage
