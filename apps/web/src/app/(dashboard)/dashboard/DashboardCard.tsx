import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Archive, LucideIcon } from 'lucide-react'
import React from 'react'

const DashboardCard = ({
    title,
    count,
    content,
    Icon
}: {
    title: string;
    count: number;
    content?: React.ReactNode;
    Icon: LucideIcon
}) => {
    return (
        <Card>
            <CardHeader className="flex items-center w-full ">
                <div className="flex gap-4 items-center font-bold">
                    <Button variant="default">
                        <Icon />
                    </Button>
                    <h1 className="text-2xl">
                        {title}
                    </h1>
                </div>
            </CardHeader>
            <CardContent className="flex gap-4">
                <h1 className="text-4xl font-bold">{count}</h1>
                <div className=" flex-1">
                    {
                        content && content
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default DashboardCard
