"use client";

import { useContainerStat } from '@/api/queries/containers';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Cable, Cpu, Gpu, Network } from 'lucide-react';
import { useParams } from 'next/navigation'
import React from 'react'
import MemoryUsage from './MemoryUsage';
import CpuUsage from './CpuUsage';
import { getContainerName, getCpuUsagePercentage } from '@repo/shared';
import NetworkUsage from './NetworkUsage';
import IOUsage from './IOUsage';

const REFRESH_INTERVAL = 5000;

const ContainerStats = ({
    running = true
}: {
    running?: boolean;
}) => {
    const { id } = useParams()

    const { data: stat } = useContainerStat({
        id: id as string,
        refresh_interval: REFRESH_INTERVAL,
        enabled: running
    })

    return (
        <>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="col-span-full">
                    <CardContent>
                        <h1 className="mb-4">
                            CONTAINER NAME : {getContainerName(stat?.data?.name)}
                        </h1>
                    </CardContent>
                </Card>
                <MemoryUsage
                    data={{
                        time: stat?.data?.read,
                        memory: stat?.data?.memory_stats?.usage,
                        totalMemory: stat?.data?.memory_stats?.limit
                    }}
                    refresh_interval={REFRESH_INTERVAL}
                />

                <CpuUsage
                    data={{
                        time: stat?.data?.read,
                        cpu: getCpuUsagePercentage({
                            currentCpu: {
                                total_usage: stat?.data?.cpu_stats?.cpu_usage?.total_usage,
                                system_cpu_usage: stat?.data?.cpu_stats?.system_cpu_usage || 0
                            },
                            preCpu: {
                                total_usage: stat?.data?.precpu_stats?.cpu_usage?.total_usage,
                                system_cpu_usage: stat?.data?.precpu_stats?.system_cpu_usage || 0
                            },
                            onlineCpu: stat?.data?.cpu_stats?.online_cpus
                        })
                    }}
                    refresh_interval={REFRESH_INTERVAL}
                />

                <NetworkUsage
                    data={stat?.data?.networks}
                    refresh_interval={REFRESH_INTERVAL}
                    time={stat?.data?.read}
                />

                <IOUsage
                    data={{
                        time: stat?.data?.read,
                        read: stat?.data?.blkio_stats?.io_service_bytes_recursive?.find((item: any) => item.op === "read")?.value,
                        write: stat?.data?.blkio_stats?.io_service_bytes_recursive?.find((item: any) => item.op === "write")?.value,
                    }}
                    refresh_interval={REFRESH_INTERVAL}
                />

            </div>
        </>
    )
}

export default ContainerStats
