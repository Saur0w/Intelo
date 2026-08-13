"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

export default function Footer() {
    return (
        <footer className={styles.footer}>

        </footer>
    )
}