"use client"

import { Input } from '@/components/ui/input'
import React, { useEffect, useMemo, useState } from 'react'
import SearchResult from './SearchResult'
import { useSearchImagesQuery } from '@/api/queries/images'
import { debounce } from '@repo/shared'

const SearchImage = () => {
    const [pagination, setPagination] = useState<{
        term: string;
        page: number;
        limit: number;
    }>({
        term: "",
        page: 1,
        limit: 100
    })

    const { data, isLoading, isFetching } = useSearchImagesQuery({
        ...pagination
    })


    const changeHandler = (e: any) => {
        console.log('changed', e.target.value)
        setPagination(prev => ({
            ...prev,
            term: e.target.value
        }))
    }

    const debouncedSearch = debounce(changeHandler, 500);

    const fetchNextHandler = () => {
        setPagination(prev => ({
            ...prev,
            page: prev.page + 1
        }))
    }

    return (
        <div className="h-full min-h-0 gap-2 flex flex-col">
            <Input
                id="imageName"
                name="imageName"
                placeholder="Search for docker hub public image.."
                onChange={debouncedSearch}
            />
            <div className="flex-1 overflow-y-hidden">
                <SearchResult
                    data={data?.results || []}
                    hasMore={data?.hasMore}
                    fetchNext={fetchNextHandler}
                    loading={isFetching}
                    hasSearched={!!pagination.term}
                />
            </div>

        </div>
    )
}

export default SearchImage
