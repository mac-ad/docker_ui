import { IconDashboard, IconDatabase, IconFileWord, IconHelp, IconReport, IconSearch, IconSettings } from "@tabler/icons-react";
import { Archive, Database, Disc, Network } from "lucide-react";

export const sidebar_data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },

    ],
    resources: [
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
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "Get Help",
            url: "#",
            icon: IconHelp,
        },
        {
            title: "Search",
            url: "#",
            icon: IconSearch,
        },
    ],
    documents: [
        {
            name: "Data Library",
            url: "#",
            icon: IconDatabase,
        },
        {
            name: "Reports",
            url: "#",
            icon: IconReport,
        },
        {
            name: "Word Assistant",
            url: "#",
            icon: IconFileWord,
        },
    ],
}