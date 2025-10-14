import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className="min-h-20 flex items-center justify-center">
            <LoaderCircle className="animate-spin" />
        </div>
    )
}

export default Loading
