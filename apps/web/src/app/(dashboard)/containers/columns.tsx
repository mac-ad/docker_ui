import { Badge } from "@/components/ui/badge";
import { formatUnixTimestamp } from "@repo/shared";
import { ColumnDef } from "@tanstack/react-table";

export const ListContainersTableColumns: ColumnDef<any, any>[] = [
    {
        accessorKey: "State",
        header: "",
        cell: (props) => {
            const state = props.getValue();

            const row = props.row.original;

            const exitCode: number | null = state === "exited" ? row.Status.match(/\(([^)]+)\)/)?.[1] : null;

            console.log(exitCode)

            const getVariant = (state: string) => {
                switch (state) {
                    case "running":
                        return "safe";
                    case "exited":
                        return "destructive";
                    case "created":
                        return "stale"
                    default:
                        return "default"
                }
            }

            return (
                <Badge
                    className="rounded-sm text-xs"
                    variant={getVariant(state)}
                >
                    <span>
                        {state}

                    </span>
                    {
                        exitCode && <span>
                            code - {exitCode}
                        </span>
                    }
                </Badge>
            )
        }
    },
    {
        accessorKey: "Created",
        header: "Created",
        cell: (props) => {

            const date = formatUnixTimestamp(props.getValue());

            return (
                <div>
                    {date.toString()}
                </div>
            )
        }
    },
]
