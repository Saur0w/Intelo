"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

interface ApproachRow {
    premise: string;
    description: string;
}

const approachData: ApproachRow[] = [
    {
        premise: "A foundational philosophy: integrative longevity.",
        description:
            "We unite Eastern restorative traditions and Western medical science to deliver enduring vitality. Every regimen is personalized, every practice evidence-based, and every outcome transformative.",
    },
    {
        premise: "Wisdom & empirical proof. You need both.",
        description:
            "True equilibrium isn't built on fleeting escapes. Cellular vitality, emotional resonance, and intentional nutrition are the pillars of lasting transformation. This is how proven wellness guides lifelong health.",
    },
];

export default function Approach() {
    const containerRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const imgInnerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const container = containerRef.current;
            if (!container) return;

            if (headingRef.current) {
                const splitHeading = new SplitText(headingRef.current, {
                    type: "words,chars",
                    charsClass: styles.charInner,
                    wordsClass: styles.wordMask,
                });

                gsap.fromTo(
                    splitHeading.chars,
                    { yPercent: 115, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.95,
                        stagger: 0.02,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 82%",
                        },
                    }
                );
            }

            const rows = container.querySelectorAll(`.${styles.row}`);
            rows.forEach((row) => {
                const line = row.querySelector(`.${styles.divider}`);
                const leftText = row.querySelector(`.${styles.leftCol}`);
                const rightText = row.querySelector(`.${styles.rightCol}`);

                const rowTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: row,
                        start: "top 80%",
                    },
                });

                if (line) {
                    rowTl.fromTo(
                        line,
                        { scaleX: 0, transformOrigin: "left center" },
                        { scaleX: 1, duration: 1.1, ease: "power3.inOut" }
                    );
                }

                if (leftText && rightText) {
                    const splitLeft = new SplitText(leftText, {
                        type: "lines",
                        linesClass: styles.lineMask,
                    });
                    const splitRight = new SplitText(rightText, {
                        type: "lines",
                        linesClass: styles.lineMask,
                    });

                    rowTl.fromTo(
                        [splitLeft.lines, splitRight.lines],
                        { yPercent: 120, opacity: 0 },
                        {
                            yPercent: 0,
                            opacity: 1,
                            stagger: 0.04,
                            duration: 0.85,
                            ease: "power3.out",
                        },
                        "-=0.7"
                    );
                }
            });

            if (imageWrapperRef.current && imgInnerRef.current) {
                gsap.fromTo(
                    imageWrapperRef.current,
                    {
                        clipPath: "inset(22% 16% 22% 16% round 16px)",
                    },
                    {
                        clipPath: "inset(0% 0% 0% 0% round 0px)",
                        ease: "none",
                        scrollTrigger: {
                            trigger: imageWrapperRef.current,
                            start: "top 85%",
                            end: "bottom 85%",
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        },
                    }
                );

                gsap.fromTo(
                    imgInnerRef.current,
                    { scale: 1.2 },
                    {
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: imageWrapperRef.current,
                            start: "top 85%",
                            end: "bottom 85%",
                            scrub: 0.6,
                        },
                    }
                );
            }
        },
        { scope: containerRef }
    );

    return (
        <section className={styles.approachSection} ref={containerRef}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 ref={headingRef} className={styles.title}>
                        The well way of life.
                    </h2>
                </div>

                <div className={styles.rowsWrapper} ref={contentRef}>
                    {approachData.map((item, index) => (
                        <div key={index} className={styles.row}>
                            <div className={styles.divider} />
                            <div className={styles.rowContent}>
                                <div className={styles.leftCol}>
                                    <p>{item.premise}</p>
                                </div>
                                <div className={styles.rightCol}>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={styles.bottomDivider} />
                </div>

                <div className={styles.imageSection}>
                    <div className={styles.imageWrapper} ref={imageWrapperRef}>
                        <div className={styles.imgInner} ref={imgInnerRef}>
                            <Image
                                src="https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazl78c60nco06l8xs20sewx"
                                alt="Canyon Ranch Sanctuary Retreat"
                                fill
                                sizes="100vw"
                                unoptimized
                                priority={false}
                                className={styles.mediaImage}
                            />
                            <div className={styles.overlay} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}