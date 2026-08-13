"use client";

import gsap from "gsap";
import { useRef } from "react";
import styles from "./style.module.scss";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

interface ImageProps {
    src: string;
    alt: string;
}

const images: ImageProps[] = [
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn8qd42fvh07k4t60fwcdy",
        alt: "Spa & Beauty"
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn4fai2fjp06k3apajmrnr",
        alt: "Health and Performance"
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn2bg52ah507k3kkmhfq2d",
        alt: "Fitness & Movement"
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn5zwr2gw106k3z817jg30",
        alt: "Mind & Spirit"
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn0ns1280i07k4ymirg63s",
        alt: "Nutrition and Food"
    }
];

export default function Five() {
    const fiveRef = useRef<HTMLDivElement>(null);
    return (
        <section className={styles.five} ref={fiveRef}>

        </section>
    )
}