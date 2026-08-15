"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { CSSProperties } from "react";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

const Scene = dynamic(
    () => import("./scene").then((mod) => mod.Scene),
    { ssr: false }
);

interface ShowcaseItem {
    id: string;
    src: string;
    alt: string;
    tag: string;
    title: string;
    state: string;
    award: string;
    desc: string;
    ratio: number;
    href: string;
}

const showcaseItems: ShowcaseItem[] = [
    {
        id: "tucson",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmgicxfskfe2n07k4avvg7j1m",
        alt: "Sonoran Desert Sanctuary Sound Bath",
        tag: "[ 01 / FLAGSHIP SANCTUARY ]",
        title: "Tucson Flagship Haven",
        state: "ARIZONA",
        award: "Three MICHELIN Keys • Highest Distinction",
        desc: "The original 1979 sanctuary. An expanse of untouched Sonoran desert where integrative medicine, sound resonance therapy, and spiritual renewal converge.",
        ratio: 0.82,
        href: "#tucson",
    },
    {
        id: "lenox",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmgl83mv7bb2207k49jejcd3f",
        alt: "Berkshire Forest Hydrotherapy Pool",
        tag: "[ 02 / FOREST RETREAT ]",
        title: "Berkshires Mountain Estate",
        state: "MASSACHUSETTS",
        award: "Two MICHELIN Keys • Exceptional Stay",
        desc: "Nestled in historic woodlands, this sanctuary pairs comprehensive hydrotherapy circuits and cold-plunge immersion with restorative clinical counseling.",
        ratio: 0.8,
        href: "#lenox",
    },
    {
        id: "austin",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmolt59vw88ik07k0jk5np37e",
        alt: "Hill Country Wildflower Reserve",
        tag: "[ 03 / LIVING HAVEN ]",
        title: "Hill Country Sanctuary",
        state: "TEXAS",
        award: "New Haven • Opens October 15",
        desc: "Set amid limestone bluffs and wildflowers, this longevity destination offers soil-to-table culinary programming and bespoke metabolic optimization.",
        ratio: 0.85,
        href: "#austin",
    },
    {
        id: "las-vegas",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cm9urp8ah9nv307lgzsyzc7cj",
        alt: "Blue Light Chromotherapy Spa Suite",
        tag: "[ 04 / CLINICAL SPA ]",
        title: "Chromotherapy Lab",
        state: "NEVADA",
        award: "Forbes Four-Star • World's Finest Properties",
        desc: "A high-precision urban refuge integrating multispectral light therapy, salt grottoes, and targeted cellular recovery for accelerated restoration.",
        ratio: 0.85,
        href: "#las-vegas",
    },
    {
        id: "fort-worth",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmapbotb9phfc07lfhhqkuior",
        alt: "Modern Kinetic Yoga and Fitness Studio",
        tag: "[ 05 / KINETIC CLUB ]",
        title: "Kinetic Movement Club",
        state: "TEXAS",
        award: "Best Day Spa & Fitness Club • 76107 Magazine",
        desc: "Focused on functional athletic longevity, biomechanical movement screens, and daily mindful yoga practices led by world-class exercise physiologists.",
        ratio: 0.8,
        href: "#fort-worth",
    },
];

