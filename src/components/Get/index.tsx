"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

export default function Contact() {
    return (
        <section className={styles.contact}>
            <div className={styles.heading}>
                <PerspectiveLink
                    href="/"
                    primary="Get to know us"
                    secondary="About us"
                />
            </div>
        </section>
    );
}

interface PerspectiveLinkProps {
    href: string;
    primary: string;
    secondary: string;
}

function PerspectiveLink({ href, primary, secondary }: PerspectiveLinkProps) {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const primaryRef = useRef<HTMLSpanElement>(null);
    const secondaryRef = useRef<HTMLSpanElement>(null);
    const lineRef = useRef<HTMLSpanElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const isHoveredRef = useRef(false);

    useGSAP(
        () => {
            const primaryEl = primaryRef.current;
            const secondaryEl = secondaryRef.current;
            const lineEl = lineRef.current;

            if (!primaryEl || !secondaryEl || !lineEl) return;

            const primaryChars = gsap.utils.toArray<HTMLElement>(
                primaryEl.querySelectorAll(`.${styles.char}`)
            );
            const secondaryChars = gsap.utils.toArray<HTMLElement>(
                secondaryEl.querySelectorAll(`.${styles.char}`)
            );

            if (!primaryChars.length || !secondaryChars.length) return;

            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            const setupAnimation = () => {
                const primaryWidth = primaryEl.getBoundingClientRect().width;
                const secondaryWidth = secondaryEl.getBoundingClientRect().width;

                if (!primaryWidth || !secondaryWidth) return;

                const wasHovered = isHoveredRef.current;

                gsap.set(lineEl, {
                    width: primaryWidth,
                    xPercent: -50,
                    scaleX: 1,
                    transformOrigin: "center center",
                });

                gsap.set(secondaryChars, {
                    yPercent: 110,
                    rotateX: -90,
                    opacity: 0,
                    transformOrigin: "50% 50% -20px",
                });

                gsap.set(primaryChars, {
                    yPercent: 0,
                    rotateX: 0,
                    opacity: 1,
                    transformOrigin: "50% 50% -20px",
                });

                if (tlRef.current) tlRef.current.kill();

                const scaleFactor = secondaryWidth / primaryWidth;
                const tl = gsap.timeline({ paused: true });

                if (reduceMotion) {
                    tl.to(primaryChars, { opacity: 0, duration: 0.2 }, 0)
                        .to(
                            secondaryChars,
                            { opacity: 1, yPercent: 0, rotateX: 0, duration: 0.2 },
                            0
                        )
                        .to(lineEl, { scaleX: scaleFactor, duration: 0.2 }, 0);
                } else {
                    tl.to(
                        primaryChars,
                        {
                            yPercent: -110,
                            rotateX: 90,
                            opacity: 0,
                            duration: 0.65,
                            ease: "power3.inOut",
                            stagger: { each: 0.015, from: "start" },
                        },
                        0
                    )
                        .to(
                            secondaryChars,
                            {
                                yPercent: 0,
                                rotateX: 0,
                                opacity: 1,
                                duration: 0.65,
                                ease: "power3.inOut",
                                stagger: { each: 0.015, from: "start" },
                            },
                            0.04
                        )
                        .to(
                            lineEl,
                            { scaleX: scaleFactor, duration: 0.65, ease: "expo.out" },
                            0
                        );
                }

                tlRef.current = tl;

                if (wasHovered) tl.progress(1);
            };

            setupAnimation();

            let rafId: number | null = null;
            const handleResize = () => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(setupAnimation);
            };
            window.addEventListener("resize", handleResize);

            if ("fonts" in document) {
                document.fonts.ready.then(setupAnimation);
            }

            return () => {
                window.removeEventListener("resize", handleResize);
                if (rafId) cancelAnimationFrame(rafId);
                tlRef.current?.kill();
            };
        },
        { scope: containerRef, dependencies: [primary, secondary] }
    );

    const handleMouseEnter = useCallback(() => {
        isHoveredRef.current = true;
        tlRef.current?.play();
    }, []);

    const handleMouseLeave = useCallback(() => {
        isHoveredRef.current = false;
        tlRef.current?.reverse();
    }, []);

    return (
        <Link
            href={href}
            ref={containerRef}
            className={styles.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
        >
            <div className={styles.textMask}>
                <span ref={primaryRef} className={styles.primary}>
                    {primary.split("").map((char, index) => (
                        <span key={`primary-${index}`} className={styles.char}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </span>

                <span ref={secondaryRef} className={styles.secondary}>
                    {secondary.split("").map((char, index) => (
                        <span key={`secondary-${index}`} className={styles.char}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </span>
            </div>

            <span ref={lineRef} className={styles.line} />
        </Link>
    );
}