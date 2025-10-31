"use client"

import { useContainerActionMutation } from '@/api/queries/containers'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { CONTAINER_ACTION, ContainerActionType } from '@repo/shared'
import { Bomb, Loader, Pause, Play, Power, RefreshCw, Settings, Trash, Icon, icons, LucideIcon, SquarePause, Square } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'

const ContainerAction = ({
    state
}: {
    state: any
}) => {

    const { id } = useParams();
    const [currentAction, setCurrentAction] = useState<ContainerActionType | null>(null);

    const {
        mutate: performContainerAction,
        isLoading
    } = useContainerActionMutation(
        id as string,
        currentAction
    )

    const actionBtns: {
        name: string;
        icon: LucideIcon;
        action: ContainerActionType,
        disabled: boolean;
    }[] = useMemo(() => {
        return [
            {
                name: "Start",
                icon: Power,
                action: CONTAINER_ACTION.START,
                disabled: state?.Status === "running" ||
                    state?.Status === "paused" ||
                    state?.Status === "restarting" ||
                    state?.Status === "dead"
            },
            {
                name: "Stop",
                icon: Square,
                action: CONTAINER_ACTION.STOP,
                disabled: state?.Status === "restarting" ||
                    state?.Status === "exited" ||
                    state?.Status === "created" ||
                    state?.Status === "dead"
            },
            {
                name: "Kill",
                icon: Bomb,
                action: CONTAINER_ACTION.KILL,
                disabled: state?.Status === "exited" ||
                    state?.Status === "created" ||
                    state?.Status === "dead"
            },
            {
                name: "Refresh",
                icon: RefreshCw,
                action: CONTAINER_ACTION.REFRESH,
                disabled: false
            },
            {
                name: "Pause",
                icon: Pause,
                action: CONTAINER_ACTION.PAUSE,
                disabled: false
            },
        ]
    }, [state])

    console.log(actionBtns)

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Settings className="h-5" />
                    <h1>Actions</h1>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-4">
                    {
                        actionBtns?.map((btn) => (
                            <Button
                                key={btn.name}
                                variant="outline"
                                size="sm"
                                className="cursor-pointer"
                                onClick={() => {
                                    setCurrentAction(btn.action)
                                    performContainerAction({
                                        id: id as string,
                                        action: btn.action
                                    })
                                }}
                                disabled={btn.disabled}
                            >
                                {
                                    currentAction === btn?.action && isLoading ? <Loader
                                        className="animate-spin"
                                    /> : <>
                                        {btn?.icon && <btn.icon />}
                                        {btn?.name}
                                    </>
                                }
                            </Button>
                        ))
                    }
                    <Button variant="destructive" size="sm" className="cursor-pointer"
                        disabled={
                            state?.Status === "paused" ||
                            state?.Status === "running" ||
                            state?.Status === "restarting"
                        }
                    >
                        <Trash />
                        Delete
                    </Button>
                </div>
            </CardHeader>
        </Card>
    )
}

export default ContainerAction
