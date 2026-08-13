"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

export default function Destination() {
    return (
        <section className={styles.destination}>
            <div className={styles.heading}>
                <h1>Our Destination</h1>
            </div>
        </section>
    )
}