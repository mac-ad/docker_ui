import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Archive, LucideIcon } from 'lucide-react'
import React from 'react'

const DashboardCard = ({
    title,
    count,
    content,
    Icon,
    loading = false
}: {
    title: string;
    count: number;
    content?: React.ReactNode;
    Icon: LucideIcon;
    loading?: boolean;
}) => {

    return (
        <Card className="">
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
                {
                    loading ? <Skeleton className="h-15 w-full" /> : <>
                        <h1 className="text-4xl font-bold">{count}</h1>
                        <div className=" flex-1">
                            {
                                content && content
                            }
                        </div>
                    </>
                }
            </CardContent>
        </Card>
    )
}

export default DashboardCard
