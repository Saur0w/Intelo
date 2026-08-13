"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

interface SlideData {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
}


const SLIDES: SlideData[] = [
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmfld06mjrmei07k2qpwbq1i5",
        alt: "A woman holding a crystal to her forehead",
        title: "THE #1 WELLNESS RESORT",
        subtitle: "by the Michelin Guide 2025",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazl5mq60pfj07k3op7zp8yc",
        alt: "A group floating sound meditation",
        title: "SOUND MEDITATION",
        subtitle: "Find inner equilibrium & deep peace",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazl78c60nco06l8xs20sewx",
        alt: "A woman getting a hot stone massage",
        title: "BODY & MIND RESTORATION",
        subtitle: "Holistic treatments designed for longevity",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazl8jdd0vad06k3d59l3re1",
        alt: "A woman walking on a trail",
        title: "IMMERSE IN NATURE",
        subtitle: "Guided outdoor adventures in Tucson & Lenox",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazl9yjd0ygl06k33g8ie53b",
        alt: "A man on a treadmill with a performance scientist",
        title: "PEAK PERFORMANCE",
        subtitle: "Data-driven sports medicine & human science",
    },
];

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(`${styles.carousel}`, { overflow:"visible", "scroll-snap-type": "none" });
        gsap.set(`${styles.nav}`, { display: "block" })
    }, {
        scope: landingRef,
    })
    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.carousel} aria-label="Horizontal carousel of resort highlights">
                {SLIDES.map((slide, index) => (
                    <div key={index} className={styles.carouselSlide}>
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 768px) 88vw, 70vw"
                        />
                        <div className={styles.slideContent}>
                            <h1>{slide.title}</h1>
                            <h5>{slide.subtitle}</h5>
                        </div>
                    </div>
                ))}
            </div>

            <nav className={styles.nav} aria-label="Carousel Controls">
                <button className={styles.prev} tabIndex={0} aria-label="Previous Slide" />
                <div className={styles.counter}>{`1/${SLIDES.length}`}</div>
                <button className={styles.next} tabIndex={0} aria-label="Next Slide" />
            </nav>
        </section>
    );
}