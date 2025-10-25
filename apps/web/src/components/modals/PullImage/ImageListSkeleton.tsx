import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ImageListSkeleton = ({
    n
}: {
    n: number
}) => {
    return (
        <>
            {
                new Array(n).fill(0)?.map((item, index) => (
                    <Skeleton />
                ))
            }
        </>
    )
}

export default ImageListSkeleton
