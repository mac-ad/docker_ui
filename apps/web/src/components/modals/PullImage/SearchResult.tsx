"use client"

import React from 'react'
import ImageListSkeleton from './ImageListSkeleton'
import ImageNotFound from './ImageNotFound'
import LetsSearchImage from './LetsSearchImage'
import Imagecard from './Imagecard'

const SearchResult = ({
    data = [],
    hasMore = false,
    fetchNext,
    loading,
    hasSearched
}: {
    data?: any[];
    hasMore?: boolean;
    fetchNext: () => void;
    loading: boolean;
    hasSearched: boolean;
}) => {

    if (loading) return <div className="text-xs h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 overflow-y-auto p-2">
        <ImageListSkeleton n={16} />
    </div>

    if (data?.length === 0) return <div>
        {
            hasSearched ? <ImageNotFound /> : <LetsSearchImage />
        }
    </div>

    return (
        <div className="text-xs h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 overflow-y-auto p-2">
            {
                data?.map((item: any, index: number) => {

                    return (
                        <Imagecard
                            key={index}
                            {...item}
                        />
                    )
                })
            }
        </div>
    )
}

export default SearchResult
