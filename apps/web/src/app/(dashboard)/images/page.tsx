"use client"

import React, { useState } from 'react'

import { GenericTable } from '@/components/generic-table';
import { ColumnDef } from '@tanstack/react-table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Copy, CopyCheckIcon, Search, Tag, Trash } from 'lucide-react';
import { toast } from 'sonner';
import DashboardMainWrapper from '@/components/dashboard-main-wrapper';
import { ListImagesTableColumns } from './columns';
import { useDeleteImageMutation, useImageQuery } from '@/api/queries/images';
import DeleteConfirmModal from '@/components/modals/delete-confirm-modal';
import PullImageModal from '@/components/modals/PullImage/pull-image-modal';
import { Button } from '@/components/ui/button';

const ImagesPage = () => {
    const [copied, setCopied] = useState<boolean>(false)
    const [currentRowId, setCurrentRowId] = useState<string | null>(null);

    const { data: imagesResponse, isLoading } = useImageQuery();
    const data = imagesResponse?.data

    // pull image modal
    const [showPullImageModal, setShowPullImageModal] = useState<boolean>(false);

    // delete image
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const { mutate: deleteImage, mutateAsync: deleteImageAsync, isLoading: deleting } = useDeleteImageMutation({
        onSuccess: () => {
            setShowDeleteModal(false);
            setCurrentRowId(null)
        }
    });

    const deleteHandler = async () => {
        if (!currentRowId) return;
        try {
            deleteImage(currentRowId)
        } catch (err) {

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
            accessorKey: "",
            header: "Actions",
            cell: (props) => {
                return (
                    <div className="flex items-center gap-2">
                        {/* tag */}
                        <Tooltip>
                            <TooltipContent>Add Tag</TooltipContent>
                            <TooltipTrigger>
                                <Tag className="text-primary cursor-pointer opacity-80 hover:opacity-100" size="18" />
                            </TooltipTrigger>
                        </Tooltip>
                        {/* run */}
                        {/* <Tooltip>
                            <TooltipContent>Create Container</TooltipContent>
                            <TooltipTrigger>
                                <Play className="text-safe cursor-pointer opacity-50 hover:opacity-100" size="18" />
                            </TooltipTrigger>
                        </Tooltip> */}
                        {/* inspect */}
                        <Tooltip>
                            <TooltipContent>Inspect Image</TooltipContent>
                            <TooltipTrigger>
                                <Search className="text-pending cursor-pointer opacity-80 hover:opacity-100" size="18" />
                            </TooltipTrigger>
                        </Tooltip>

                    </div>
                )
            }
        },
        {
            accessorKey: "Id",
            header: "",
            cell: (props) => {

                const id = props.getValue()

                return (
                    <div className="flex items-center gap-2">
                        {/* remove */}
                        <Tooltip>
                            <TooltipContent>Delete Image</TooltipContent>
                            <TooltipTrigger>
                                <Trash className="text-destructive cursor-pointer opacity-80 hover:opacity-100" size="18" onClick={() => {
                                    setShowDeleteModal(true)
                                    setCurrentRowId(id)
                                }} />
                            </TooltipTrigger>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]

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

export default ImagesPage
