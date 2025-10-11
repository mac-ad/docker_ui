import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { Tooltip } from "@repo/ui/tooltip";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export default function Home() {
  return (
    <div className={styles.page}>
      <Button />
      <Tooltip />
    </div>
  );
}
