import React from 'react'
import { Table, TableBody, TableCell, TableRow } from './ui/table'
import { Skeleton } from './ui/skeleton';

const TabularData = ({
    data,
    loading = false
}: {
    data: Record<string, string>;
    loading?: boolean;
}) => {
    return (
        <Table>
            <TableBody>
                {
                    loading && Array(5).fill(0).map((key) => {

                        return (
                            <TableRow key={key}>
                                <TableCell className="w-fit">
                                    <Skeleton className="h-6" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6" />
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
                {
                    !loading && Object.keys(data)?.map((key) => {

                        const value = data[key]

                        return (
                            <TableRow key={key}>
                                <TableCell className="w-fit">
                                    {key}
                                </TableCell>
                                <TableCell>
                                    {value}
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export default TabularData
