"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Destination from "@/components/Destination";
import Offers from "@/components/Special";
import Reserve from "@/components/Reserve";
import Five from "@/components/Five";
import Guide from "@/components/Guide";
import Shops from "@/components/Shops";
import Legacy from "@/components/Legacy";
import Ranch from "@/components/Ranch";
import Contact from "@/components/Get";
import Preloader from "@/components/Preloader";
import { useState } from "react";
import Header from "@/components/Header";
import About from "@/components/About";
import Des from "@/components/Des";
import Brands from "@/components/Brands";

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={styles.page}>
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
        <Header isLoaded={isLoaded} />
        <Landing isLoaded={isLoaded} />
        <Des />
        <About />
        <Destination />
        <Brands />
        <Ranch />
        <Offers />
        <Reserve />
        <Five />
        <Guide />
        <Shops />
        <Legacy />
        <Contact />
    </div>
  );
}
