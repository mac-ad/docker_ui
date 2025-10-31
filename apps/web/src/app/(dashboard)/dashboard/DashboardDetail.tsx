"use client"

import { useDashboardQuery } from '@/api/queries/dashboard'
import React, { useMemo } from 'react'
import DashboardCards from './DashboardCards';
import TabularData from '@/components/TabularData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { convertSize } from '@repo/shared';
import { MonitorCog } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardDetail = () => {

    const { data: dashboardRef } = useDashboardQuery();

    const dashboard = useMemo(() => dashboardRef?.data, [dashboardRef])

    console.log(dashboard)

    return (
        <div className="grid gap-4">
            <DashboardCards
                data={dashboard}
            />

            {/* system info */}
            <Card>
                <CardHeader className="flex items-center gap-3">
                    <Button>
                        <MonitorCog />
                    </Button>
                    <h1 className="text-2xl font-semibold">System Info</h1>
                </CardHeader>
                <CardContent>
                    <TabularData
                        data={{
                            "Operating System": dashboard?.host?.os,
                            "OS Type": dashboard?.host?.osType,
                            "Total CPU": dashboard?.host?.cpu,
                            "Architecture": dashboard?.host?.architecture,
                            Memory: convertSize({
                                sizeInBytes: dashboard?.host?.memory,
                                format: 'gb'
                            })
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardDetail
