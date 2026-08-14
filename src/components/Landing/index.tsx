"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

export interface SlideItem {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
    color: string;
}

const slides: SlideItem[] = [
    {
        src: "/texture/landing.jpg",
        alt: "Skin Care",
        title: "SKIN CARE",
        subtitle: "Personalized care for skin health",
        color: "#E8E2D5",
    },
    {
        src: "/texture/2.jpg",
        alt: "Skin Care",
        title: "SKIN CARE",
        subtitle: "Personalized care for skin health",
        color: "#E8E2D5",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazl78c60nco06l8xs20sewx",
        alt: "Hot stone therapeutic massage",
        title: "BODY & MIND RESTORATION",
        subtitle: "Holistic treatments designed for longevity",
        color: "#E5DDD8",
    },
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
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazl8jdd0vad06k3d59l3re1",
        alt: "Woman hiking in desert sanctuary",
        title: "IMMERSE IN NATURE",
        subtitle: "Guided outdoor exploration in Tucson & Lenox",
        color: "#DFE5E8",
    }
];

function SplitTextTitle({ text }: { text: string }) {
    const words = text.split(" ");
    return (
        <h1 className={styles.title} aria-label={text}>
            {words.map((word, wIdx) => (
                <span key={wIdx} className={styles.wordMask}>
                    {word.split("").map((char, cIdx) => (
                        <span key={cIdx} className={styles.charMask}>
                            <span className={styles.charInner}>{char}</span>
                        </span>
                    ))}
                </span>
            ))}
        </h1>
    );
}

function SplitTextSubtitle({ text }: { text: string }) {
    const words = text.split(" ");
    return (
        <span className={styles.subtitle} aria-label={text}>
            {words.map((word, wIdx) => (
                <span key={wIdx} className={styles.subWordMask}>
                    <span className={styles.subWordInner}>{word}</span>
                </span>
            ))}
        </span>
    );
}

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevIndexRef = useRef(0);
    const isAnimatingRef = useRef(false);

    const goToSlide = useCallback(
        (nextIdx: number, direction: "next" | "prev" = "next") => {
            if (isAnimatingRef.current || nextIdx === currentIndex) return;

            const container = landingRef.current;
            if (!container) return;

            isAnimatingRef.current = true;
            const allSlides = container.querySelectorAll<HTMLElement>(`.${styles.slide}`);
            const outgoingSlide = allSlides[currentIndex];
            const incomingSlide = allSlides[nextIdx];

            if (!outgoingSlide || !incomingSlide) {
                isAnimatingRef.current = false;
                return;
            }

            setCurrentIndex(nextIdx);
            prevIndexRef.current = nextIdx;

            const incomingImage = incomingSlide.querySelector(`.${styles.imageInner}`);
            const outgoingImage = outgoingSlide.querySelector(`.${styles.imageInner}`);
            
            const outgoingChars = outgoingSlide.querySelectorAll(`.${styles.charInner}`);
            const outgoingSubWords = outgoingSlide.querySelectorAll(`.${styles.subWordInner}`);

            const incomingChars = incomingSlide.querySelectorAll(`.${styles.charInner}`);
            const incomingSubWords = incomingSlide.querySelectorAll(`.${styles.subWordInner}`);

            const startClip =
                direction === "next"
                    ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
                    : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

            const fullClip = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

            gsap.set(incomingSlide, {
                zIndex: 5,
                clipPath: startClip,
                autoAlpha: 1,
            });

            gsap.set(outgoingSlide, {
                zIndex: 2,
            });

            const xOffset = direction === "next" ? 10 : -10;
            const yTextDir = direction === "next" ? 1 : -1;

            gsap.set(incomingImage, { scale: 1.15, xPercent: xOffset });

            gsap.set(incomingSubWords, {
                yPercent: yTextDir * 125,
                opacity: 0,
            });
            gsap.set(incomingChars, {
                yPercent: yTextDir * 135,
                opacity: 0,
                rotateZ: yTextDir * 5,
            });

            const tl = gsap.timeline({
                defaults: { ease: "power4.inOut" },
                onComplete: () => {
                    gsap.set(outgoingSlide, { zIndex: 1, autoAlpha: 0 });
                    gsap.set(incomingSlide, { zIndex: 3 });
                    isAnimatingRef.current = false;
                },
            });

            tl.to(
                incomingSlide,
                {
                    clipPath: fullClip,
                    duration: 1.2,
                },
                0
            )
                .to(
                    incomingImage,
                    {
                        scale: 1,
                        xPercent: 0,
                        duration: 1.3,
                    },
                    0
                )
                .to(
                    outgoingImage,
                    {
                        scale: 0.94,
                        xPercent: -xOffset * 0.8,
                        duration: 1.2,
                    },
                    0
                )
                .to(
                    outgoingChars,
                    {
                        yPercent: -yTextDir * 120,
                        opacity: 0,
                        rotateZ: -yTextDir * 4,
                        duration: 0.5,
                        stagger: {
                            each: 0.012,
                            from: direction === "next" ? "start" : "end",
                        },
                        ease: "power3.in",
                    },
                    0
                )
                .to(
                    outgoingSubWords,
                    {
                        yPercent: -yTextDir * 110,
                        opacity: 0,
                        duration: 0.45,
                        stagger: 0.015,
                        ease: "power3.in",
                    },
                    0
                )
                .to(
                    incomingSubWords,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.025,
                        ease: "power4.out",
                    },
                    0.38
                )
                .to(
                    incomingChars,
                    {
                        yPercent: 0,
                        opacity: 1,
                        rotateZ: 0,
                        duration: 0.95,
                        stagger: {
                            each: 0.02,
                            from: direction === "next" ? "start" : "end",
                        },
                        ease: "power4.out",
                    },
                    0.44
                );
        },
        [currentIndex]
    );

    useGSAP(
        () => {
            const container = landingRef.current;
            if (!container) return;

            const allSlides = container.querySelectorAll<HTMLElement>(`.${styles.slide}`);
            allSlides.forEach((slide, idx) => {
                const chars = slide.querySelectorAll(`.${styles.charInner}`);
                const subWords = slide.querySelectorAll(`.${styles.subWordInner}`);

                if (idx === 0) {
                    gsap.set(slide, {
                        zIndex: 3,
                        autoAlpha: 1,
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    });

                    gsap.fromTo(
                        subWords,
                        { yPercent: 120, opacity: 0 },
                        {
                            yPercent: 0,
                            opacity: 1,
                            duration: 0.9,
                            stagger: 0.03,
                            ease: "power4.out",
                            delay: 0.25,
                        }
                    );

                    gsap.fromTo(
                        chars,
                        { yPercent: 130, opacity: 0, rotateZ: 5 },
                        {
                            yPercent: 0,
                            opacity: 1,
                            rotateZ: 0,
                            duration: 1.05,
                            stagger: 0.02,
                            ease: "power4.out",
                            delay: 0.38,
                        }
                    );
                } else {
                    gsap.set(slide, {
                        zIndex: 1,
                        autoAlpha: 0,
                        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                    });
                    gsap.set(chars, { yPercent: 130, opacity: 0 });
                    gsap.set(subWords, { yPercent: 120, opacity: 0 });
                }
            });
        },
        { scope: landingRef }
    );

    const handleNext = () => {
        const nextIdx = (currentIndex + 1) % slides.length;
        goToSlide(nextIdx, "next");
    };

    const handlePrev = () => {
        const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIdx, "prev");
    };

    return (
        <section className={styles.landing} ref={landingRef} data-theme="dark">
            <div className={styles.slider}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === currentIndex ? styles.active : ""}`}
                        data-slide-index={index}
                    >
                        <div className={styles.imageInner}>
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                fill
                                priority={index === 0}
                                unoptimized
                                className={styles.image}
                            />
                            <div className={styles.overlay} />
                        </div>

                        <div className={styles.content}>
                            <SplitTextSubtitle text={slide.subtitle} />
                            <SplitTextTitle text={slide.title} />
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.controls}>
                <button
                    type="button"
                    aria-label="Previous Slide"
                    className={`${styles.navBtn} ${styles.prev}`}
                    onClick={handlePrev}
                >
                    <span className={styles.icon}>+</span>
                </button>

                <button
                    type="button"
                    aria-label="Next Slide"
                    className={`${styles.navBtn} ${styles.next}`}
                    onClick={handleNext}
                >
                    <span className={styles.icon}>+</span>
                </button>

                <div className={styles.counter}>
                    <span className={styles.currentNum}>
                        {String(currentIndex + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.divider}>/</span>
                    <span className={styles.totalNum}>
                        {String(slides.length).padStart(2, "0")}
                    </span>
                </div>

                <div className={styles.thumbnails}>
                    {slides.map((slide, idx) => (
                        <button
                            key={idx}
                            type="button"
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`${styles.thumbItem} ${
                                idx === currentIndex ? styles.activeThumb : ""
                            }`}
                            onClick={() =>
                                goToSlide(idx, idx > currentIndex ? "next" : "prev")
                            }
                        >
                            <div className={styles.thumbImageWrapper}>
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    sizes="80px"
                                    className={styles.thumbImg}
                                />
                            </div>
                            <span className={styles.thumbBorder} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}