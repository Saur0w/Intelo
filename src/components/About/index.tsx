"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

interface Milestone {
    year: string;
    tag: string;
    title: string;
    description: string;
}

const milestones: Milestone[] = [
    {
        year: "1978",
        tag: "THE CATALYST",
        title: "Pioneering the Well Way of Life",
        description:
            "Long before wellness became a multi-trillion dollar industry, Mel Zuckerman made the pivotal decision to change his sedentary lifestyle. After two weeks of intentional living, he realized he had transformed his life forever—and set out to guide others toward the same vitality."
    },
    {
        year: "1979",
        tag: "THE SANCTUARY",
        title: "The First Integrative Haven",
        description:
            "That mission came alive with the opening of the first Canyon Ranch in Tucson, Arizona. As a first-of-its-kind wellness destination, it bridged holistic ancient Eastern traditions and empirical Western medicine to nurture the mind, body, and spirit in unison."
    },
    {
        year: "TODAY",
        tag: "THE LIVING LEGACY",
        title: "The Vision Continues",
        description:
            "Practices first popularized at Canyon Ranch—integrative medicine, sound therapy, and intentional nutrition—are now worldwide pillars. Led by owner John Goff and our global collective of clinicians and guides, we continue to engineer the future of lifelong longevity."
    }
];

const stats = [
    { value: "1979", label: "Year Founded" },
    { value: "04", label: "Immersive Destinations" },
    { value: "100+", label: "Integrated Experts" },
    { value: "45+", label: "Years of Proven Answers" }
];

