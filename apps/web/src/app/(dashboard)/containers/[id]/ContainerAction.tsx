import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Bomb, Pause, Play, Power, RefreshCw, Settings, Trash } from 'lucide-react'
import React from 'react'

const ContainerAction = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Settings className="h-5" />
                    <h1>Actions</h1>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-4">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                        <Power />
                        Start
                    </Button>
                    <Button variant="outline" size="sm" className="cursor-pointer">
                        <Pause />
                        Stop
                    </Button>
                    <Button variant="outline" size="sm" className="cursor-pointer">
                        <Bomb />
                        Kill
                    </Button>
                    <Button variant="outline" size="sm" className="cursor-pointer">
                        <RefreshCw />
                        Refresh
                    </Button>
                    <Button variant="outline" size="sm" className="cursor-pointer">
                        <Play />
                        Resume
                    </Button>
                    <Button variant="destructive" size="sm" className="cursor-pointer">
                        <Trash />
                        Delete
                    </Button>
                </div>
            </CardHeader>
        </Card>
    )
}

export default ContainerAction
