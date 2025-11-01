import React from 'react'
import DashboardCard from './DashboardCard'
import { Archive, Database, Disc, Network } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { convertSize } from '@repo/shared'

const DashboardCards = ({
    data,
    loading = false
}: {
    data: any;
    loading?: boolean;
}) => {
    return (
        <div className="@container/main grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* containers */}
            <DashboardCard
                loading={loading}
                title="Containers"
                count={data?.containers?.total}
                Icon={Archive}
                content={<div className="flex  gap-2 flex-wrap">
                    <Badge
                        variant="safe"
                    >
                        Running : {data?.containers?.running}
                    </Badge>
                    <Badge
                        variant="pending"
                    >
                        Paused : {data?.containers?.paused}
                    </Badge>
                    <Badge
                        variant="destructive"
                    >
                        Stopped : {data?.containers?.stopped}
                    </Badge>
                </div>}
            />

            {/* images */}
            <DashboardCard
                loading={loading}
                title="Images"
                count={data?.images?.total}
                Icon={Disc}
                content={
                    <div>
                        {convertSize({
                            sizeInBytes: data?.images?.totalSize,
                            format: "gb"
                        })}
                    </div>
                }
            />

            {/* volumes */}
            <DashboardCard
                loading={loading}
                title="Volumes"
                count={data?.volumes?.total}
                Icon={Database}
            />

            {/* networks */}
            <DashboardCard
                loading={loading}
                title="Networks"
                count={data?.networks?.total}
                Icon={Network}
            />

        </div>
    )
}

export default DashboardCards
