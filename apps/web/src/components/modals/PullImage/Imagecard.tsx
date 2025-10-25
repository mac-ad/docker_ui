import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { formatNumber } from '@repo/shared'
import { ArrowDownToLine, Award, Star } from 'lucide-react'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Tags from './Tags'

const Imagecard = (props: any) => {

    const [tags, setTags] = useState<string[]>([]);

    const pullImageHandler = () => {
        console.log("pulling image", props)
    }

    return (
        <>
            <Card
                key={props?.repo_name}
                className={
                    twMerge(
                        "p-2 px-2 rounded-sm transition",
                    )
                }>
                <CardHeader className="p-0">
                    <div className="flex gap-2 justify-between item-start ">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                {
                                    props?.is_official && <Tooltip

                                    >
                                        <TooltipTrigger>
                                            <Award className="h-4 w-4 text-blue-500 cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="text-[10px]">
                                                Docker Official image
                                            </span>
                                        </TooltipContent>
                                    </Tooltip>
                                }
                                <p className="break-all">
                                    {props.repo_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-muted-foreground line-clamp-2 text-[11px] mb-2 break-all">
                                    {props.short_description}
                                </p>
                            </div>
                        </div>
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <IconDotsVertical className="h-5 w-5 shrink-0" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32">
                                <DropdownMenuItem className="cursor-pointer" onClick={pullImageHandler}>Pull</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </div>

                </CardHeader>
                <CardFooter className="mt-auto p-0 flex flex-col gap-2 items-start">
                    <Tags
                        tags={tags}
                        setTags={setTags}
                    />
                    <div className="flex items-center gap-2">
                        <p className="text-muted-foreground flex items-center gap-1 ">
                            <ArrowDownToLine className="h-3 w-3" />
                            <span className="text-[11px]">
                                {formatNumber(props?.pull_count)}
                            </span>
                        </p>
                        <p className="text-muted-foreground flex items-center gap-1 ">
                            <Star className="h-3 w-3" />
                            <span className="text-[11px]">
                                {props?.star_count}
                            </span>
                        </p>

                    </div>
                    {/* <button
                        className={
                            twMerge(
                                "bg-black text-green-400 font-mono text-[10px] px-2 py-1 border border-green-700 flex items-center gap-2 cursor-pointer rounded-sm ",
                            )
                        }
                    >
                        <ArrowDownToLine className="h-3 w-3 text-green-400" />
                        $ docker pull
                    </button> */}
                </CardFooter>
            </Card>

        </>
    )
}

export default Imagecard
