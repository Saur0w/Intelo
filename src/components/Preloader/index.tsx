"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, useGSAP);
}

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const counterContainerRef = useRef<HTMLDivElement>(null);
    const counterNumberRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const preloader = preloaderRef.current;
            const heading = headingRef.current;
            const counterContainer = counterContainerRef.current;
            const counterNumber = counterNumberRef.current;

            if (!preloader || !heading || !counterContainer || !counterNumber) return;

            const split = new SplitText(heading, {
                type: "chars,words"
            });

            gsap.set(split.chars, {
                yPercent: 120,
                opacity: 0,
            });

            gsap.set(counterContainer, {
                y: "35vh",
                opacity: 0,
            });

            const countProgress = { value: 0 };
            const tl = gsap.timeline({
                onComplete: () => {
                    split.revert();
                    onComplete();
                },
            });

            tl
                .to(
                    split.chars,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.025,
                        ease: "power4.out",
                    },
                    0.2
                )

                .to(
                    counterContainer,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 2.2,
                        ease: "power3.inOut",
                    },
                    0.2
                )

                .to(
                    countProgress,
                    {
                        value: 100,
                        duration: 2.2,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            counterNumber.textContent = `${Math.round(countProgress.value)}%`;
                        },
                    },
                    0.2
                )

                .to(
                    [heading, counterContainer],
                    {
                        y: -30,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.in",
                    },
                    "+=0.2"
                )

                .to(
                    preloader,
                    {
                        yPercent: -100,
                        duration: 1.1,
                        ease: "power4.inOut",
                    },
                    "-=0.15"
                );
        },
        { scope: preloaderRef }
    );

    return (
        <section className={styles.preloader} ref={preloaderRef}>
            <div className={styles.headingWrapper}>
                <h1 ref={headingRef} className={styles.heading}>
                    Canyon Ranch
                </h1>
            </div>

            <div className={styles.counter} ref={counterContainerRef}>
                <p className={styles.label}>loading</p>
                <span className={styles.number} ref={counterNumberRef}>
                    0%
                </span>
            </div>
        </section>
    );
}