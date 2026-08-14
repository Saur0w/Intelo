"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export interface AwardItem {
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

// Duplicate items for a seamless, unbroken infinite loop
const marqueeAwards = [...awards, ...awards, ...awards, ...awards];

export default function Brands() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const track = trackRef.current;
            const section = sectionRef.current;
            if (!track || !section) return;

            gsap.set(track, { xPercent: 0 });

            // Slow, serene marquee drift (40s loop)
            const marqueeTween = gsap.to(track, {
                xPercent: -50,
                repeat: -1,
                duration: 40,
                ease: "none",
            });

            let currentDirection = 1; // 1 = Left, -1 = Right

            ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    const dir = self.direction; // 1 (scroll down) or -1 (scroll up)
                    const velocity = Math.min(Math.abs(self.getVelocity() / 450), 2.5);

                    if (dir !== currentDirection) {
                        currentDirection = dir;
                    }

                    // Reactively switch direction and subtly accelerate on scroll
                    gsap.to(marqueeTween, {
                        timeScale: (1 + velocity) * currentDirection,
                        duration: 0.35,
                        overwrite: "auto",
                        onComplete: () => {
                            gsap.to(marqueeTween, {
                                timeScale: currentDirection,
                                duration: 1,
                                ease: "power2.out",
                            });
                        },
                    });
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section className={styles.brands} ref={sectionRef} aria-label="Brand Recognitions">
            <div className={styles.marqueeViewport}>
                <div className={styles.marqueeTrack} ref={trackRef}>
                    {marqueeAwards.map((item, index) => (
                        <div
                            key={`${item.alt}-${index}`}
                            className={styles.awardCard}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    sizes="(max-width: 768px) 140px, 180px"
                                    unoptimized
                                    className={styles.awardImg}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}