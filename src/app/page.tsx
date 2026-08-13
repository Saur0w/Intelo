"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Destination from "@/components/Destination";
import Offers from "@/components/Special";
import Reserve from "@/components/Reserve";
import Five from "@/components/Five";

export default function Home() {
  return (
    <div className={styles.page}>
        <Landing />
        <Destination />
        <Offers />
        <Reserve />
        <Five />
    </div>
  );
}
