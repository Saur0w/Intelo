"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

export interface PillarItem {
    id: string;
    num: string;
    tag: string;
    title: string;
    subtitle: string;
    description: string;
    src: string;
    alt: string;
    iconSvg: React.ReactNode;
}

const pillars: PillarItem[] = [
    {
        id: "spa-beauty",
        num: "01",
        tag: "[ RESTORATION & TOUCH ]",
        title: "SPA & BEAUTY",
        subtitle: "Cellular Healing & Hydrotherapy",
        description:
            "Promote profound relaxation and cellular vitality through healing therapeutic bodywork, bespoke skin ritual therapies, and restorative mineral wraps.",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn8qd42fvh07k4t60fwcdy",
        alt: "Woman meditating in nature",
        iconSvg: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9z" />
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                <path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
        ),
    },
    {
        id: "health-performance",
        num: "02",
        tag: "[ DIAGNOSTICS & MEDICINE ]",
        title: "HEALTH & PERFORMANCE",
        subtitle: "Integrative Longevity Protocols",
        description:
            "Go far beyond immediate symptoms with diagnostic precision, clinical wellness scans, and personalized preventive longevity plans formulated by leading physicians.",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn4fai2fjp06k3apajmrnr",
        alt: "Doctor discussing health results",
        iconSvg: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.78L12 20.66l7.65-7.65.77-.78a5.4 5.4 0 0 0 0-7.65z" />
                <path d="M3.5 12h4l2-4 3 8 2-4h6" />
            </svg>
        ),
    },
    {
        id: "fitness-movement",
        num: "03",
        tag: "[ KINETIC VITALITY ]",
        title: "FITNESS & MOVEMENT",
        subtitle: "Functional Biometrics & Joyful Motion",
        description:
            "Enhance everyday functional mobility, core strength, and athletic longevity across guided mountain hikes, court athletics, and personalized biometric coaching.",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn2bg52ah507k3kkmhfq2d",
        alt: "Fitness stretching exercises",
        iconSvg: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="5" r="2" />
                <path d="m9 20 3-6 3 6" />
                <path d="m6 8 6 2 6-2" />
                <path d="M12 10v4" />
            </svg>
        ),
    },
    {
        id: "mind-spirit",
        num: "04",
        tag: "[ EQUILIBRIUM & PURPOSE ]",
        title: "MIND & SPIRIT",
        subtitle: "Resonance Baths & Contemplation",
        description:
            "Pursue emotional clarity and purposeful living through sound resonance baths, meditation sanctuaries, behavioral coaching, and ancient spiritual rituals.",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn5zwr2gw106k3z817jg30",
        alt: "Sound bath meditation session",
        iconSvg: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M12 6a6 6 0 0 0-6 6c0 3.31 2.69 6 6 6s6-2.69 6-6a6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
            </svg>
        ),
    },
    {
        id: "nutrition-food",
        num: "05",
        tag: "[ CULINARY MEDICINE ]",
        title: "NUTRITION & FOOD",
        subtitle: "Soil-to-Table Metabolic Nourishment",
        description:
            "Pinpoint sustainable strategies for metabolic health and anti-inflammatory vitality informed by executive chefs and integrative nutritionists using organic ingredients.",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn0ns1280i07k4ymirg63s",
        alt: "Healthy nutritious food bowl",
        iconSvg: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L4 9l2 11h12l2-11-8-7z" />
                <path d="M12 7v10" />
                <path d="M9 12h6" />
            </svg>
        ),
    },
];

