import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useParams } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';
import AnsiToHtml from 'ansi-to-html';
import { Button } from '@/components/ui/button';

const convert = new AnsiToHtml({ newline: false, escapeXML: true });


const ContainerLogs = () => {

    const [logs, setLogs] = useState<string>("");
    const ES = useRef<EventSource>(null);

    const { id } = useParams();

    console.log(logs)

    const fetchLogs = () => {
        try {
            let es = ES.current;

            es = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/containers/${id}/logs`);

            es.onmessage = (e) => {
                const html = convert.toHtml(e.data).replace(/[^\x1b\x09\x0a\x0d\x20-\x7e]/g, "");
                ;
                // setLogs((prev) => ([
                //     ...prev,
                //     e.data
                // ]))
                setLogs(prev => prev + html + "\n")
            }


            es.onerror = (e) => {
                console.log("Error: ", e)
            };

            es.addEventListener("end", (e) => {
                console.log("Stream ended:", e.data);
                es.close();
            });

        } catch (err) {
            toast.error("Failed to fetch logs")
        }
    }

    // useEffect(() => {
    //     fetchLogs()

    //     return () => {
    //         ES?.current?.close();
    //     }

    // }, [])


    return (
        <Card>
            <CardHeader>
                <Button
                    onClick={() => fetchLogs()}
                >
                    fetch logs
                </Button>
            </CardHeader>
            <CardContent>
                {/* {
                    logs?.map((item) => (
                        <>
                            {item}
                        </>
                    ))
                } */}
                <div
                    className="bg-black text-white p-4 h-[500px] overflow-auto font-mono text-xs opacity-80"
                >
                    <pre style={{ whiteSpace: "pre", margin: 0 }} dangerouslySetInnerHTML={{ __html: logs }} />
                </div>
            </CardContent>
        </Card>
    )
}

export default ContainerLogs
