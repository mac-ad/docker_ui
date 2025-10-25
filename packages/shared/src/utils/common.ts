import { IDockerContainerPort } from "../types/docker";

export const formatNumber = (num: number) => {
    if (num < 1000) return num.toString();
    if (num < 1_000_000) return (num / 1_000).toFixed(0).replace(/\.0$/, '') + 'K+';
    if (num < 1_000_000_000) return (num / 1_000_000).toFixed(0).replace(/\.0$/, '') + 'M+';
    if (num < 1_000_000_000_000) return (num / 1_000_000_000).toFixed(0).replace(/\.0$/, '') + 'B+';
    return (num / 1_000_000_000_000).toFixed(0).replace(/\.0$/, '') + 'T+';
}

export const getTimeFromISO = (iso: string) => {
    const date = new Date(iso);
    const time = date.toLocaleTimeString([], { hour12: false });

    return time;
}


export const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
    let timer: ReturnType<typeof setTimeout>; // Step 1

    return function (...args: Parameters<T>) { // Step 2
        clearTimeout(timer); // Step 3
        timer = setTimeout(() => { // Step 4
            fn(...args);// Step 5
        }, delay);
    };
}


// convert node:latest to node
export const getNameFromTag = (tag: string) => {
    const split = tag?.split(":")

    if (split?.length == 1) return tag;

    return split?.[0]
}

export const getInformaticPorts = (ports: IDockerContainerPort[]): Set<string> => {
    let str = new Set<string>();

    for (const port of ports) {
        if (port.PublicPort && port.PrivatePort) {
            str.add(`${port.PrivatePort}:${port.PublicPort}/${port.Type}`)
            continue;
        }
        str.add(`${port.PrivatePort}/${port.Type}`)
    }

    return str
}
