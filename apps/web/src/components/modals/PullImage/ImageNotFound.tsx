import { Disc } from 'lucide-react'
import React from 'react'

const ImageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <Disc className="h-13 w-13 opacity-50 mb-2" />
            <div className="text-lg font-semibold text-muted-foreground mb-1">
                Image not found
            </div>
            <div className="text-sm text-muted-foreground text-center">
                We couldn't find a public Docker image with that name.<br />
                Please try searching with a different keyword.
            </div>
        </div>
    )
}

export default ImageNotFound
