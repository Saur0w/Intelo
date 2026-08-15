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
    const counterNumberRef = useRef<HTMLSpanElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const metaTopRef = useRef<HTMLDivElement>(null);
    const metaBottomRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const preloader = preloaderRef.current;
            const heading = headingRef.current;
            const counterNumber = counterNumberRef.current;
            const progressBar = progressBarRef.current;
            const metaTop = metaTopRef.current;
            const metaBottom = metaBottomRef.current;

            if (!preloader || !heading || !counterNumber || !progressBar) return;

            // Split heading characters
            const split = new SplitText(heading, {
                type: "chars,words",
                charsClass: styles.charInner,
                wordsClass: styles.wordMask,
            });

            gsap.set(split.chars, {
                yPercent: 120,
                opacity: 0,
            });

            gsap.set([metaTop, metaBottom], {
                opacity: 0,
                y: 12,
            });

            gsap.set(progressBar, {
                scaleX: 0,
                transformOrigin: "left center",
            });

            const countProgress = { value: 0 };

            const tl = gsap.timeline({
                onComplete: () => {
                    split.revert();
                    onComplete();
                },
            });

            tl
                // 1. Reveal micro metadata tags
                .to(
                    [metaTop, metaBottom],
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    0.15
                )

                // 2. Reveal central brand typography
                .to(
                    split.chars,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.1,
                        stagger: 0.025,
                        ease: "power4.out",
                    },
                    0.25
                )

                // 3. Increment counter & expand progress bar concurrently
                .to(
                    progressBar,
                    {
                        scaleX: 1,
                        duration: 2.2,
                        ease: "power2.inOut",
                    },
                    0.3
                )
                .to(
                    countProgress,
                    {
                        value: 100,
                        duration: 2.2,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            counterNumber.textContent = `${String(
                                Math.round(countProgress.value)
                            ).padStart(2, "0")}%`;
                        },
                    },
                    0.3
                )

                // 4. Subtle scale-up exit prep
                .to(
                    [heading, metaTop, metaBottom],
                    {
                        y: -25,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.in",
                    },
                    "+=0.15"
                )

                // 5. Curtain wipe upward out of view
                .to(
                    preloader,
                    {
                        yPercent: -100,
                        duration: 1.1,
                        ease: "power4.inOut",
                    },
                    "-=0.1"
                );
        },
        { scope: preloaderRef }
    );

    return (
        <section className={styles.preloader} ref={preloaderRef} aria-label="Loading Screen">
            {/* Top Bar Metadata */}
            <div className={styles.metaTop} ref={metaTopRef}>
                <span className={styles.metaLabel}>[ CANYON RANCH • WELLNESS SANCTUARY ]</span>
                <span className={styles.metaLabel}>EST. 1979</span>
            </div>

            {/* Central Brand Title */}
            <div className={styles.headingWrapper}>
                <h1 ref={headingRef} className={styles.heading}>
                    Canyon Ranch
                </h1>
            </div>

            {/* Bottom Counter & Progress Layout */}
            <div className={styles.bottomBar} ref={metaBottomRef}>
                <div className={styles.loadingInfo}>
                    <span className={styles.pulseDot} />
                    <span className={styles.statusText}>INITIALIZING SANCTUARY</span>
                </div>

                <div className={styles.progressContainer}>
                    <div className={styles.progressBar} ref={progressBarRef} />
                </div>

                <div className={styles.counterWrapper}>
                    <span className={styles.counterNumber} ref={counterNumberRef}>
                        00%
                    </span>
                </div>
            </div>
        </section>
    );
}