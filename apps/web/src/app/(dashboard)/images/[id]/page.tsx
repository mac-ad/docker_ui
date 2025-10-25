"use client"

import { useImageDetail } from '@/api/queries/images'
import DashboardMainWrapper from '@/components/dashboard-main-wrapper'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { convertSize, formatUnixTimestamp, getNameFromTag } from '@repo/shared'
import { useParams } from 'next/navigation'
import React from 'react'

const ImageDetailPage = () => {

    const { id } = useParams()

    const { data } = useImageDetail({ id: id as string })
    const image = data?.data

    console.log(image)

    return (
        <DashboardMainWrapper
            title="Detail of image"
            showBackBtn={true}
        >
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <h1 className="text-2xl">{getNameFromTag(image?.RepoTags?.[0])}</h1>
                    </CardHeader>
                </Card>
                <Card className="">
                    <CardContent className="grid grid-cols-1">
                        {/* <div className="flex flex-col gap-5">
                            <h1 className="text-2xl">
                                {getNameFromTag(image?.RepoTags?.[0])}
                            </h1>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-muted-foreground">
                                    Created at: {formatUnixTimestamp(image?.Created)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Size: {convertSize({
                                        sizeInBytes: image?.Size
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2 mt-2">

                            </div>
                        </div> */}
                        <Table className="w-fit">
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Created At
                                    </TableCell>
                                    <TableCell>
                                        : {formatUnixTimestamp(image?.Created)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Image Name
                                    </TableCell>
                                    <TableCell>
                                        : {getNameFromTag(image?.RepoTags?.[0])}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Image Name
                                    </TableCell>
                                    <TableCell>
                                        : {getNameFromTag(image?.RepoTags?.[0])}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl">
                                Config
                            </h1>
                            <Separator />
                            <div>

                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl">
                                Tags & Repositories
                            </h1>
                            <Separator />

                            <div className="flex items-center gap-2 flex-wrap">
                                {
                                    image?.RepoTags?.map((tag: string) => (
                                        <>
                                            <Badge>
                                                {tag}
                                            </Badge>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl">
                                Architecture / OS
                            </h1>
                            <Separator />

                            <div className="flex items-center gap-2 flex-wrap text-muted-foreground">
                                {image?.Architecture} / {image?.Os}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardMainWrapper >
    )
}

export default ImageDetailPage
