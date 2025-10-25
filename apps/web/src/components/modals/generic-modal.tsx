import React, { Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge';

const GenericModal = ({
    close,
    children
}: {
    close: any;
    children: React.ReactNode
}) => {
    return (
        <>
            <div className={
                twMerge(
                    "bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative",
                )
            }>
                <button
                    onClick={close}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
                >
                    ✕
                </button>
                {<h2 className="text-xl font-semibold mb-4">this is a title</h2>}
                <div>{children}</div>
            </div>
        </>
    )
}

export default GenericModal
