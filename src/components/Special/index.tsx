"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ImageProps {
    src: string;
    alt: string;
    title: string;
    tag: string;
}

const images: ImageProps[] = [
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmfha2bvactfi07lf4ni1f3ro",
        alt: "A girl meditating in the sunshine in the Sonoran Desert",
        title: "The Ultimate Michelin Stay Experience",
        tag: "Save $100 Nightly + Bonus",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:50/cmae4vd4x3iue07lh98qhtgy8",
        alt: "couple wearing robes and relaxing in spa",
        title: "Book 4 Nights, Stay a 5th On Us",
        tag: "Free Night",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:50/cmadbvdpo8itx06los5n9f4a6",
        alt: "A woman getting a reiki healing",
        title: "All You Can Spa",
        tag: "$1,000+ in Daily Spa Services",
    },
];

export default function Offers() {
    const offerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from([`.${styles.header}`, `.${styles.subtext}`], {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: offerRef.current,
                    start: "top 80%",
                },
            });


            const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);

            cards.forEach((card, i) => {
                const imageWrapper = card.querySelector(`.${styles.imageWrapper}`);
                const image = card.querySelector(`.${styles.image}`);
                const content = card.querySelector(`.${styles.cardContent}`);

                gsap.set(imageWrapper, {
                    clipPath: "inset(100% 0% 0% 0%)",
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                });

                tl.to(imageWrapper, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.2,
                    delay: i * 0.15,
                    ease: "power4.inOut",
                }).from(
                    content,
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.4"
                );

                gsap.fromTo(
                    image,
                    { yPercent: -12 },
                    {
                        yPercent: 12,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            });
        },
        { scope: offerRef }
    );

    return (
        <section className={styles.offer} ref={offerRef}>
            <div className={styles.headerContainer}>
                <h2 className={styles.header}>SPECIAL OFFERS</h2>
                <p className={styles.subtext}>
                    Explore <span>limited-time offers</span> that make your stay even more
                    rewarding.
                </p>
            </div>

            <div className={styles.cardsContainer}>
                {images.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <div className={styles.tag}>{item.tag}</div>
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.button}>VIEW ALL OFFERS</button>
        </section>
    );
}