export default function Pillars() {
    const sectionRef = useRef<HTMLElement>(null);
    const mediaContainerRef = useRef<HTMLDivElement>(null);
    const manifestoRef = useRef<HTMLParagraphElement>(null);
    const sectionTitleRef = useRef<HTMLHeadingElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const isAnimatingRef = useRef(false);

    const transitionPillar = useCallback((nextIdx: number) => {
        if (nextIdx === activeIndex || isAnimatingRef.current) return;
        const container = mediaContainerRef.current;
        if (!container) return;

        isAnimatingRef.current = true;
        const allSlides = container.querySelectorAll<HTMLElement>(`.${styles.mediaSlide}`);
        const currentSlide = allSlides[activeIndex];
        const incomingSlide = allSlides[nextIdx];

        if (!currentSlide || !incomingSlide) {
            isAnimatingRef.current = false;
            return;
        }

        const incomingImg = incomingSlide.querySelector(`.${styles.slideImg}`);
        const currentImg = currentSlide.querySelector(`.${styles.slideImg}`);

        setActiveIndex(nextIdx);

        gsap.set(incomingSlide, {
            zIndex: 4,
            clipPath: "inset(100% 0% 0% 0%)",
            autoAlpha: 1,
        });
        gsap.set(currentSlide, { zIndex: 2 });
        gsap.set(incomingImg, { scale: 1.18 });

        const tl = gsap.timeline({
            defaults: { ease: "power4.inOut" },
            onComplete: () => {
                gsap.set(currentSlide, { zIndex: 1, autoAlpha: 0 });
                gsap.set(incomingSlide, { zIndex: 3 });
                isAnimatingRef.current = false;
            },
        });

        tl.to(
            incomingSlide,
            {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.1,
            },
            0
        )
            .to(
                incomingImg,
                {
                    scale: 1,
                    duration: 1.25,
                    ease: "power3.out",
                },
                0
            )
            .to(
                currentImg,
                {
                    scale: 0.95,
                    duration: 1.1,
                },
                0
            );
    }, [activeIndex]);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            if (manifestoRef.current) {
                const splitManifesto = new SplitText(manifestoRef.current, {
                    type: "lines,words",
                    linesClass: styles.lineMask,
                    wordsClass: styles.wordMask,
                });

                gsap.fromTo(
                    splitManifesto.words,
                    { yPercent: 115, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.95,
                        stagger: 0.015,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: manifestoRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }

            if (sectionTitleRef.current) {
                const splitTitle = new SplitText(sectionTitleRef.current, {
                    type: "words,chars",
                    charsClass: styles.charInner,
                    wordsClass: styles.wordMask,
                });

                gsap.fromTo(
                    splitTitle.chars,
                    { yPercent: 120, opacity: 0, rotateZ: 3 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        rotateZ: 0,
                        duration: 1.05,
                        stagger: 0.012,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: sectionTitleRef.current,
                            start: "top 82%",
                        },
                    }
                );
            }

            const pillarCards = section.querySelectorAll<HTMLElement>(`.${styles.pillarItem}`);
            pillarCards.forEach((card, index) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top 55%",
                    end: "bottom 55%",
                    onEnter: () => transitionPillar(index),
                    onEnterBack: () => transitionPillar(index),
                });
            });

            const allSlides = section.querySelectorAll<HTMLElement>(`.${styles.mediaSlide}`);
            allSlides.forEach((slide, idx) => {
                if (idx === 0) {
                    gsap.set(slide, { zIndex: 3, autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" });
                } else {
                    gsap.set(slide, { zIndex: 1, autoAlpha: 0, clipPath: "inset(100% 0% 0% 0%)" });
                }
            });
        },
        { scope: sectionRef }
    );

    return (
        <section className={styles.pillarsSection} ref={sectionRef} id="methodology">
            <div className={styles.container}>
                <header className={styles.topHeader}>
                    <div className={styles.eyebrowTag}>
                        <span className={styles.pulseDot} />
                        <span>A TRAILBLAZER IN INTEGRATIVE WELLNESS</span>
                    </div>

                    <p ref={manifestoRef} className={styles.manifestoLead}>
                        Wellness is personal. At Canyon Ranch, we celebrate that no two paths are the same by offering a breadth of immersive experiences for every kind of journey—inspired by our five foundational pillars.
                    </p>
                </header>

                <div className={styles.mainLayout}>
                    <div className={styles.stickyCanvasColumn}>
                        <div className={styles.mediaFrame} ref={mediaContainerRef}>
                            {pillars.map((pillar, idx) => (
                                <div
                                    key={pillar.id}
                                    className={`${styles.mediaSlide} ${idx === activeIndex ? styles.slideActive : ""}`}
                                >
                                    <div className={styles.slideImgWrapper}>
                                        <Image
                                            src={pillar.src}
                                            alt={pillar.alt}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            unoptimized
                                            priority={idx === 0}
                                            className={styles.slideImg}
                                        />
                                        <div className={styles.mediaOverlay} />
                                    </div>

                                    <div className={styles.imageHeaderBadge}>
                                        <span className={styles.badgeNum}>[ {pillar.num} / 05 ]</span>
                                        <span className={styles.badgeTag}>{pillar.tag}</span>
                                    </div>

                                    <div className={styles.imageFooterBadge}>
                                        <span className={styles.badgeSubtitle}>{pillar.subtitle}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.contentColumn}>
                        <div className={styles.columnHeader}>
                            <span className={styles.subTag}>[ THE ARCHITECTURE OF VITALITY ]</span>
                            <h2 ref={sectionTitleRef} className={styles.sectionHeading}>
                                Five Wellness Pillars. One You.
                            </h2>
                        </div>

                        <div className={styles.pillarsList}>
                            {pillars.map((pillar, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <article
                                        key={pillar.id}
                                        className={`${styles.pillarItem} ${isActive ? styles.itemActive : ""}`}
                                        onClick={() => transitionPillar(index)}
                                    >
                                        <div className={styles.itemTopRow}>
                                            <div className={styles.iconBox}>{pillar.iconSvg}</div>
                                            <div className={styles.titleMeta}>
                                                <div className={styles.titleFlex}>
                                                    <span className={styles.pillarNumber}>{pillar.num}</span>
                                                    <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                                                </div>
                                                <span className={styles.pillarSubtitle}>{pillar.subtitle}</span>
                                            </div>
                                        </div>

                                        <p className={styles.pillarDesc}>{pillar.description}</p>

                                        <div className={styles.progressTrack}>
                                            <div className={styles.progressBar} />
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <footer className={styles.sectionFooter}>
                    <div className={styles.footerBorder} />
                    <div className={styles.footerRow}>
                        <div className={styles.guaranteeMeta}>
                            <span className={styles.guaranteeDot} />
                            <span>CUSTOMIZED INTEGRATIVE BLUEPRINT FOR EVERY GUEST</span>
                        </div>
                        <Link href="/" className={styles.exploreLink}>
                            <span>EXPLORE SANCTUARY HAVENS</span>
                            <span className={styles.arrow}>→</span>
                        </Link>
                    </div>
                </footer>
            </div>
        </section>
    );
}