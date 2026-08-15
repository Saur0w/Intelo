"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Contact from "@/components/Get";
import Preloader from "@/components/Preloader";
import { useState } from "react";
import Header from "@/components/Header";
import About from "@/components/About";
import Brands from "@/components/Brands";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import Methodology from "@/components/Methodology";
import Study from "@/components/Study";
import Five from "@/components/Five";

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={styles.page}>
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
        <Header isLoaded={isLoaded} />
        <Landing isLoaded={isLoaded} />
        <About />
        <Study />
        <Five />
        <Products />
        <Brands />
        <Methodology />
        <Contact />
        <Footer />
    </div>
  );
}
