"use client";

import { useContainerProcess } from '@/api/queries/containers';
import { GenericTable } from '@/components/generic-table';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef } from '@tanstack/react-table';
import { Gpu } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

const ContainerProcess = () => {
    const { id } = useParams();

    const { data: process } = useContainerProcess({ id: id as string })

    console.log(process, 'process')

    const columns: ColumnDef<any, any> = useMemo(() => {
        return process?.data?.Titles?.map((title: string) => ({
            accessorKey: title,
            header: title,
        }))
    }, [process?.data?.Titles])


    return (
        <Card className="col-span-full">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Gpu className="h-5" />
                    <h1>Processes</h1>
                </div>
            </CardHeader>
            <CardContent>
                {/* <GenericTable 
                    columns = {columns}
                    data = {data}
                /> */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                process?.data?.Titles?.map((title: string) => (
                                    <TableHead key={title}>
                                        {title}
                                    </TableHead>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {
                            process?.data?.Processes?.map((p: any) => (
                                <TableRow key={p?.PID}>
                                    {
                                        p?.map((item: string, index: number) => (
                                            <TableCell key={item + index}>
                                                {item}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default ContainerProcess
