import { createContext, ReactNode, useContext, useState } from "react";


type ModalComponentProps = {
    close: () => void
}

type ModalComponent = (props: ModalComponentProps) => ReactNode;

type ModalInstance = {
    id: number;
    component: ModalComponent;
};


type ModalContextType = {
    openModal: (component: ModalComponent) => number;
    closeModal: (id: number) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}

export const ModalProvider = ({ children }: {
    children: React.ReactNode
}) => {

    const [modals, setModals] = useState<ModalInstance[]>([]);

    const openModal = (component: ModalComponent): number => {
        const id = Date.now();
        setModals(prev => ([...prev, { id, component }]))
        return id;
    }

    const closeModal = (id: number) => {
        setModals(prev => prev.filter(m => m.id !== id))
    }

    console.log({ modals })

    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal
            }}
        >
            {children}
            {
                modals.map(({ id, component }) => (
                    <div
                        key={id}
                        className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50"
                    >
                        {
                            component({ close: () => closeModal(id) })
                        }
                    </div>
                ))
            }
        </ModalContext.Provider>
    )
}