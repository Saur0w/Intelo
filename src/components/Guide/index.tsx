"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

export default function Guide() {
    const guideRef = useRef<HTMLDivElement>(null);
    return (
        <section className={styles.guide} ref={guideRef}>

        </section>
    );
}