export default function About() {
    const aboutRef = useRef<HTMLDivElement>(null);
    const bgWatermarkRef = useRef<HTMLDivElement>(null);
    const bgWatermarkSecRef = useRef<HTMLDivElement>(null);
    const ambientGlowRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const subLabelRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const manifestoWrapperRef = useRef<HTMLDivElement>(null);
    const manifestoRef = useRef<HTMLParagraphElement>(null);
    const stickyColRef = useRef<HTMLElement>(null);
    const stickyHeadingRef = useRef<HTMLHeadingElement>(null);
    const stickyDescRef = useRef<HTMLParagraphElement>(null);
    const storyListRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const footerNoteRef = useRef<HTMLElement>(null);
    const quoteRef = useRef<HTMLParagraphElement>(null);
    const signatureRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const container = aboutRef.current;
            if (!container) return;

            if (bgWatermarkRef.current) {
                gsap.fromTo(
                    bgWatermarkRef.current,
                    { xPercent: 12, yPercent: -15 },
                    {
                        xPercent: -18,
                        yPercent: 15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.8,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }

            if (bgWatermarkSecRef.current) {
                gsap.fromTo(
                    bgWatermarkSecRef.current,
                    { xPercent: -15, yPercent: 12 },
                    {
                        xPercent: 15,
                        yPercent: -12,
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.0,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }

            if (ambientGlowRef.current) {
                gsap.fromTo(
                    ambientGlowRef.current,
                    { yPercent: -25, scale: 0.85, opacity: 0.4 },
                    {
                        yPercent: 30,
                        scale: 1.25,
                        opacity: 0.9,
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.2,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }

            if (subLabelRef.current) {
                const splitSub = new SplitText(subLabelRef.current, {
                    type: "words",
                    wordsClass: styles.wordMask,
                });

                gsap.fromTo(
                    splitSub.words,
                    { yPercent: 110, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.02,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: subLabelRef.current,
                            start: "top 85%",
                        },
                    }
                );

                gsap.fromTo(
                    subLabelRef.current,
                    { y: 15 },
                    {
                        y: -25,
                        ease: "none",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 85%",
                            end: "bottom top",
                            scrub: 0.5,
                        },
                    }
                );
            }

            if (titleRef.current) {
                const splitTitle = new SplitText(titleRef.current, {
                    type: "words,chars",
                    wordsClass: styles.wordMask,
                    charsClass: styles.charInner,
                });

                gsap.fromTo(
                    splitTitle.chars,
                    { yPercent: 120, opacity: 0, rotateZ: 3 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        rotateZ: 0,
                        duration: 1.1,
                        stagger: 0.015,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 82%",
                        },
                    }
                );

                gsap.fromTo(
                    titleRef.current,
                    { y: 0 },
                    {
                        y: -45,
                        ease: "none",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 75%",
                            end: "bottom top",
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }

            if (headerRef.current) {
                gsap.to(headerRef.current, {
                    yPercent: -12,
                    ease: "none",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });
            }

            if (manifestoRef.current) {
                const splitManifesto = new SplitText(manifestoRef.current, {
                    type: "lines,words",
                    linesClass: styles.lineMask,
                    wordsClass: styles.wordInner,
                });

                gsap.fromTo(
                    splitManifesto.words,
                    { yPercent: 115, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.0,
                        stagger: 0.015,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: manifestoRef.current,
                            start: "top 80%",
                        },
                    }
                );

                gsap.fromTo(
                    manifestoRef.current,
                    { yPercent: 16, rotateX: 3 },
                    {
                        yPercent: -16,
                        rotateX: -2,
                        ease: "none",
                        scrollTrigger: {
                            trigger: manifestoWrapperRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.7,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }

            if (stickyHeadingRef.current) {
                const splitStickyHeading = new SplitText(stickyHeadingRef.current, {
                    type: "lines,words",
                    linesClass: styles.lineMask,
                    wordsClass: styles.wordInner,
                });

                gsap.fromTo(
                    splitStickyHeading.words,
                    { yPercent: 120, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.9,
                        stagger: 0.02,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: stickyHeadingRef.current,
                            start: "top 85%",
                        },
                    }
                );

                gsap.fromTo(
                    stickyHeadingRef.current,
                    { y: 15 },
                    {
                        y: -30,
                        ease: "none",
                        scrollTrigger: {
                            trigger: storyListRef.current,
                            start: "top 70%",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    }
                );
            }

            if (stickyDescRef.current) {
                const splitStickyDesc = new SplitText(stickyDescRef.current, {
                    type: "lines",
                    linesClass: styles.lineMask,
                });

                gsap.fromTo(
                    splitStickyDesc.lines,
                    { yPercent: 110, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.85,
                        stagger: 0.06,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: stickyDescRef.current,
                            start: "top 85%",
                        },
                    }
                );

                gsap.fromTo(
                    stickyDescRef.current,
                    { y: 20 },
                    {
                        y: -15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: storyListRef.current,
                            start: "top 70%",
                            end: "bottom top",
                            scrub: 0.8,
                        },
                    }
                );
            }

            const cards = storyListRef.current?.querySelectorAll<HTMLElement>(`.${styles.storyCard}`);
            if (cards) {
                cards.forEach((card, idx) => {
                    const line = card.querySelector(`.${styles.cardLine}`);
                    const year = card.querySelector(`.${styles.cardYear}`);
                    const tag = card.querySelector(`.${styles.cardTag}`);
                    const title = card.querySelector(`.${styles.cardTitle}`);
                    const desc = card.querySelector(`.${styles.cardDesc}`);
                    const body = card.querySelector(`.${styles.cardBody}`);

                    const cardTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    });

                    if (line) {
                        cardTl.fromTo(
                            line,
                            { scaleX: 0, transformOrigin: "left center", opacity: 0.3 },
                            { scaleX: 1, opacity: 1, duration: 1, ease: "power3.inOut" }
                        );
                    }

                    if (year && tag) {
                        cardTl.fromTo(
                            [year, tag],
                            { y: 24, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
                            "-=0.6"
                        );
                    }

                    if (title) {
                        const splitCardTitle = new SplitText(title, {
                            type: "lines,words",
                            linesClass: styles.lineMask,
                            wordsClass: styles.wordInner,
                        });

                        cardTl.fromTo(
                            splitCardTitle.words,
                            { yPercent: 110, opacity: 0 },
                            { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.02, ease: "power3.out" },
                            "-=0.4"
                        );
                    }

                    if (desc) {
                        const splitCardDesc = new SplitText(desc, {
                            type: "lines",
                            linesClass: styles.lineMask,
                        });

                        cardTl.fromTo(
                            splitCardDesc.lines,
                            { yPercent: 110, opacity: 0 },
                            { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power3.out" },
                            "-=0.5"
                        );
                    }

                    if (body) {
                        const startY = idx % 2 === 0 ? 25 : 45;
                        const endY = idx % 2 === 0 ? -40 : -75;
                        gsap.fromTo(
                            body,
                            { y: startY },
                            {
                                y: endY,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: 0.6 + idx * 0.1,
                                    invalidateOnRefresh: true,
                                },
                            }
                        );
                    }

                    if (year) {
                        gsap.fromTo(
                            year,
                            { x: idx % 2 === 0 ? -8 : 8 },
                            {
                                x: idx % 2 === 0 ? 12 : -12,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: 0.7,
                                },
                            }
                        );
                    }
                });
            }

            const statItems = statsRef.current?.querySelectorAll<HTMLElement>(`.${styles.statItem}`);
            if (statItems) {
                statItems.forEach((item, idx) => {
                    const numberElem = item.querySelector(`.${styles.statNumber}`);
                    const labelElem = item.querySelector(`.${styles.statLabel}`);

                    const statTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                        },
                    });

                    statTl
                        .fromTo(
                            numberElem,
                            { yPercent: 100, opacity: 0 },
                            { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" }
                        )
                        .fromTo(
                            labelElem,
                            { y: 12, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
                            "-=0.5"
                        );

                    const parallaxSpeed = ((idx % 2) + 1) * -35 - (idx * 6);
                    gsap.fromTo(
                        item,
                        { y: 25 },
                        {
                            y: parallaxSpeed,
                            ease: "none",
                            scrollTrigger: {
                                trigger: statsRef.current,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 0.6 + idx * 0.1,
                                invalidateOnRefresh: true,
                            },
                        }
                    );

                    if (numberElem) {
                        gsap.fromTo(
                            numberElem,
                            { yPercent: 12, scale: 0.95 },
                            {
                                yPercent: -18,
                                scale: 1.04,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: item,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: 0.7,
                                },
                            }
                        );
                    }
                });
            }

            if (quoteRef.current) {
                const splitQuote = new SplitText(quoteRef.current, {
                    type: "lines,words",
                    linesClass: styles.lineMask,
                    wordsClass: styles.wordInner,
                });

                gsap.fromTo(
                    splitQuote.words,
                    { yPercent: 115, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.9,
                        stagger: 0.015,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: quoteRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }

            if (footerNoteRef.current) {
                gsap.fromTo(
                    footerNoteRef.current,
                    { y: 55, rotateX: 4 },
                    {
                        y: -45,
                        rotateX: -2,
                        ease: "none",
                        scrollTrigger: {
                            trigger: footerNoteRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.7,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }

            if (signatureRef.current) {
                gsap.fromTo(
                    signatureRef.current,
                    { x: -20, letterSpacing: "0.12em" },
                    {
                        x: 20,
                        letterSpacing: "0.22em",
                        ease: "none",
                        scrollTrigger: {
                            trigger: footerNoteRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.8,
                        },
                    }
                );
            }
        },
        { scope: aboutRef }
    );

    return (
        <section className={styles.about} ref={aboutRef} id="about">
            <div className={styles.bgWatermarkTrack} aria-hidden="true">
                <span ref={bgWatermarkRef} className={styles.bgWatermarkText}>
                    INTEGRATIVE • SANCTUARY • VITALITY • HERITAGE
                </span>
            </div>

            <div className={styles.bgWatermarkTrackSecondary} aria-hidden="true">
                <span ref={bgWatermarkSecRef} className={styles.bgWatermarkTextSecondary}>
                    [ EST. 1979 ] • LIFELONG LONGEVITY • TUCSON
                </span>
            </div>

            <div ref={ambientGlowRef} className={styles.ambientGlow} aria-hidden="true" />

            <div className={styles.container}>
                <header className={styles.header} ref={headerRef}>
                    <div className={styles.subLabel} ref={subLabelRef}>
                        <span className={styles.badgeDot} />
                        <span>ORIGIN & PHILOSOPHY</span>
                    </div>
                    <h2 ref={titleRef} className={styles.mainTitle}>
                        Inspiring Your Well Way of Life
                    </h2>
                </header>

                <div className={styles.manifestoWrapper} ref={manifestoWrapperRef}>
                    <p ref={manifestoRef} className={styles.manifestoText}>
                        <span className={styles.manifestoLead}>The original trailblazer</span> of integrative wellness, Canyon Ranch began with one man’s pursuit of vitality before wellness was a household word. That pursuit has since transformed an industry and guided countless individuals to realize their highest state of longevity.
                    </p>
                </div>

                <div className={styles.storySection}>
                    <aside className={styles.stickyColumn} ref={stickyColRef}>
                        <span className={styles.stickyIndex}>01 / HERITAGE</span>
                        <h3 ref={stickyHeadingRef} className={styles.stickyHeading}>
                            A four-decade compass for lifelong well-being.
                        </h3>
                        <p ref={stickyDescRef} className={styles.stickyDescription}>
                            Where ancient wisdom aligns with medical rigor across four immersive sanctuaries in Tucson, Lenox, Woodside, and beyond.
                        </p>
                    </aside>

                    <div className={styles.storyList} ref={storyListRef}>
                        {milestones.map((item, idx) => (
                            <article key={idx} className={styles.storyCard}>
                                <div className={styles.cardLine} />
                                <div className={styles.cardBody}>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.cardYear}>{item.year}</span>
                                        <span className={styles.cardTag}>{item.tag}</span>
                                    </div>
                                    <h4 className={styles.cardTitle}>{item.title}</h4>
                                    <p className={styles.cardDesc}>{item.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className={styles.statsGrid} ref={statsRef}>
                    {stats.map((stat, idx) => (
                        <div key={idx} className={styles.statItem}>
                            <div className={styles.statNumberMask}>
                                <span className={styles.statNumber}>{stat.value}</span>
                            </div>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>

                <footer className={styles.footerNote} ref={footerNoteRef}>
                    <p ref={quoteRef} className={styles.quote}>
                        “We continue to deliver new ways to well-being where you visit, stay, and live—never losing sight of personal transformation.”
                    </p>
                    <span ref={signatureRef} className={styles.signature}>
                        Canyon Ranch Integrative Collective
                    </span>
                </footer>
            </div>
        </section>
    );
}