"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { LoaderCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import SearchImage from './SearchImage';

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

    const closeHandler = () => {
        setLogs([]);
        ES.current?.close()
        setStartedPulling(false);
        setPullingSuccess(false);
        queryClient.invalidateQueries(["imagesList"])
    }

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setStartedPulling(true);
        const url = `http://localhost:4000/images/create?imageName=${data.imageName}&tag=${data.tag}`
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


    const inputChangeHandler = (e: any) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [logs]);

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
                    {
                        !pullingSuccess && <form onSubmit={submitHandler} className="flex-1 flex flex-col">
                            <div className="grid gap-4">
                                <SearchImage />
                                {/* <div className="grid gap-3">
                                    <Label htmlFor="registry">Image Registry</Label>
                                    <Input
                                        id="registry"
                                        name="registry"
                                        placeholder="docker.io"
                                        value="docker.io"
                                        onChange={inputChangeHandler}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="image-name">Image Name</Label>
                                    <Input
                                        id="image-name"
                                        name="imageName"
                                        placeholder="nginx"
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tag">Tag</Label>
                                    <Input
                                        id="tag"
                                        name="tag"
                                        placeholder="latest"
                                        onChange={inputChangeHandler}
                                    />
                                </div> */}
                            </div>
                            <DialogFooter className="mt-auto">
                                <DialogClose asChild>
                                    <Button variant="outline" onClick={closeHandler}>Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={startedPulling}>Pull image
                                    {
                                        startedPulling && <LoaderCircle className="animate-spin" />
                                    }
                                </Button>
                            </DialogFooter>
                        </form>
                    }

                    {
                        logs?.length > 0 && (
                            <div className="flex flex-col gap-2 mt-5 max-h-[100px] overflow-y-auto overflow-x-auto" ref={containerRef}>
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
                    {
                        startedPulling && <LoaderCircle className="h-3 w-3 text-muted-foreground animate-spin" />
                    }
                    {
                        pullingSuccess && <>
                            <p className="text-xs text-safe">🧊 Docker image pulled successfully! 🔥</p>
                            <DialogFooter className="mt-6">
                                <Button type="button" onClick={() => {
                                    closeHandler()
                                    setOpen(false)
                                }}>
                                    Finish
                                </Button>
                            </DialogFooter>
                        </>
                    }
                </DialogContent>
            </Dialog >
        </>
    )
}

export default PullImageModal
