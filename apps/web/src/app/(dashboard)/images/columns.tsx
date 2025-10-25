import { Badge } from "@/components/ui/badge";
import { convertSize, formatUnixTimestamp } from "@repo/shared";
import { ColumnDef } from "@tanstack/react-table";

export const ListImagesTableColumns: ColumnDef<any, any>[] = [

    {
        accessorKey: "Containers",
        header: "",
        cell: (props) => {
            const used = props.getValue() > 0;
            return (
                <Badge
                    variant={used ? "safe" : "pending"}
                    className="rounded-sm text-xs"
                >
                    {used ? "Used" : "Unused"}
                </Badge>
            )

        }
    },
   
    {
        accessorKey: "Size",
        header: "Size",

        cell: (props) => {

            const size = convertSize({
                sizeInBytes: props.getValue(),
                format: "mb"
            });

            return (
                <div>
                    {size}
                </div>
            )
        }
    },
    {
        accessorKey: "SharedSize",
        header: "Shared Size",

        cell: (props) => {

            const size = convertSize({
                sizeInBytes: props.getValue(),
                format: "mb"
            });

            return (
                <div>
                    {size}
                </div>
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