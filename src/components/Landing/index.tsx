"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(SplitText, useGSAP, Flip);

interface WorkItem {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
    color: string;
}

const items: WorkItem[] = [
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmfld06mjrmei07k2qpwbq1i5",
        alt: "A woman holding a crystal",
        title: "THE #1 WELLNESS RESORT",
        subtitle: "Michelin Guide 2025 Highest Distinction",
        color: "#E8E2D5",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazl5mq60pfj07k3op7zp8yc",
        alt: "Sound bath meditation session",
        title: "SOUND MEDITATION",
        subtitle: "Inner equilibrium & deep resonance",
        color: "#D9E3D8",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazl78c60nco06l8xs20sewx",
        alt: "Hot stone therapeutic massage",
        title: "BODY & MIND RESTORATION",
        subtitle: "Holistic treatments designed for longevity",
        color: "#E5DDD8",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazl8jdd0vad06k3d59l3re1",
        alt: "Woman hiking in desert sanctuary",
        title: "IMMERSE IN NATURE",
        subtitle: "Guided outdoor exploration in Tucson & Lenox",
        color: "#DFE5E8",
    },
    {
        src: "/texture/landing.jpg",
        alt: "Skin Care",
        title: "SKIN CARE",
        subtitle: "Personalized care for skin health",
        color: "#E8E2D5",
    },
];

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    const centerTextRef = useRef<HTMLParagraphElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const showcaseWrapperRef = useRef<HTMLDivElement>(null);
    const captionTagRef = useRef<HTMLSpanElement>(null);
    const captionTitleRef = useRef<HTMLSpanElement>(null);

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const activeIndexRef = useRef<number>(0);
    const [isSpread, setIsSpread] = useState<boolean>(false);
    const isSpreadRef = useRef<boolean>(false);

    const handleSelect = (index: number) => {
        if (!isSpreadRef.current || index === activeIndexRef.current) return;
        const prevIndex = activeIndexRef.current;
        activeIndexRef.current = index;
        setActiveIndex(index);

        const wrapper = showcaseWrapperRef.current;
        if (!wrapper) return;

        const slides = wrapper.querySelectorAll<HTMLElement>(`.${styles.showcaseSlide}`);
        const nextSlide = wrapper.querySelector<HTMLElement>(
            `.${styles.showcaseSlide}[data-showcase-index="${index}"]`
        );
        const prevSlide = wrapper.querySelector<HTMLElement>(
            `.${styles.showcaseSlide}[data-showcase-index="${prevIndex}"]`
        );

        if (nextSlide) {
            slides.forEach((s) => {
                if (s !== nextSlide && s !== prevSlide) {
                    gsap.set(s, { zIndex: 0 });
                }
            });

            if (prevSlide) {
                gsap.set(prevSlide, { zIndex: 1, clipPath: "inset(0% 0% 0% 0%)" });
            }

            gsap.set(nextSlide, { zIndex: 2 });
            const nextImg = nextSlide.querySelector(`.${styles.showcaseImg}`);

            gsap.fromTo(
                nextSlide,
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.85,
                    ease: "power4.out",
                    onComplete: () => {
                        if (prevSlide) {
                            gsap.set(prevSlide, { zIndex: 0 });
                        }
                    },
                }
            );

            if (nextImg) {
                gsap.fromTo(
                    nextImg,
                    { scale: 1.15 },
                    { scale: 1.0, duration: 0.85, ease: "power4.out" }
                );
            }
        }

        if (captionTitleRef.current) {
            gsap.fromTo(
                captionTitleRef.current,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
            );
        }
        if (captionTagRef.current) {
            gsap.fromTo(
                captionTagRef.current,
                { scale: 0.85, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
            );
        }
    };

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(`.${styles.thumbCard}`);
            if (!cards.length || !stackRef.current || !centerTextRef.current) return;

            const splitText = new SplitText(centerTextRef.current, {
                type: "lines,words",
                linesClass: styles.splitLine,
                wordsClass: styles.splitWord,
            });
            gsap.set(splitText.lines, { overflow: "hidden" });

            const masterTl = gsap.timeline({ delay: 0.2 });

            // 1. Initial Center Shuffle with live counter
            cards.forEach((card, i) => {
                if (i < cards.length - 1) {
                    masterTl
                        .to(card, {
                            opacity: 0,
                            duration: 0.35,
                            ease: "power1.inOut",
                            onStart: () => {
                                if (counterRef.current) {
                                    counterRef.current.innerText = `0${i + 2}`;
                                }
                            },
                        })
                        .to({}, { duration: 0.12 });
                }
            });

            // 2. Flip from Center Stack to Final Left Column Position
            masterTl.add(() => {
                gsap.set(cards, { opacity: 1 });

                // Capture initial center stack bounds
                const state = Flip.getState(cards);

                // Apply final CSS class
                stackRef.current?.classList.add(styles.isSpread);

                // Execute fluid flip to left column
                Flip.from(state, {
                    duration: 1.3,
                    ease: "power4.inOut",
                    stagger: 0.05,
                    absolute: true,
                    onComplete: () => {
                        isSpreadRef.current = true;
                        setIsSpread(true);

                        // Reveal column layouts
                        gsap.to(
                            [
                                `.${styles.featuredLabel}`,
                                `.${styles.centerCol}`,
                                `.${styles.rightCol}`,
                            ],
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.7,
                                stagger: 0.06,
                                ease: "power3.out",
                            }
                        );

                        // SplitText luxury line mask reveal
                        gsap.fromTo(
                            splitText.words,
                            {
                                yPercent: 120,
                                opacity: 0,
                                rotateZ: 2.5,
                            },
                            {
                                yPercent: 0,
                                opacity: 1,
                                rotateZ: 0,
                                duration: 1.1,
                                stagger: 0.02,
                                ease: "power4.out",
                            }
                        );

                        // Center column meta details
                        gsap.to(`.${styles.metaBlock}`, {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            stagger: 0.08,
                            ease: "power3.out",
                            delay: 0.15,
                        });

                        // Right column showcase cinematic clip-path reveal
                        if (showcaseWrapperRef.current) {
                            gsap.fromTo(
                                showcaseWrapperRef.current,
                                { clipPath: "inset(100% 0% 0% 0%)" },
                                {
                                    clipPath: "inset(0% 0% 0% 0%)",
                                    duration: 1.3,
                                    ease: "power4.inOut",
                                }
                            );

                            const firstImg = showcaseWrapperRef.current.querySelector(
                                `.${styles.showcaseSlide}[data-showcase-index="0"] .${styles.showcaseImg}`
                            );
                            if (firstImg) {
                                gsap.fromTo(
                                    firstImg,
                                    { scale: 1.25 },
                                    { scale: 1.0, duration: 1.3, ease: "power4.inOut" }
                                );
                            }
                        }
                    },
                });
            }, "+=0.2");

            return () => {
                splitText.revert();
            };
        },
        { scope: landingRef }
    );

    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.gridContainer}>
                {/* Left Column: Stack/Thumbnails */}
                <div className={styles.leftCol}>
                    <span className={styles.featuredLabel}>FEATURED EXPERIENCES</span>

                    <div
                        className={`${styles.thumbStack} ${isSpread ? styles.isSpread : ""}`}
                        ref={stackRef}
                    >
                        <div className={styles.introCounter}>
                            <span>&larr;</span>
                            <span ref={counterRef}>01</span>
                            <span>/ 0{items.length}</span>
                        </div>

                        {items.map((item, index) => (
                            <div
                                key={index}
                                data-flip-id={`thumb-${index}`}
                                className={`${styles.thumbCard} ${
                                    activeIndex === index && isSpread ? styles.activeThumb : ""
                                }`}
                                style={
                                    {
                                        zIndex: items.length - index,
                                        "--accent-bg": item.color,
                                    } as React.CSSProperties
                                }
                                onClick={() => handleSelect(index)}
                                onMouseEnter={() => handleSelect(index)}
                            >
                                <div className={styles.thumbWrapper}>
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        unoptimized
                                        priority={index === 0}
                                        className={styles.image}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center Column: Statement & Meta */}
                <div className={styles.centerCol}>
                    <div className={styles.statementWrapper}>
                        <p className={styles.statement} ref={centerTextRef}>
                            Canyon Ranch is an integrative wellness pioneer redefining human
                            longevity with time-honored practices, medical science, and
                            transformative journeys.
                        </p>
                    </div>

                    <div className={styles.footerMeta}>
                        <div className={styles.metaBlock}>
                            <h4>ESTATE LOCATIONS</h4>
                            <p>TUCSON • LENOX • WOODSIDE • AUSTIN</p>
                        </div>
                        <div className={styles.metaBlock}>
                            <h4>SANCTUARY</h4>
                            <p>CANYONRANCH.COM</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Active Showcase */}
                <div className={styles.rightCol}>
                    <div className={styles.showcaseWrapper} ref={showcaseWrapperRef}>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                data-showcase-index={index}
                                className={styles.showcaseSlide}
                                style={{
                                    zIndex: index === 0 ? 1 : 0,
                                }}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    unoptimized
                                    priority={index === 0}
                                    className={styles.showcaseImg}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.showcaseCaption}>
                        <span className={styles.captionTag} ref={captionTagRef}>
                            [ 0{activeIndex + 1} ]
                        </span>
                        <span className={styles.captionTitle} ref={captionTitleRef}>
                            {items[activeIndex].title}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}