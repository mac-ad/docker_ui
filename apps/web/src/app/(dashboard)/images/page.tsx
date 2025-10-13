"use client"

import { DataTable } from '@/components/data-table'
import React, { useState } from 'react'

import data from './data.json';
import { GenericTable } from '@/components/generic-table';
import { ColumnDef } from '@tanstack/react-table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { convertSize, formatUnixTimestamp } from '@repo/shared'
import { Clipboard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ImagesPage = () => {

    const [copied, setCopied] = useState<boolean>(false)

    const copyHandler = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log("Text copied to clipboard:", text);
            })
            .catch((err) => {
                console.error("Failed to copy text:", err);
            });
    }

    const columns: ColumnDef<any, any>[] = [
        {
            accessorKey: "Id",
            header: "ID",
            cell: (prop) => {
                return (
                    <div className="flex items-center gap-2 cursor-pointer w-fit">
                        <Tooltip>
                            <TooltipContent side='right'>
                                {
                                    copied ? "copied" : "Copy ID"
                                }
                            </TooltipContent>
                            <TooltipTrigger>
                                <Clipboard size="14" className="cursor-pointer" />
                            </TooltipTrigger>
                        </Tooltip>
                        <span
                            onClick={() => copyHandler(prop.getValue())}
                            className=" cursor-pointer block max-w-[100px] overflow-hidden text-ellipsis"
                        >
                            {prop.getValue()}
                        </span>
                    </div>
                )
            }
        },
        {
            accessorKey: "Containers",
            header: "",
            cell: (props) => {
                const used = props.getValue() > 0;
                return (
                    <Badge
                        variant={used ? "safe" : "pending"}
                        className="rounded-sm text-xs"
                    >
                        {used ? "Used" : "Unused"}
                    </Badge>
                )

            }
        },
        {
            accessorFn: (row) => {
                return row["RepoTags"]
            },
            header: "Repository",
            cell: (props) => {
                return (
                    <div className="flex items-center gap-2 flex-wrap">
                        {
                            props.getValue()?.map((tag: string) => {
                                return (
                                    <Badge
                                        variant="secondary"
                                    >
                                        {tag}
                                    </Badge>
                                )
                            })
                        }
                    </div>
                )
            }
        },
        {
            accessorKey: "Size",
            header: "Size",

            cell: (props) => {

                const size = convertSize({
                    sizeInBytes: props.getValue(),
                    format: "mb"
                });

                return (
                    <div>
                        {size}
                    </div>
                )
            }
        },
        {
            accessorKey: "Created",
            header: "Created",
            cell: (props) => {

                const date = formatUnixTimestamp(props.getValue());

                return (
                    <div>
                        {date.toString()}
                    </div>
                )
            }
        },

    ]

    console.log(data.data)

    return (
        <div>
            <GenericTable
                data={data.data}
                columns={columns}
            />
        </div>
    )
}

export default ImagesPage
