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

export default function Guide() {
    const guideRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!titleRef.current) return;

            const splitTitle = new SplitText(titleRef.current, {
                type: "words",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: guideRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            });

            tl.fromTo(
                imageWrapperRef.current,
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.2,
                    ease: "power3.inOut",
                }
            )
                .fromTo(
                    imageRef.current,
                    { scale: 1.25 },
                    { scale: 1.1, duration: 1.2, ease: "power3.inOut" },
                    "<"
                )
                .fromTo(
                    splitTitle.words,
                    { opacity: 0, y: 25 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.04,
                        ease: "power2.out",
                        clearProps: "transform,opacity",
                    },
                    "-=0.6"
                )
                .fromTo(
                    descRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        clearProps: "transform,opacity",
                    },
                    "-=0.4"
                )
                .fromTo(
                    btnRef.current,
                    { opacity: 0, y: 15 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        clearProps: "transform,opacity",
                    },
                    "-=0.4"
                );

            gsap.fromTo(
                imageRef.current,
                { yPercent: -8 },
                {
                    yPercent: 8,
                    ease: "none",
                    scrollTrigger: {
                        trigger: guideRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );

            return () => {
                splitTitle.revert();
            };
        },
        { scope: guideRef }
    );

    return (
        <section className={styles.guide} ref={guideRef}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper} ref={imageWrapperRef}>
                        <Image
                            ref={imageRef}
                            src="https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/quality=value:60/cmppl2z95yugt06lntqeh6n1u"
                            alt="Woman walking through a stone labyrinth in nature"
                            fill
                            className={styles.image}
                        />
                    </div>
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title} ref={titleRef}>
                        FIRST-TIMER&#39;S GUIDE
                    </h2>
                    <p className={styles.description} ref={descRef}>
                        New to Canyon Ranch? Our guide offers everything you need to know
                        for planning your perfect stay.
                    </p>
                    <div className={styles.btnWrapper} ref={btnRef}>
                        <Link href="/" className={styles.button}>
                            VIEW GUIDE
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}