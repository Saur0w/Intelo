"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";
import Magnetic from "@/ui/Magnetic"
import PerspectiveText from "@/ui/PerspectiveText";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const splitLogo = new SplitText(logoRef.current, { type: "chars" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(splitLogo.chars, {
                opacity: 0,
                y: 15,
                stagger: 0.04,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(
                    `.${styles.column}`,
                    {
                        y: 30,
                        opacity: 0,
                        stagger: 0.12,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.4"
                )
                .from(
                    [`.${styles.divider}`, `.${styles.bottomBar}`],
                    {
                        opacity: 0,
                        y: 15,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    "-=0.3"
                );
        },
        { scope: footerRef }
    );

    return (
        <footer className={styles.footer} ref={footerRef}>
            <div className={styles.logoWrapper}>
                <h2 className={styles.logo} ref={logoRef}>
                    CANYON RANCH.
                </h2>
            </div>

            <div className={styles.grid}>
                <div className={styles.column}>
                    <h3 className={styles.columnHeader}>RESERVATIONS</h3>
                    <ul className={styles.linkList}>
                        <li>
                            <Link href="tel:8664949279">(866) 494-9279</Link>
                        </li>
                        <li>
                            <Link href="/">Contact Us</Link>
                        </li>
                        <li>
                            <Link href="/">FAQs</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.columnHeader}>EXPLORE</h3>
                    <ul className={styles.linkList}>
                        <li>
                            <Link href="/">Ways to Stay</Link>
                        </li>
                        <li>
                            <Link href="/">Events</Link>
                        </li>
                        <li>
                            <Link href="/">Day Pass</Link>
                        </li>
                        <li>
                            <Link href="/">Group & Corporate Stays</Link>
                        </li>
                        <li>
                            <Link href="/">Membership</Link>
                        </li>
                        <li>
                            <Link href="/">Shop</Link>
                        </li>
                        <li>
                            <Link href="/">Blog</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.columnHeader}>ABOUT</h3>
                    <ul className={styles.linkList}>
                        <li>
                            <Link href="/">About Us</Link>
                        </li>
                        <li>
                            <Link href="/">Meet Our Experts</Link>
                        </li>
                        <li>
                            <Link href="/">Leadership Team</Link>
                        </li>
                        <li>
                            <Link href="/">Careers</Link>
                        </li>
                        <li>
                            <Link href="/">Travel Advisors</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <Link href="/" className={styles.signUpLink}>
                        SIGN UP TO STAY CONNECTED
                    </Link>

                    <div className={styles.socialGroup}>
                        <h3 className={styles.columnHeader}>SOCIAL</h3>
                        <div className={styles.socialIcons}>
                            <Magnetic>
                                <Link href="/" aria-label="Facebook">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03.22-1.5 1.5-1.5H17V2.14c-.52-.07-1.44-.14-2.7-.14-2.8 0-4.8 1.63-4.8 4.7v2.8H7v4h2.5V22h4.5v-8.5z" />
                                    </svg>
                                </Link>
                            </Magnetic>

                            <Magnetic>
                                <Link href="/" aria-label="LinkedIn">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                    </svg>
                                </Link>
                            </Magnetic>

                            <Magnetic>
                                <Link href="/" aria-label="Instagram">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </Link>
                            </Magnetic>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.bottomBar}>
                <ul className={styles.legalNav}>
                    <li>
                        <Link href="/"><PerspectiveText label="Terms & Conditions" /></Link>
                    </li>
                    <li>
                        <Link href="/"><PerspectiveText label="Accessibility" /></Link>
                    </li>
                    <li>
                        <Link href="/"><PerspectiveText label="Privacy" /></Link>
                    </li>
                    <li>
                        <Link href="/"><PerspectiveText label="Legal" /></Link>
                    </li>
                    <li>
                        <Link href="/"><PerspectiveText label="Directory" /></Link>
                    </li>
                    <li>
                        <Link href="/"><PerspectiveText label="Sitemap" /></Link>
                    </li>
                </ul>

                <p className={styles.copyright}>
                    © 2026 Canyon Ranch. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}