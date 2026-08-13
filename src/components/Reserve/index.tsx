"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

export default function Reserve() {
    const reserveRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            const splitTitle = new SplitText(titleRef.current, { type: "words, lines" });
            const splitDesc = new SplitText(descRef.current, { type: "lines" });

            gsap.set([splitTitle.lines, splitDesc.lines], { overflow: "hidden" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: reserveRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.fromTo(
                imageWrapperRef.current,
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.4,
                    ease: "power4.inOut",
                }
            )
                .fromTo(
                    imageRef.current,
                    { scale: 1.35 },
                    { scale: 1.15, duration: 1.4, ease: "power4.inOut" },
                    "<"
                )
                .from(
                    `.${styles.subhead}`,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "-=0.8"
                )
                .from(
                    splitTitle.words,
                    {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.03,
                        ease: "power3.out",
                    },
                    "-=0.6"
                )
                .from(
                    splitDesc.lines,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    "-=0.5"
                )
                .from(
                    `.${styles.button}`,
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power3.out",
                    },
                    "-=0.4"
                );

            gsap.fromTo(
                imageRef.current,
                { yPercent: -12 },
                {
                    yPercent: 12,
                    ease: "none",
                    scrollTrigger: {
                        trigger: reserveRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );

            gsap.fromTo(
                contentRef.current,
                { yPercent: 6 },
                {
                    yPercent: -6,
                    ease: "none",
                    scrollTrigger: {
                        trigger: reserveRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        },
        { scope: reserveRef }
    );

    return (
        <section className={styles.reserve} ref={reserveRef}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <div ref={imageWrapperRef}>
                        <Image
                            ref={imageRef}
                            src="https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmqa3hazdq2ip07k0o66gcpif"
                            alt="Kate sitting in the Texas Wildflowers"
                            fill
                        />

                    </div>
                </div>


                <div className={styles.content} ref={contentRef}>
                    <p className={styles.subhead}>OPENING OCT. 15, 2026</p>
                    <h2 className={styles.title} ref={titleRef}>
                        Now Accepting Reservations for Canyon Ranch Austin
                    </h2>
                    <p className={styles.description} ref={descRef}>
                        Discover a new destination for whole-person wellness—where
                        movement, nourishment, mental health, and restorative
                        experiences come together in the heart of Texas.
                    </p>
                    <div className={styles.btnWrapper}>
                        <button className={styles.button}>BOOK YOUR STAY</button>
                    </div>
                </div>
            </div>
        </section>
    );
}