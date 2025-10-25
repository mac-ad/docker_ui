import { Disc } from 'lucide-react'
import React from 'react'

const LetsSearchImage = () => {
    return (
        <span className="flex flex-col items-center gap-2 text-sm text-muted-foreground mt-5 text-muted-foregound">
            <Disc className="h-10 w-10 opacity-80" />
            <span>
                Start typing to search for public Docker images
            </span>
            <span className="inline-flex items-center gap-1">
                <span className="text-xs">(e.g. node, nginx, mysql)</span>
            </span>
        </span>
    )
}

export default LetsSearchImage
