"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

interface PillarItem {
    title: string;
    description: string;
    src: string;
    alt: string;
    icon: string;
}

const pillars: PillarItem[] = [
    {
        title: "SPA & BEAUTY",
        description:
            "Promote relaxation and energy with healing bodywork and therapeutic treatments.",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn8qd42fvh07k4t60fwcdy",
        alt: "Woman meditating in nature",
        icon: "/icons/1.svg",
    },
    {
        title: "HEALTH & PERFORMANCE",
        description:
            "Go beyond symptoms with personalized plans for prevention from physicians and experts.",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn4fai2fjp06k3apajmrnr",
        alt: "Doctor discussing health results",
        icon: "/icons/2.svg",
    },
    {
        title: "FITNESS & MOVEMENT",
        description:
            "Enhance everyday mobility and athletic performance, guided by exercise experts.",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn2bg52ah507k3kkmhfq2d",
        alt: "Fitness stretching exercises",
        icon: "/icons/3.svg",
    },
    {
        title: "MIND & SPIRIT",
        description:
            "Pursue balance and purpose with behavioral therapy, coaching, and spiritual guidance.",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn5zwr2gw106k3z817jg30",
        alt: "Sound bath meditation session",
        icon: "/icons/4.svg",
    },
    {
        title: "NUTRITION & FOOD",
        description:
            "Pinpoint strategies for optimal weight and holistic health informed by nutritionists and chefs.",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmazn0ns1280i07k4ymirg63s",
        alt: "Healthy nutritious food bowl",
        icon: "/icons/5.svg",
    },
];

export default function Five() {
    const fiveRef = useRef<HTMLDivElement>(null);
    const mainTitleRef = useRef<HTMLHeadingElement>(null);
    const mainSubtextRef = useRef<HTMLParagraphElement>(null);
    const imageWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
    const zIndexCounter = useRef<number>(10);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handlePillarSelect = (index: number) => {
        if (index === activeIndex) return;

        const targetWrapper = imageWrapperRefs.current[index];
        if (!targetWrapper) return;

        setActiveIndex(index);
        zIndexCounter.current += 1;

        gsap.set(targetWrapper, { zIndex: zIndexCounter.current });
        gsap.fromTo(
            targetWrapper,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                ease: "power3.inOut",
            }
        );
    };

    useGSAP(
        () => {
            if (!mainTitleRef.current) return;

            const splitHeader = new SplitText(mainTitleRef.current, {
                type: "words",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: fiveRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            tl.fromTo(
                splitHeader.words,
                { opacity: 0, y: 25 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.03,
                    ease: "power2.out",
                    clearProps: "transform,opacity",
                }
            )
                .fromTo(
                    mainSubtextRef.current,
                    { opacity: 0, y: 15 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        clearProps: "transform,opacity",
                    },
                    "-=0.3"
                )
                .fromTo(
                    imageWrapperRefs.current[0],
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1,
                        ease: "power3.inOut",
                    },
                    "-=0.4"
                )
                .fromTo(
                    `.${styles.pillarItem}`,
                    { opacity: 0, x: 20 },
                    {
                        opacity: 1,
                        x: 0,
                        stagger: 0.08,
                        duration: 0.6,
                        ease: "power2.out",
                        clearProps: "transform,opacity",
                    },
                    "-=0.6"
                );

            return () => {
                splitHeader.revert();
            };
        },
        { scope: fiveRef }
    );

    return (
        <section className={styles.five} ref={fiveRef}>
            <div className={styles.headerGroup}>
                <h2 className={styles.mainTitle} ref={mainTitleRef}>
                    A TRAILBLAZER IN INTEGRATIVE WELLNESS
                </h2>
                <p className={styles.mainSubtext} ref={mainSubtextRef}>
                    Wellness is personal. At Canyon Ranch, we celebrate that no two paths
                    are the same by offering a breadth of experiences for every kind of
                    journey – inspired by our five pillars.
                </p>
            </div>

            <div className={styles.gridContainer}>
                <div className={styles.imageStack}>
                    {pillars.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                imageWrapperRefs.current[index] = el;
                            }}
                            className={`${styles.imageWrapper} ${
                                index === 0 ? styles.initialVisible : ""
                            }`}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                sizes="(max-width: 992px) 100vw, 50vw"
                                priority={index === 0}
                                className={styles.image}
                            />
                        </div>
                    ))}
                </div>

                <div className={styles.pillarsList}>
                    <p className={styles.pillarsSubhead}>
                        Five Wellness Pillars. One You.
                    </p>

                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className={`${styles.pillarItem} ${
                                activeIndex === index ? styles.active : ""
                            }`}
                            onMouseEnter={() => handlePillarSelect(index)}
                            onClick={() => handlePillarSelect(index)}
                        >
                            <div className={styles.pillarIcon}>
                                <Image
                                    src={pillar.icon}
                                    alt={`${pillar.title} icon`}
                                    width={22}
                                    height={22}
                                />
                            </div>
                            <div className={styles.pillarContent}>
                                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                                <p className={styles.pillarDesc}>{pillar.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}