"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
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

function SplitTextReveal({
    text,
    className,
    tag = "p"
}: {
    text: string;
    className?: string;
    tag?: "h1" | "h2" | "h3" | "p";
}) {
    const Tag = tag;
    const words = text.split(" ");

    return (
        <Tag className={className} aria-label={text}>
            {words.map((word, wIdx) => (
                <span key={wIdx} className={styles.wordWrapper}>
                    <span className={`${styles.wordInner} reveal-word`}>
                        {word}
                    </span>
                    {wIdx < words.length - 1 && "\u00A0"}
                </span>
            ))}
        </Tag>
    );
}

export default function About() {
    const aboutRef = useRef<HTMLDivElement>(null);
    const manifestoRef = useRef<HTMLDivElement>(null);
    const storyListRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const container = aboutRef.current;
            if (!container) return;

            const headerWords = container.querySelectorAll(`.${styles.header} .reveal-word`);
            const subWords = container.querySelectorAll(`.${styles.subLabel} .reveal-word`);

            gsap.fromTo(
                subWords,
                { yPercent: 110, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.02,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%"
                    }
                }
            );

            gsap.fromTo(
                headerWords,
                { yPercent: 120, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.1,
                    stagger: 0.015,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 75%"
                    }
                }
            );

            const manifestoWords = manifestoRef.current?.querySelectorAll(".reveal-word");
            if (manifestoWords) {
                gsap.fromTo(
                    manifestoWords,
                    { opacity: 0.15, y: 8 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.05,
                        ease: "none",
                        scrollTrigger: {
                            trigger: manifestoRef.current,
                            start: "top 75%",
                            end: "bottom 45%",
                            scrub: 0.75
                        }
                    }
                );
            }

            const storyCards = storyListRef.current?.querySelectorAll(`.${styles.storyCard}`);
            if (storyCards) {
                storyCards.forEach((card) => {
                    const line = card.querySelector(`.${styles.cardLine}`);
                    const content = card.querySelector(`.${styles.cardBody}`);

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            start: "top 82%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    tl.fromTo(
                        line,
                        { scaleX: 0, transformOrigin: "left center" },
                        { scaleX: 1, duration: 1, ease: "power3.inOut" }
                    ).fromTo(
                        content,
                        { y: 35, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
                        "-=0.5"
                    );
                });
            }

            const statItems = statsRef.current?.querySelectorAll(`.${styles.statItem}`);
            if (statItems) {
                gsap.fromTo(
                    statItems,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 85%"
                        }
                    }
                );
            }
        },
        { scope: aboutRef }
    );

    return (
        <section className={styles.about} ref={aboutRef} id="about">
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.subLabel}>
                        <span className={styles.badgeDot} />
                        <SplitTextReveal text="ORIGIN & PHILOSOPHY" tag="p" />
                    </div>
                    <SplitTextReveal
                        text="Inspiring Your Well Way of Life"
                        tag="h2"
                        className={styles.mainTitle}
                    />
                </header>

                <div className={styles.manifestoWrapper} ref={manifestoRef}>
                    <p className={styles.manifestoText}>
                        <span className={styles.manifestoLead}>The original trailblazer</span> of integrative wellness, Canyon Ranch began with one man’s pursuit of vitality before wellness was a household word. That pursuit has since transformed an industry and guided countless individuals to realize their highest state of longevity.
                    </p>
                </div>

                <div className={styles.storySection}>
                    <aside className={styles.stickyColumn}>
                        <span className={styles.stickyIndex}>01 / HERITAGE</span>
                        <h3 className={styles.stickyHeading}>
                            A four-decade compass for lifelong well-being.
                        </h3>
                        <p className={styles.stickyDescription}>
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
                            <span className={styles.statNumber}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>

                <footer className={styles.footerNote}>
                    <p className={styles.quote}>
                        “We continue to deliver new ways to well-being where you visit, stay, and live—never losing sight of personal transformation.”
                    </p>
                    <span className={styles.signature}>Canyon Ranch Integrative Collective</span>
                </footer>
            </div>
        </section>
    );
}