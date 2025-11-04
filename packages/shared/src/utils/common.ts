import { IDockerContainerPort } from "../types/container.types";

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

export const getContainerName = (name: string) => {
    const split = name?.split("/");

    return split?.length === 1 ? name : split?.[split?.length - 1]
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


export const getCpuUsagePercentage = ({
    currentCpu,
    preCpu,
    onlineCpu
}: {
    currentCpu: {
        total_usage: number;
        system_cpu_usage: number;
    };
    preCpu: {
        total_usage: number;
        system_cpu_usage: number;
    },
    onlineCpu: number
}) => {

    console.log({
        currentCpu,
        preCpu
    })

    const cpuDelta = currentCpu.total_usage - preCpu.total_usage;
    const sysDelta = currentCpu.system_cpu_usage - preCpu.system_cpu_usage;

    const cpuPercentage = sysDelta > 0 ? (cpuDelta / sysDelta) * onlineCpu * 100 : 0;

    return cpuPercentage.toFixed(2);
}


// to fix later
export const getMemoryPercentage = ({
    used,
    total
}: {
    used: number;
    total: number
}) => {
    console.log({
        total,
        used
    })
    return ((used / total) * 100).toFixed(1);
}