export default function SanctuaryShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerTitleRef = useRef<HTMLHeadingElement>(null);
    const headerLeadRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            const container = sectionRef.current;
            if (!container) return;

            if (headerTitleRef.current) {
                const splitTitle = new SplitText(headerTitleRef.current, {
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
                            trigger: headerTitleRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }

            if (headerLeadRef.current) {
                const splitLead = new SplitText(headerLeadRef.current, {
                    type: "lines",
                    linesClass: styles.lineMask,
                });

                gsap.fromTo(
                    splitLead.lines,
                    { yPercent: 110, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.9,
                        stagger: 0.04,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerLeadRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }

            const rows = container.querySelectorAll<HTMLElement>(`.${styles.showcaseRow}`);

            rows.forEach((row, idx) => {
                const canvasWrapper = row.querySelector<HTMLElement>(`.${styles.canvasWrapper}`);
                const title = row.querySelector<HTMLElement>(`.${styles.rowTitle}`);
                const desc = row.querySelector<HTMLElement>(`.${styles.rowDesc}`);
                const metaTag = row.querySelector<HTMLElement>(`.${styles.metaTag}`);
                const awardTag = row.querySelector<HTMLElement>(`.${styles.awardTag}`);
                const actionBtn = row.querySelector<HTMLElement>(`.${styles.exploreLink}`);

                if (canvasWrapper) {
                    const yDrift = idx % 2 === 0 ? -45 : 45;
                    gsap.fromTo(
                        canvasWrapper,
                        { y: -yDrift },
                        {
                            y: yDrift,
                            ease: "none",
                            scrollTrigger: {
                                trigger: row,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 0.8,
                                invalidateOnRefresh: true,
                            },
                        }
                    );
                }

                const rowTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: row,
                        start: "top 78%",
                        toggleActions: "play none none reverse",
                    },
                });

                if (metaTag && awardTag) {
                    rowTl.fromTo(
                        [metaTag, awardTag],
                        { y: 15, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
                    );
                }

                if (title) {
                    const splitRowTitle = new SplitText(title, {
                        type: "lines,words",
                        linesClass: styles.lineMask,
                        wordsClass: styles.wordInner,
                    });

                    rowTl.fromTo(
                        splitRowTitle.words,
                        { yPercent: 115, opacity: 0 },
                        { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.02, ease: "power3.out" },
                        "-=0.4"
                    );
                }

                if (desc) {
                    const splitRowDesc = new SplitText(desc, {
                        type: "lines",
                        linesClass: styles.lineMask,
                    });

                    rowTl.fromTo(
                        splitRowDesc.lines,
                        { yPercent: 110, opacity: 0 },
                        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power3.out" },
                        "-=0.5"
                    );
                }

                if (actionBtn) {
                    rowTl.fromTo(
                        actionBtn,
                        { opacity: 0, y: 15 },
                        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
                        "-=0.4"
                    );
                }
            });
        },
        { scope: sectionRef }
    );

    return (
        <section className={styles.showcaseSection} ref={sectionRef} data-theme="dark" id="showcase">
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.headerRow}>
                        <h2 ref={headerTitleRef} className={styles.mainTitle}>
                            Spatial Sanctuaries.
                        </h2>
                        <div className={styles.leadBlock}>
                            <p ref={headerLeadRef} className={styles.leadText}>
                                Interactive environments rendered in real-time WebGL. Interact with each living canvas to feel the fluid resonance of our five worldwide destinations.
                            </p>
                        </div>
                    </div>
                </header>

                <div className={styles.layoutContainer}>
                    {showcaseItems.map((item, index) => (
                        <div key={item.id} className={styles.showcaseRow} data-index={index}>
                            <div
                                className={styles.canvasWrapper}
                                style={{ "--aspect": item.ratio } as CSSProperties}
                            >
                                <div className={styles.sceneContainer}>
                                    <Scene src={item.src} alt={item.alt} />
                                </div>
                            </div>

                            <div className={styles.textBlock}>
                                <div className={styles.metaRow}>
                                    <span className={styles.metaTag}>{item.tag}</span>
                                    <span className={styles.awardTag}>{item.award}</span>
                                </div>

                                <h3 className={styles.rowTitle}>
                                    {item.title}
                                    <span className={styles.stateSubtitle}>, {item.state}</span>
                                </h3>

                                <p className={styles.rowDesc}>{item.desc}</p>

                                <div className={styles.actionFooter}>
                                    <Link href={item.href} className={styles.exploreLink}>
                                        <span>EXPLORE DESTINATION PROFILE</span>
                                        <span className={styles.arrowIcon}>↗</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}