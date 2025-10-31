import TabularData from '@/components/TabularData'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Cable, ChartNoAxesColumnIncreasing, Code, FileCode, Inspect } from 'lucide-react'
import React from 'react'
import { Icon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

const ContainerStatus = ({
    data
}: {
    data: Record<string, string>
}) => {

    const { id } = useParams();

    const router = useRouter();

    return (
        <Card>
            <CardHeader className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                    <ChartNoAxesColumnIncreasing className="w-5" />
                    <h1>Container Status</h1>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Button
                        variant="outline"
                        className="cursor-pointer p-0 border" size="sm"
                    >
                        <FileCode />
                        Logs
                    </Button>
                    <Button
                        variant="outline"
                        className="cursor-pointer p-0 border" size="sm"
                    >
                        <Inspect />
                        Inspect
                    </Button>
                    <Button
                        variant="outline"
                        className="cursor-pointer p-0 border" size="sm"
                        onClick={() => router.push(`/containers/${id}/stats`)}
                    >
                        <ChartNoAxesColumnIncreasing />
                        Stats
                    </Button>
                    <Button
                        variant="outline"
                        className="cursor-pointer p-0 border" size="sm"
                    >
                        <Code />
                        Console
                    </Button>
                    <Button
                        variant="outline"
                        className="cursor-pointer p-0 border" size="sm"
                    >
                        <Cable />
                        Attach console
                    </Button>
                </div>
            </CardHeader>
            <Separator />
            <CardContent>
                <TabularData
                    data={data}
                />
            </CardContent>
        </Card>
    )
}

export default ContainerStatus


// const data: Record<string, string> = {
//     ID: "0b5d72caceb4952548a5b9a05f4064a78a3743b5855ad9accd6323a2ae9ce14a",
//     Name: "friendly_mayer",
//     Status: "Running for 2 hours",
//     Created: "2025-10-25 16:52:06",
//     "Start time": "2025-10-25 16:52:06"
// }