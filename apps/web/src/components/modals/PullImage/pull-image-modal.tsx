"use client"

import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { useQueryClient } from '@tanstack/react-query';
import SearchImage from './SearchImage';
import PullingImageLogs from './PullingImageLogs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, CheckCheck, ChevronDown, ChevronUp, Loader } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const PullImageModal = ({
    open,
    setOpen
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const [startedPulling, setStartedPulling] = useState<boolean>(false)
    const [logs, setLogs] = useState<string[]>([])
    const [pullingSuccess, setPullingSuccess] = useState<boolean>(false);
    const [showLogs, setShowLogs] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const ES = useRef<EventSource>(null)

    const queryClient = useQueryClient();

    const [data, setData] = useState<
        {
            registry: string;
            imageName: string;
            tag: string
        }
    >({
        registry: 'docker.io',
        imageName: '',
        tag: ''
    })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (logs?.length !== 0) setLogs([]);
        if (pullingSuccess) setPullingSuccess(false)
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const resetModal = () => {
        setLogs([]);
        ES.current?.close()
        setStartedPulling(false);
        setPullingSuccess(false);
        setData((prev) => ({
            ...prev,
            imageName: '',
            tag: ''
        }))
    }

    const closeHandler = () => {
        setOpen(false)
        resetModal();
        queryClient.invalidateQueries(["imagesList"])
    }

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setStartedPulling(true);
        const url = `${process.env.NEXT_PUBLIC_API_URL}/images/create?imageName=${data.imageName}&tag=${data.tag}`
        let es = ES.current;

        es = new EventSource(url);

        es.onmessage = (e) => {
            console.log("Message:", e.data);
            setLogs(prev => [...prev, e.data]);
        };

        es.onerror = (e) => {
            console.log("Error: ", e)
            setStartedPulling(false);
        };

        es.addEventListener("end", (e) => {
            console.log("Stream ended:", e.data);
            setStartedPulling(false);
            setPullingSuccess(true)
            es.close();
        });
    }

    console.log(logs)

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        closeHandler()
                    }
                }}
            >
                <DialogContent
                    className="sm:max-w-[425px]  flex flex-col"
                    onInteractOutside={(e) => e.preventDefault()}
                    overlayType="darkest"
                    size="xl"
                >
                    <DialogHeader className="">
                        <DialogTitle>Pull image from Dockerhub public</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 flex flex-col min-h-0 gap-2">
                        {/* <SearchImage /> */}
                        <form onSubmit={submitHandler}>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="registry">Registry</Label>
                                    <Input id="registry" name="registry" value={data.registry} disabled />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="imageName">Image Name</Label>
                                    <Input id="imageName" name="imageName" placeholder="eg. nginx" onChange={inputChangeHandler} value={data.imageName} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tag">Tag</Label>
                                    <Input id="tag" name="tag" placeholder="eg. latest" onChange={inputChangeHandler} value={data.tag} />
                                </div>
                            </div>
                            {
                                data?.imageName && data?.tag && !pullingSuccess && <DialogFooter className="mt-6">
                                    <Button type="button">Close</Button>
                                    <Button type="submit" disabled={startedPulling}>{
                                        startedPulling ? <Loader className="animate-spin" /> : "Pull Image"}
                                    </Button>
                                </DialogFooter>
                            }
                            {
                                pullingSuccess && <DialogFooter className="mt-6">
                                    <Button type="button" onClick={() => resetModal()}>Pull another image</Button>
                                    <Button type="button" onClick={closeHandler}>Finish</Button>
                                </DialogFooter>
                            }
                        </form>
                    </div>
                    <div className="">
                        {
                            logs?.length > 0 && <>
                                <p className="flex items-center gap-2">
                                    {
                                        pullingSuccess ? <CheckCheck className="h-3 w-3 mt-[-3px] text-green-400" /> : <Loader className="animate-spin h-3 w-3 mt-[-3px]" />
                                    }
                                    <span className={
                                        twMerge(
                                            "text-xs text-muted-foreground",
                                            pullingSuccess ? "text-green-400" : ""
                                        )
                                    }>
                                        {JSON.parse(logs?.[logs.length - 1] || "")?.status ?? logs?.[logs?.length - 1]}
                                    </span>
                                </p>
                                <Button
                                    onClick={() => setShowLogs(prev => !prev)}
                                    variant="outline" size="sm" className="mt-4 text-xs cursor-pointer">
                                    {
                                        showLogs ? <>
                                            Hide logs <ChevronUp />
                                        </> : <>
                                            See full logs <ChevronDown />
                                        </>
                                    }
                                </Button>
                            </>
                        }

                        {
                            showLogs && <PullingImageLogs
                                imageName={data.imageName}
                                logs={logs}
                            />
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PullImageModal
