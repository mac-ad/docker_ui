import { IconDashboard, IconDatabase, IconFileWord, IconHelp, IconReport, IconSearch, IconSettings } from "@tabler/icons-react";
import { Archive, Database, Disc, Network } from "lucide-react";

export const sidebar_data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },
        {
            title: "Containes",
            url: "/containers",
            icon: Archive,
        },
        {
            title: "Images",
            url: "/images",
            icon: Disc,
        },
        {
            title: "Volumes",
            url: "/volumes",
            icon: Database,
        },
        {
            title: "Networks",
            url: "/networks",
            icon: Network,
        },
    ],
}