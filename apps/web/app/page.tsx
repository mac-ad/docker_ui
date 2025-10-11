export const dynamic = 'force-dynamic'

import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { IDockerContainer, getData } from "@repo/shared";
import { Tooltip } from "@repo/ui/tooltip";


export default async function Home() {

  const { data } = await getData(`${process.env.NEXT_PUBLIC_API_URL}/containers`);


  return (
    <div className={styles.page}>
      <Button className="text-2xl" />
      <Tooltip />
      {
        data?.map((item: IDockerContainer) => (
          <h1>{item.Id}</h1>
        ))
      }
    </div>
  );
}
