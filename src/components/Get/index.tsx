"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgWatermarkRef = useRef<HTMLSpanElement>(null);
    const ambientGlowRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            // 1. Ambient Background Parallax Watermark
            if (bgWatermarkRef.current) {
                gsap.fromTo(
                    bgWatermarkRef.current,
                    { xPercent: 12, yPercent: -12 },
                    {
                        xPercent: -16,
                        yPercent: 12,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.8,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }

            // 2. Ambient Radial Glow Parallax
            if (ambientGlowRef.current) {
                gsap.fromTo(
                    ambientGlowRef.current,
                    { scale: 0.85, opacity: 0.4, yPercent: -20 },
                    {
                        scale: 1.25,
                        opacity: 0.9,
                        yPercent: 20,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.0,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }

            // 3. Central Content Parallax Float & Scale
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current,
                    { y: 50, scale: 0.96 },
                    {
                        y: -50,
                        scale: 1.03,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }

            // 4. Sub-Badge Parallax Micro-Glide
            if (badgeRef.current) {
                gsap.fromTo(
                    badgeRef.current,
                    { y: 25, opacity: 0.6 },
                    {
                        y: -20,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "bottom top",
                            scrub: 0.5,
                        },
                    }
                );
            }

            // 5. Bottom Tagline Parallax Drift
            if (taglineRef.current) {
                gsap.fromTo(
                    taglineRef.current,
                    { y: 30, letterSpacing: "0.12em" },
                    {
                        y: -25,
                        letterSpacing: "0.22em",
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                            end: "bottom top",
                            scrub: 0.7,
                        },
                    }
                );
            }
        },
        { scope: sectionRef }
    );

    return (
        <section className={styles.contact} ref={sectionRef} id="contact">
            {/* Background Parallax Watermark */}
            <div className={styles.bgWatermarkTrack} aria-hidden="true">
                <span ref={bgWatermarkRef} className={styles.bgWatermarkText}>
                    CONNECT • INQUIRE • EXPERIENCE • SANCTUARY
                </span>
            </div>

            <div ref={ambientGlowRef} className={styles.ambientGlow} aria-hidden="true" />

            <div ref={contentRef} className={styles.contentWrapper}>
                <div ref={badgeRef} className={styles.subBadge}>
                    <span className={styles.badgeDot} />
                    <span>08 / BEGIN THE JOURNEY</span>
                </div>

                <div className={styles.heading}>
                    <PerspectiveLink
                        href="/"
                        primary="Get to know us"
                        secondary="About us"
                    />
                </div>

                <span ref={taglineRef} className={styles.bottomTagline}>
                    Tucson • Lenox • Woodside • The Living Legacy
                </span>
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