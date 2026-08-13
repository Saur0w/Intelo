"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

interface AwardItem {
    alt: string;
    src: string;
}

const awards: AwardItem[] = [
    {
        alt: "Michelin 2025 Key Award",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmhwl4lli2yby07k2wpqzxzid",
    },
    {
        alt: "Forbes Travel Guide",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cma7dehbo6fia07iq5q4naarh",
    },
    {
        alt: "Condé Nast Traveler Readers' Choice Awards 2025",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmkd5sn2fibzz07lg40onvfnn",
    },
    {
        alt: "Travel + Leisure",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cm9ujoqn95gfq07lgbpntc8od",
    },
    {
        alt: "Condé Nast Traveler",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cm9ujxd325rcp06lkia9decam",
    },
];

export default function Legacy() {
    const legacyRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            if (!titleRef.current) return;

            const splitTitle = new SplitText(titleRef.current, {
                type: "words",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: legacyRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            tl.fromTo(
                splitTitle.words,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.03,
                    ease: "power2.out",
                    clearProps: "transform,opacity",
                }
            )
                .fromTo(
                    descRef.current,
                    { opacity: 0, y: 15 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        clearProps: "transform,opacity",
                    },
                    "-=0.3"
                )
                .fromTo(
                    `.${styles.awardCard}`,
                    { opacity: 0, y: 30, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.08,
                        ease: "power3.out",
                        clearProps: "transform,opacity",
                    },
                    "-=0.4"
                );

            return () => {
                splitTitle.revert();
            };
        },
        { scope: legacyRef }
    );

    return (
        <section className={styles.legacy} ref={legacyRef}>
            <div className={styles.headerGroup}>
                <h2 className={styles.title} ref={titleRef}>
                    A LEGACY OF EXPERTISE AND INNOVATION
                </h2>
                <p className={styles.description} ref={descRef}>
                    For over four decades, Canyon Ranch has set the golden standard for
                    time-honored healing practices and science-backed, cutting-edge care.
                </p>
            </div>

            <div className={styles.awardsGrid}>
                {awards.map((item, index) => (
                    <div key={index} className={styles.awardCard}>
                        <div className={styles.logoWrapper}>
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                sizes="180px"
                                className={styles.logo}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}