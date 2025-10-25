"use client";

import { useContainerStat } from '@/api/queries/containers';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { convertSize, getTimeFromISO } from '@repo/shared';
import { Activity, Cable, ChartNoAxesColumnIncreasing, Cpu, Gpu, Microchip, Network } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

const ContainerStats = () => {
    const [chartData, setChartData] = useState<{
        memory: number | string;
        time: string;
    }[]>([])

    const [stat, setStat] = useState<any>(null);

    const { id } = useParams()

    const { data } = useContainerStat({
        id: id as string
    })

    // const statData = data.data

    // const ES = useRef<EventSource>(null);

    // const fetchStats = () => {
    //     if (!id) return;
    //     const url = `http://localhost:4000/containers/${id}/stats`;

    //     let es = ES.current;

    //     es = new EventSource(url);

    //     es.onmessage = (e) => {
    //         setStat(JSON.parse(e.data))
    //     }
    // }

    useEffect(() => {
        // fetchStats()
    }, [])

    console.log(chartData)

    useEffect(() => {
        if (!data?.data) return;
        setChartData((prev) => ([
            ...prev,
            {
                time: getTimeFromISO(data?.data.read),
                memory: convertSize({
                    sizeInBytes: data?.data.memory_stats.usage,
                    addSuffix: false,
                })
            }
        ]))
    }, [data?.data])

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
            icon: Activity,
        },
    } satisfies ChartConfig

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Microchip className="h-5" />
                        <h1>Memory usage</h1>
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
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="time"
                            />
                            <YAxis
                                tickFormatter={(value) => `${value} MB`}
                            />
                            <ChartTooltip
                                content={<ChartTooltipContent formatter={(value) => `${value} MB`} />}
                            />
                            <Area
                                dataKey="memory"
                                type="step"
                                fill="var(--color-primary)"
                                fillOpacity={0.4}
                                stroke="var(--color-primary)"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Cpu className="h-5" />
                        <h1>Cpu usage</h1>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Network className="h-5" />
                        <h1>Network usage</h1>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Cable className="h-5" />
                        <h1>I/O usage (aggregate) </h1>
                    </div>
                </CardHeader>
            </Card>
            <Card className="col-span-full">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Gpu className="h-5" />
                        <h1>Processes</h1>
                    </div>
                </CardHeader>
            </Card>
        </>
    )
}

export default ContainerStats
