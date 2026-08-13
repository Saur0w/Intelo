"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface RanchItem {
    alt: string;
    src: string;
}

const ranch: RanchItem[] = [
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmp78i35j5i6d07lf8l0rox6a",
        alt: "Heal",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmrtituk3qa2r07lgqc1re8t2",
        alt: "SOMI",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:50/cmla04nhqfg2q07k2r2449gxe",
        alt: "PVOLE",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:50/cmr3tkh5h5sap07ldgh5f63uh",
        alt: "Stacy",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:50/cmpbt3bgb05z407lf5g5yldnu",
        alt: "SANDY",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:50/cmp5v5qy3f0it07ikbkw727sy",
        alt: "LENOX",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:50/cmpvoih5ebukx07k2iw3cin9e",
        alt: "TUSCON",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:50/cmmat4a0oyd1107li3ji27waj",
        alt: "Relationship",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:50/cmbfzzmqwv70807k2oh0yy637",
        alt: "Yoga",
    },
];

export default function Ranch() {
    const ranchRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cardsTrack = cardsRef.current;
            const section = ranchRef.current;
            if (!cardsTrack || !section) return;

            const images = gsap.utils.toArray<HTMLElement>(`.${styles.image}`);

            const getScrollAmount = () =>
                -(cardsTrack.scrollWidth - window.innerWidth + 100);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${cardsTrack.scrollWidth - window.innerWidth + 500}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(cardsTrack, {
                x: getScrollAmount,
                ease: "none",
            })
                .fromTo(
                    images,
                    { xPercent: 15 },
                    {
                        xPercent: -15,
                        ease: "none",
                    },
                    0
                );
        },
        { scope: ranchRef }
    );

    return (
        <section className={styles.ranch} ref={ranchRef}>
            <div className={styles.cards} ref={cardsRef}>
                {ranch.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className={styles.image}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}