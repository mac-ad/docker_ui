import React, { Dispatch, SetStateAction } from 'react'

const Tags = ({
    tags,
    setTags
}: {
    tags: string[];
    setTags: Dispatch<SetStateAction<string[]>>
}) => {

    


    return (
        <button
            type="button"
            className="cursor-pointer px-2 py-1 text-[10px] bg-primary text-white rounded hover:bg-green-600 transition"
            onClick={() => {

            }}
        >
            Fetch Tags
        </button>
    )
}

export default Tags
