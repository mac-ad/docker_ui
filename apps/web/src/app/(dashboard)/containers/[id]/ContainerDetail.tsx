"use client"

import React, { useMemo } from 'react'
import ContainerAction from './ContainerAction'
import ContainerStatus from './ContainerStatus'
import ContainerStats from './ContainerStats'
import ContainerProcess from './ContainerProcess'
import { useContainerDetailQuery } from '@/api/queries/containers'
import { useParams } from 'next/navigation'
import { formatUnixTimestamp, getTimeFromISO } from '@repo/shared'
import ContainerLogs from './ContainerLogs'

const ContainerDetail = () => {

    const { id } = useParams();

    const { data, isLoading } = useContainerDetailQuery(id as string)

    const container = useMemo(() => data?.data, [data])

    if (isLoading || !data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
                <ContainerAction
                    state={container?.State ?? null}
                />
            </div>
            <div className="col-span-full">
                <ContainerLogs />
            </div>
            <div className="col-span-full">
                <ContainerStatus
                    data={{
                        ID: container?.Id ?? "",
                        Name: container?.Name ?? "",
                        Created: formatUnixTimestamp(Number(container?.Created)),
                        StartTime: formatUnixTimestamp(Number(container?.State?.StartedAt)),
                        Path: container?.Path ?? "",
                        // RestartCount: container?.RestartCount,
                        Platform: container?.Platform ?? "",
                        Image: container?.Image ?? "",
                        LogPath: container?.LogPath ?? "",
                        AppArmorProfile: container?.AppArmorProfile ?? "",
                    }}
                />
            </div>
            <ContainerProcess />
        </div>
    )
}

export default ContainerDetail