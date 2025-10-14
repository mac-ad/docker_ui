

export const formatUnixTimestamp = (unixTimestamp: number) => {
    // If timestamp is in seconds, convert to milliseconds
    const ts = unixTimestamp < 1e12 ? unixTimestamp * 1000 : unixTimestamp;
    const date = new Date(ts);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const convertSize = ({
    sizeInBytes,
    format = "mb"
}: {
    sizeInBytes: number,
    format?: "mb" | "gb"
}) => {

    let size = 0;

    switch (format) {
        case "mb":
            size = sizeInBytes / (1000 * 1000)
            break

        case "gb":
            size = sizeInBytes / (1000 * 1000 * 1000)
            break
    }

    return size.toFixed(2) + ' ' + format.toUpperCase()

}