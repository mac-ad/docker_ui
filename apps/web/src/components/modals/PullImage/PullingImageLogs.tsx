import React, { useEffect, useRef } from 'react'
import GenericModal from '../generic-modal';

const PullingImageLogs = ({
    imageName,
    logs
}: {
    imageName: string;
    logs: string[]
}) => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [logs]);

    return (
        <div>
            {
                logs?.length > 0 && (
                    <div className="flex flex-col gap-2 mt-5 max-h-[150px] overflow-y-auto overflow-x-auto" ref={containerRef}>
                        {
                            logs?.map((log, index) => {
                                const status: string = JSON.parse(log)?.status ?? log;

                                return (
                                    <p key={index} className="text-muted-foreground text-xs">{status}</p>
                                )
                            })
                        }

                    </div>
                )
            }
        </div>
    )
}

export default PullingImageLogs
