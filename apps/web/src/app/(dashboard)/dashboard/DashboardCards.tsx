import React from 'react'
import DashboardCard from './DashboardCard'
import { Archive, Database, Disc, Network } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const DashboardCards = ({
    data
}: {
    data: any
}) => {
    return (
        <div className="@container/main grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* containers */}
            <DashboardCard
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
                title="Images"
                count={data?.images?.total}
                Icon={Disc}
            />

            {/* volumes */}
            <DashboardCard
                title="Volumes"
                count={data?.volumes?.total}
                Icon={Database}
            />

            {/* networks */}
            <DashboardCard
                title="Networks"
                count={data?.networks?.total}
                Icon={Network}
            />

        </div>
    )
}

export default DashboardCards
