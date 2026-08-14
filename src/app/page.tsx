"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Destination from "@/components/Destination";
import Contact from "@/components/Get";
import Preloader from "@/components/Preloader";
import { useState } from "react";
import Header from "@/components/Header";
import About from "@/components/About";
import Des from "@/components/Des";
import Brands from "@/components/Brands";
import Footer from "@/components/Footer";
import Products from "@/components/Products";

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
        <Products />
        <Brands />
        <Contact />
        <Footer />
    </div>
  );
}
