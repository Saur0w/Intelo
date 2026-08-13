"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

interface DestinationProps {
    src: string;
    alt: string;
    title: string;
    award: string;
    badgeType: "michelin2" | "michelin3" | "text" | "forbes" | "award";
}

const icons = [
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmghngeoig22w07lfb6ni9tce",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmghn74rqf7ql07k0scbhbj5y",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmkvhmatojwuo07lgihow0qie",
    },
];

const destinations: DestinationProps[] = [
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmgl83mv7bb2207k49jejcd3f",
        alt: "Woman in pool at Lenox resort",
        title: "LENOX, MA",
        award: "Two MICHELIN Keys - An exceptional stay",
        badgeType: "michelin2",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmgicxfskfe2n07k4avvg7j1m",
        alt: "Sound bath meditation in Tucson",
        title: "TUCSON, AZ",
        award: "Three MICHELIN Keys - An extraordinary stay",
        badgeType: "michelin3",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmolt59vw88ik07k0jk5np37e",
        alt: "Texas wildflowers tree in Austin",
        title: "AUSTIN, TX",
        award: "Our New Hill Country Resort Opens October 15",
        badgeType: "text",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cm9urp8ah9nv307lgzsyzc7cj",
        alt: "Blue light spa experience in Las Vegas",
        title: "LAS VEGAS, NV",
        award: "Forbes Four-Star Award: Finest Properties in the World",
        badgeType: "forbes",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmapbotb9phfc07lfhhqkuior",
        alt: "Yoga and fitness studio in Fort Worth",
        title: "FORT WORTH, TX",
        award: "Best Day Spa & Gym/Fitness Center by 76107 Magazine",
        badgeType: "award",
    },
];

export default function Destination() {
    const destinationRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            if (!titleRef.current) return;

            const splitTitle = new SplitText(titleRef.current, {
                type: "words",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: destinationRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            });

            tl.fromTo(
                splitTitle.words,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.04,
                    ease: "power2.out",
                    clearProps: "transform,opacity",
                }
            )
                .fromTo(
                    subtextRef.current,
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
                    `.${styles.card}`,
                    { opacity: 0, y: 35 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.08,
                        ease: "power3.out",
                        clearProps: "transform,opacity",
                    },
                    "-=0.4"
                );

            return () => {
                splitTitle.revert();
            };
        },
        { scope: destinationRef }
    );

    const renderBadgeIcon = (type: DestinationProps["badgeType"]) => {
        switch (type) {
            case "michelin2":
                return (
                    <div className={styles.iconGroup}>
                        <Image
                            src={icons[0].src}
                            alt="Michelin Key"
                            width={16}
                            height={16}
                            className={styles.badgeImg}
                        />
                        <Image
                            src={icons[0].src}
                            alt="Michelin Key"
                            width={16}
                            height={16}
                            className={styles.badgeImg}
                        />
                    </div>
                );
            case "michelin3":
                return (
                    <div className={styles.iconGroup}>
                        <Image
                            src={icons[0].src}
                            alt="Michelin Key"
                            width={16}
                            height={16}
                            className={styles.badgeImg}
                        />
                        <Image
                            src={icons[0].src}
                            alt="Michelin Key"
                            width={16}
                            height={16}
                            className={styles.badgeImg}
                        />
                        <Image
                            src={icons[0].src}
                            alt="Michelin Key"
                            width={16}
                            height={16}
                            className={styles.badgeImg}
                        />
                    </div>
                );
            case "forbes":
                return (
                    <div className={styles.iconGroup}>
                        <Image
                            src={icons[1].src}
                            alt="Forbes Award"
                            width={18}
                            height={18}
                            className={styles.badgeImg}
                        />
                    </div>
                );
            case "award":
                return (
                    <div className={styles.iconGroup}>
                        <Image
                            src={icons[2].src}
                            alt="Magazine Award"
                            width={18}
                            height={18}
                            className={styles.badgeImg}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className={styles.destination} ref={destinationRef}>
            <div className={styles.headerGroup}>
                <h1 className={styles.title} ref={titleRef}>
                    OUR DESTINATIONS
                </h1>
                <p className={styles.subtext} ref={subtextRef}>
                    Explore distinct destinations designed for healing and renewal, set
                    across stunning desert, forest, or mountain landscapes.
                </p>
            </div>

            <div className={styles.gridTrack}>
                {destinations.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                sizes="(max-width: 1200px) 50vw, 20vw"
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>{item.title}</h2>
                            <div className={styles.awardRow}>
                                {renderBadgeIcon(item.badgeType)}
                                <p className={styles.awardText}>{item.award}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}