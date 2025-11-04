"use client"

import { useDeleteImageMutation } from '@/api/queries/images';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ColumnDef } from '@tanstack/react-table';
import { Cable, ChartNoAxesColumnIncreasing, Code, Copy, CopyCheckIcon, Disc, ExternalLink, FileCode, Inspect, Search, Tag, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { ListContainersTableColumns } from './columns';
import DashboardMainWrapper from '@/components/dashboard-main-wrapper';
import { Button } from '@/components/ui/button';
import { GenericTable } from '@/components/generic-table';
import DeleteConfirmModal from '@/components/modals/delete-confirm-modal';
import PullImageModal from '@/components/modals/PullImage/pull-image-modal';
import { useContainersQuery } from '@/api/queries/containers';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconDotsVertical } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { getInformaticPorts } from '@repo/shared';
import { twMerge } from 'tailwind-merge';

const ContainerPage = () => {
    const [copied, setCopied] = useState<boolean>(false)
    const [currentRowId, setCurrentRowId] = useState<string | null>(null);

    const { data: imagesResponse, isLoading, error } = useContainersQuery();
    const data = imagesResponse?.data

    // pull image modal
    const [showPullImageModal, setShowPullImageModal] = useState<boolean>(false);

    // delete image
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const { mutate: deleteImage, mutateAsync: deleteImageAsync, isLoading: deleting, error: deleteImageError } = useDeleteImageMutation();

    const router = useRouter()

    const deleteHandler = async () => {
        if (!currentRowId) return;
        deleteImage(
            currentRowId,
            {
                onSuccess: (res) => {
                    setShowDeleteModal(false);
                    setCurrentRowId(null);
                    const message = res?.message ?? "Image deleted successfully!"
                    toast.success(message)
                },
                onError: (err) => {
                    toast.error(err.message || "Failed to delete image")
                }
            }
        )
    }

    const copyHandler = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true)
                setTimeout(() => {
                    setCopied(false)
                    setCurrentRowId(null)
                }, 2000)
                toast.success("ID copied to clipboard")
            })
            .catch((err) => {
                toast.error("Failed to copy ID")
            });
    }

    const columns: ColumnDef<any, any>[] = [
        {
            accessorKey: "Names",
            header: "Name",
            cell: (props) => {

                const names = props?.getValue()?.[0]?.toString()
                const namesArray = names.split("/")
                const data = props.row.original

                return (
                    <div className="flex items-center gap-2">
                        {
                            <Button
                                variant="link"
                                className="p-0 cursor-pointer"
                                onClick={() => router.push(`/containers/${data.Id}`)}
                            >
                                {namesArray?.[namesArray.length - 1]}
                            </Button>
                        }
                    </div>
                )
            }
        },
        {
            accessorKey: "Id",
            header: "Container ID",
            cell: (prop) => {

                const rowId = prop.getValue();

                return (
                    <div className="flex  max-w-[100px] items-center gap-2 cursor-pointer w-fit">
                        <Tooltip>
                            <TooltipContent side='right'>
                                {
                                    "Copy ID"
                                }
                            </TooltipContent>
                            <TooltipTrigger>
                                {
                                    currentRowId === rowId && copied ? <CopyCheckIcon size="15" className="text-safe" /> : <Copy size="15" className="cursor-pointer" onClick={() => {
                                        setCurrentRowId(rowId)
                                        copyHandler(rowId)
                                    }} />
                                }
                            </TooltipTrigger>
                        </Tooltip>
                        <span

                            className=" cursor-pointer block  overflow-hidden text-ellipsis"
                        >
                            {prop.getValue()}
                        </span>
                    </div>
                )
            }
        },
        ...ListContainersTableColumns,
        {
            accessorKey: "Image",
            header: "Image",

            cell: (props) => {

                const row = props.row.original;

                return (
                    <div className="flex items-center gap-2 group cursor-poiner" onClick={() => {
                        router.push(`/images/${row.ImageID}`)
                    }}>
                        <Badge variant="secondary" className="cursor-pointer group-hover:text-blue-400">
                            <Disc
                                className="h-4 w-4 text-muted-foreground group-hover:text-blue-400"
                            />
                            {props.getValue()}
                            <ExternalLink className="group-hover:translate-x-[3px] group-hover:translate-y-[-3px] transition" />
                        </Badge>
                        {/* <Copy className="h-4 w-4 cursor-pointer" /> */}
                    </div>
                )
            }
        },
        {
            accessorKey: 'Ports',
            cell: (props) => {

                const ports = Array.from(getInformaticPorts(props.getValue()))

                if (ports?.length === 0) {
                    return (
                        <div>
                            -
                        </div>
                    )
                }

                return (
                    <div className="flex items-center gap-2">
                        {ports?.map((port) => {
                            const published = port.split(":")?.length > 1;

                            return (
                                <Badge
                                    variant={"secondary"}
                                    key={port}
                                    className="cursor-pointer group"
                                >
                                    <span className={
                                        twMerge(published ? "group-hover:text-blue-400" : "")
                                    }>
                                        {port}
                                    </span>
                                    {
                                        published &&
                                        <ExternalLink className="group-hover:translate-x-[3px] group-hover:translate-y-[-3px] transition  group-hover:text-blue-400" />
                                    }
                                </Badge>
                            )
                        })}
                    </div>
                )
            }
        },
        {
            id: "actions",
            cell: (props) => (
                < DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                            size="icon"
                        >
                            <IconDotsVertical />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>
                            <Inspect /> Inspect
                        </DropdownMenuItem>
                        <DropdownMenuItem><FileCode /> Logs</DropdownMenuItem>
                        <DropdownMenuItem><Code /> Exec console</DropdownMenuItem>
                        <DropdownMenuItem><Cable /> Attach console</DropdownMenuItem>
                        <DropdownMenuItem>
                            <ChartNoAxesColumnIncreasing />
                            Stats
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive"><Trash /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    ]

    return (
        <DashboardMainWrapper
            title="Docker Containers"
        >
            <Button onClick={() => setShowPullImageModal(true)}>
                Create Container
            </Button>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <GenericTable data={data || []} columns={columns} loading={isLoading} />
                    </div>
                </div>
            </div>
            <DeleteConfirmModal
                open={showDeleteModal}
                setOpen={setShowDeleteModal}
                title="Delete image"
                description={`This action cannot be undone. This will permanently delete image.`}
                confirmHandler={deleteHandler}
                loading={deleting}
            />
            <PullImageModal
                open={showPullImageModal}
                setOpen={setShowPullImageModal}
            />
        </DashboardMainWrapper>
    )
}

export default ContainerPage
