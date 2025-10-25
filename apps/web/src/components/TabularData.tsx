import React from 'react'
import { Table, TableBody, TableCell, TableRow } from './ui/table'

const TabularData = ({
    data
}: {
    data: Record<string, string>
}) => {
    return (
        <Table>
            <TableBody>
                {
                    Object.keys(data)?.map((key) => {

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
