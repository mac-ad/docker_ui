"use client"

import React, { useMemo, useState } from 'react'

import { GenericTable } from '@/components/generic-table';
import { ColumnDef } from '@tanstack/react-table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Copy, CopyCheckIcon, Inspect, Trash } from 'lucide-react';
import { toast } from 'sonner';
import DashboardMainWrapper from '@/components/dashboard-main-wrapper';
import { ListImagesTableColumns } from './columns';
import { useDeleteImageMutation, useImageQuery } from '@/api/queries/images';
import DeleteConfirmModal from '@/components/modals/delete-confirm-modal';
import PullImageModal from '@/components/modals/PullImage/pull-image-modal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconDotsVertical } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

const ImagesPage = () => {
    const [copied, setCopied] = useState<boolean>(false)
    const [currentRowId, setCurrentRowId] = useState<string | null>(null);

    const { data: imagesResponse, isLoading } = useImageQuery();
    const data = useMemo(() => imagesResponse?.data, [imagesResponse])

    console.log('image = ', imagesResponse)

    // pull image modal
    const [showPullImageModal, setShowPullImageModal] = useState<boolean>(false);

    // delete image
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [currentlyDeleting, setCurrentlyDeleting] = useState<string | null>(null)

    const { mutate: deleteImage, mutateAsync: deleteImageAsync, isLoading: deleting } = useDeleteImageMutation();

    const router = useRouter()

    const deleteHandler = async () => {
        if (!currentRowId) return;
        try {
            deleteImage(currentRowId,
                {
                    onSuccess: () => {
                        setShowDeleteModal(false);
                        setCurrentRowId(null)
                    }
                }
            )
        } catch (err) {
            console.log(err)
        }
    }

    const deleteSpecificTagHandler = async () => {
        if (!currentlyDeleting) return;
        try {
            deleteImage(currentlyDeleting,
                {
                    onSuccess: (data) => {
                        setShowDeleteModal(false);
                        setCurrentRowId(null)
                        toast.success(data?.message || "Image tag deleted successfully")
                    },
                    onError: (error) => {
                        setShowDeleteModal(false);
                        setCurrentRowId(null)
                        console.log("ERror = ", error)
                        toast.error(error?.message || "Failed to delete")
                    }
                }
            )
        } catch (err) {
            console.log(err)
        }
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
            accessorKey: "RepoTags",
            header: "Name",
            cell: (prop) => {

                const name = prop.getValue()?.[0]?.split(":")?.[0];

                return (
                    <div className="flex items-center gap-2 cursor-pointer w-fit">

                        <Button
                            variant="link"
                            className=" cursor-pointer p-0 overflow-hidden"
                        >
                            <span className="block  overflow-hidden text-ellipsis max-w-[100px]">
                                {name}
                            </span>
                        </Button>
                    </div>
                )
            }
        },
        {
            accessorKey: "Id",
            header: "Image ID",
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

        ...ListImagesTableColumns,
        {
            accessorFn: (row) => {
                return row["RepoTags"]
            },
            header: "Repository",
            cell: (props) => {
                return (
                    <div className="flex items-center gap-2">
                        {
                            props.getValue()?.map((tag: string) => {
                                return (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                    >
                                        {tag}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-4 cursor-pointer"
                                            onClick={() => {
                                                setShowDeleteModal(true)
                                                setCurrentlyDeleting(tag)
                                            }}
                                        >
                                            <Trash className="size-3 text-destructive" />
                                        </Button>
                                    </Badge>
                                )
                            })
                        }
                    </div>
                )
            }
        },
        {
            id: 'actions',
            cell: (props) => {

                const data = props.row.original;

                return <DropdownMenu>
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
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem
                            onClick={() => {
                                router.push(`/images/${data.Id}`)
                            }}
                        ><Inspect /> Inspect</DropdownMenuItem>
                        <DropdownMenuItem>Make a copy</DropdownMenuItem>
                        <DropdownMenuItem>Favorite</DropdownMenuItem>
                        {/* <DropdownMenuSeparator /> */}
                        {/* <DropdownMenuItem variant="destructive" onClick={() => {
                            setShowDeleteModal(true)
                            setCurrentRowId(data.Id)
                        }}>Delete</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu >
            }


        }
    ]

    console.log("data = ", data)

    return (
        <DashboardMainWrapper
            title="Docker Images"
        >
            <Button onClick={() => setShowPullImageModal(true)}>
                Pull image
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
                title={`Delete image ${currentlyDeleting}`}
                description={`This action cannot be undone. This will permanently delete image.`}
                confirmHandler={deleteSpecificTagHandler}
                loading={deleting}
            />
            <PullImageModal
                open={showPullImageModal}
                setOpen={setShowPullImageModal}
            />
        </DashboardMainWrapper>
    )
}

export default ImagesPage
