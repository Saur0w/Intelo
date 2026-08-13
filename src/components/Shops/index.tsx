"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

interface ShopItem {
    src: string;
    alt: string;
    title: string;
    href: string;
}

const shopItems: ShopItem[] = [
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp0wcs3k7606l8jdao8exa",
        alt: "Gift Cards",
        title: "Gift Cards",
        href: "#gift-cards",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp299b3yz507k4lkg4if5s",
        alt: "Woman using a face roller and eye patches",
        title: "Skin Care",
        href: "#skin-care",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp549a41ph07k473m14zze",
        alt: "CR Spa Collection products",
        title: "CR Spa Collection",
        href: "#spa-collection",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp71vn3p3f06l81iwtf2b8",
        alt: "Man wearing Canyon Ranch t-shirt on a tennis court",
        title: "Apparel",
        href: "#apparel",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazpavv241ut07k3zfntb775",
        alt: "Woman with Canyon Ranch tote bag",
        title: "Best Sellers",
        href: "#best-sellers",
    },
    {
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazpaj3d3qu206l8s61l0eg6",
        alt: "Skincare bottles on a vanity",
        title: "Shop All Products",
        href: "#shop-all",
    },
];

export default function Shops() {
    const shopRef = useRef<HTMLDivElement>(null);
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
                    trigger: shopRef.current,
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
                        stagger: 0.1,
                        ease: "power3.out",
                        clearProps: "transform,opacity",
                    },
                    "-=0.4"
                )
                .fromTo(
                    `.${styles.progressLine}`,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1,
                        ease: "power3.inOut",
                    },
                    "-=0.5"
                );

            return () => {
                splitTitle.revert();
            };
        },
        { scope: shopRef }
    );

    return (
        <section className={styles.shop} ref={shopRef}>
            <div className={styles.headerGroup}>
                <h2 className={styles.title} ref={titleRef}>
                    CANYON RANCH SHOPS
                </h2>
                <p className={styles.subtext} ref={subtextRef}>
                    Bring home the essentials that inspire well-being — from skincare to
                    signature gifts.
                </p>
            </div>

            <div className={styles.carouselContainer}>
                <div className={styles.track}>
                    {shopItems.map((item, index) => (
                        <Link key={index} href={item.href} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    sizes="280px"
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.cardFooter}>
                                <span className={styles.cardTitle}>{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className={styles.progressBarWrapper}>
                <div className={styles.progressLine} />
            </div>
        </section>
    );
}