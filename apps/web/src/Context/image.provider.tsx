import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

type ImageProviderContextType = {
    logs: string[];
    setLogs: Dispatch<SetStateAction<string[]>>;
    showLogsModal: boolean;
    setShowLogsModal: Dispatch<SetStateAction<boolean>>
}

export const ImageProviderContext = createContext<ImageProviderContextType | undefined>({
    logs: [],
    setLogs: () => { },
    showLogsModal: false,
    setShowLogsModal: () => { }
});

export const useImage = () => React.useContext(ImageProviderContext)

export const ImageProvider = ({ children }: {
    children: React.ReactNode
}) => {

    const [logs, setLogs] = useState<string[]>([])
    const [showLogsModal, setShowLogsModal] = useState<boolean>(false);


    return (
        <ImageProviderContext.Provider
            value={{
                logs,
                setLogs,
                showLogsModal,
                setShowLogsModal
            }}
        >
            {children}
        </ImageProviderContext.Provider>
    )
}