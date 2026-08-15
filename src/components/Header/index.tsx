"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, SplitText);
}

interface NavLink {
    label: string;
    href: string;
}

interface HeaderProps {
    isLoaded: boolean;
}

const navLinks: NavLink[] = [
    { label: "About", href: "/" },
    { label: "Experiences", href: "/" },
    { label: "Destinations", href: "/" },
    { label: "Offers", href: "/" },
    { label: "Shop", href: "/" },
];

export default function Header({ isLoaded }: HeaderProps) {
    const headerRef = useRef<HTMLElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "America/Phoenix",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            };
            setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
        };

        updateTime();
        const interval = setInterval(updateTime, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 40;
            setIsScrolled(scrolled);

            if (scrolled) {
                setTheme("light");
            } else {
                const elem = document.elementFromPoint(window.innerWidth / 2, 50);
                const themedSection = elem?.closest("[data-theme]");
                const isDarkSection = themedSection
                    ? themedSection.getAttribute("data-theme") === "dark"
                    : true;
                setTheme(isDarkSection ? "dark" : "light");
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    useGSAP(
        () => {
            const header = headerRef.current;
            if (!header) return;

            const logoInner = header.querySelector(`.${styles.logoInner}`);
            const estDate = header.querySelector(`.${styles.estDate}`);
            const navItems = gsap.utils.toArray<HTMLElement>(`.${styles.navLink}`);
            const rightItems = gsap.utils.toArray<HTMLElement>(
                `.${styles.locationTime}, .${styles.reserveBtn}, .${styles.menuToggle}`
            );

            if (!isLoaded) {
                gsap.set(header, { autoAlpha: 0 });
                gsap.set(logoInner, { yPercent: 120 });
                gsap.set(estDate, { opacity: 0 });
                gsap.set(navItems, { yPercent: 120, opacity: 0 });
                gsap.set(rightItems, { opacity: 0, x: 15 });
                return;
            }

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                delay: 0.1,
            });

            tl.to(header, { autoAlpha: 1, duration: 0.4 })
                .to(
                    logoInner,
                    {
                        yPercent: 0,
                        duration: 0.9,
                    },
                    0.1
                )
                .to(
                    estDate,
                    {
                        opacity: 1,
                        duration: 0.8,
                    },
                    0.3
                )
                .to(
                    navItems,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.04,
                    },
                    0.25
                )
                .to(
                    rightItems,
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        stagger: 0.05,
                    },
                    0.35
                );
        },
        { scope: headerRef, dependencies: [isLoaded] }
    );

    useGSAP(
        () => {
            const drawer = drawerRef.current;
            if (!drawer) return;

            const linkTexts = drawer.querySelectorAll(`.${styles.mText}`);
            const linkIndices = drawer.querySelectorAll(`.${styles.mIndexInner}`);
            const footerTagline = drawer.querySelector(`.${styles.mFooterText}`);
            const footerBtn = drawer.querySelector(`.${styles.mobileReserveBtnInner}`);

            if (linkTexts.length === 0) return;

            const splitLinkTexts = new SplitText(linkTexts, {
                type: "chars, words",
                charsClass: styles.charInner,
            });

            let splitFooter: SplitText | null = null;
            if (footerTagline) {
                splitFooter = new SplitText(footerTagline, {
                    type: "words, chars",
                    charsClass: styles.charInner,
                });
            }

            if (isMenuOpen) {
                gsap.set(drawer, { autoAlpha: 1, yPercent: 0 });
                gsap.set(splitLinkTexts.chars, { yPercent: 120, opacity: 0, rotateZ: 3 });
                gsap.set(linkIndices, { yPercent: 110, opacity: 0 });
                if (splitFooter) {
                    gsap.set(splitFooter.chars, { yPercent: 120, opacity: 0 });
                }
                if (footerBtn) {
                    gsap.set(footerBtn, { yPercent: 110, opacity: 0 });
                }

                const tl = gsap.timeline({
                    defaults: { ease: "power4.out" },
                });

                tl.to(
                    linkIndices,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.75,
                        stagger: 0.06,
                    },
                    0.15
                )
                    .to(
                        splitLinkTexts.chars,
                        {
                            yPercent: 0,
                            opacity: 1,
                            rotateZ: 0,
                            duration: 0.85,
                            stagger: 0.015,
                        },
                        0.18
                    );

                if (splitFooter) {
                    tl.to(
                        splitFooter.chars,
                        {
                            yPercent: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.01,
                        },
                        0.4
                    );
                }

                if (footerBtn) {
                    tl.to(
                        footerBtn,
                        {
                            yPercent: 0,
                            opacity: 1,
                            duration: 0.7,
                        },
                        0.45
                    );
                }
            } else {
                gsap.to(splitLinkTexts.chars, {
                    yPercent: -100,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.008,
                    ease: "power3.in",
                });
                gsap.to([linkIndices, footerBtn], {
                    yPercent: -100,
                    opacity: 0,
                    duration: 0.25,
                    ease: "power3.in",
                });
                if (splitFooter) {
                    gsap.to(splitFooter.chars, {
                        yPercent: -100,
                        opacity: 0,
                        duration: 0.25,
                        ease: "power3.in",
                    });
                }
                gsap.to(drawer, {
                    yPercent: -100,
                    duration: 0.5,
                    delay: 0.2,
                    ease: "power4.inOut",
                    onComplete: () => {
                        gsap.set(drawer, { autoAlpha: 0 });
                    },
                });
            }

            return () => {
                splitLinkTexts.revert();
                if (splitFooter) splitFooter.revert();
            };
        },
        { scope: headerRef, dependencies: [isMenuOpen] }
    );

    return (
        <header
            className={`${styles.header} ${
                theme === "dark" ? styles.themeDark : styles.themeLight
            } ${isScrolled ? styles.isScrolled : ""}`}
            ref={headerRef}
        >
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoMask}>
                            <span className={styles.logoInner}><svg aria-hidden="true" data-testid="Logo" fill="none" id="Logo" viewBox="0 0 220 29" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M21.77 24.06c.04-.04.09-.09.47-1.27l.12-.42.21-2.77-1.1 1.55c-1.02 1.25-2.7 2.7-6.87 2.7-8.07 0-11.68-6.23-11.68-12.39 0-6.12 3.98-10.08 10.14-10.08 2.68 0 5.2.82 6.34 1.63 1.11.8 1.77 3.67 1.77 3.67l.28-1.26.27-2v-.05L21.7 1.8v-.06l-.04-.06c-.03-.06-.09-.16-.63-.32L20 1.1C18.89.77 15.98 0 12.89 0 6.5 0 0 4.4 0 12.83c0 2.9 1.04 12.37 14.43 12.37 3.06 0 5.92-.64 6.42-.85l.45-.13.34-.1.08-.01.05-.05zm134.69-.73-.02-.03a4.74 4.74 0 0 1-.74-1.3l-6.9-15.94-.32-.73-.33.73-7.23 15.9c-.12.24-1.03 2.28-1.03 2.28.05.02.95.23 1.8.36-.01 0 1.7-4.01 1.97-4.6h8.56l.99 2.25c.1.3.28.94.28 1.2 0 .27-.3.56-.4.63l-.96.73 1.21-.11c.01 0 1.12-.1 1.87-.1.69 0 2.74.15 2.75.15-.03-.02-.85-.7-1.5-1.42zm-4.84-4.92h-7.28l3.68-8.77 3.6 8.77zM175.7 6.4s-.95.1-1.38.1c-.5 0-1.39-.1-1.4-.1l-1-.1.72.69.24.22c.38.34.57.51.57 1.75v11.53l-.98-1.1-.75-.84c-2.8-3.17-8.92-10.3-8.98-10.39-.18-.18-.4-.75-.4-.94 0-.12.05-.3.07-.34l.22-.54-.6.07s-.82.1-1.33.1c-.82 0-2.92-.16-2.93-.17 0 0 1.91 1.36 1.91 2.62v13.41c0 1.6-1.32 2.3-1.32 2.3s1.75-.1 2.12-.1c.55 0 1.19.1 1.2.1l1.06.15-.77-.75h-.02l-.02-.02c-.13-.1-.55-.5-.55-1.68V10.05l13.13 15.18.62.72V9.26c0-1.51.23-1.71.84-2.24l.82-.71c.03-.02-1.08.1-1.08.1zm38.43 17.65c-.44-.36-.64-.54-.64-2.02V9.17c0-1.56 0-1.79.5-2.23l.81-.7c-.01 0-1.88.25-2.43.25-.6 0-1.52-.1-1.52-.1l-1.2-.13.93.74c.54.43.65.68.65 2.32v4.59h-10.07V9.15c0-1.51.16-1.68.6-2.14l.04-.03.68-.7-.97.11c-.01 0-.89.1-1.48.1s-1.56-.1-1.57-.1l-1.3-.13 1.05.76c.56.4.7.5.7 2.13v12.7c.01.7-.03 1.28-.3 1.7-.38.57-1.5 1.2-1.5 1.2.01 0 2.28-.18 2.95-.18.75 0 1.58.1 1.6.1l1.26.15-1-.77c-.62-.46-.76-.57-.76-2.1v-6.51h10.07v6.65c0 1.3-.78 1.98-.78 1.98l-.9.76 1.22-.16a13.01 13.01 0 0 1 3.06.01l1.19.15-.89-.78zM119.55 6.42c-.01 0-.97.1-1.4.1-.48 0-1.38-.1-1.39-.1l-1-.11.7.69c.09.09.18.15.24.22.39.34.58.52.58 1.75v11.51l-.9-1.01-.82-.93c-2.8-3.17-8.91-10.3-8.98-10.38-.18-.18-.4-.75-.4-.94 0-.12.05-.3.07-.34l.22-.54-.6.07s-.82.1-1.33.1c-.83 0-2.16-.1-2.17-.1l-.78-.1.83.61c1 .7 1.1.8 1.1 2.05v13.4c0 1.58-1.28 2.36-1.28 2.36.01 0 1.7-.15 2.06-.15.56 0 1.2.1 1.2.1l1.15.16-.85-.76h-.01c-.01-.02-.03-.02-.03-.02-.09-.06-.54-.47-.54-1.68V10.06l13.11 15.17.63.72V9.26c0-1.51.23-1.71.84-2.23l.83-.71c.03-.02-1.08.1-1.08.1zm-58.75.01c-.02 0-.97.1-1.4.1-.49 0-1.38-.1-1.4-.1l-1-.11.71.69.24.22c.39.34.58.52.58 1.75v11.51l-.94-1.05-.8-.9C54 15.39 47.9 8.26 47.84 8.2a2.2 2.2 0 0 1-.41-.95c0-.13.05-.3.08-.34l.21-.54-.59.07s-.82.1-1.33.1c-.82 0-2-.05-2.02-.05l-.9-.04.87.58c1.03.7 1.03.73 1.03 1.98v13.4c0 1.26-.65 1.68-.68 1.7l-.89.63c.02 0 2-.14 2.36-.14.56 0 1.19.1 1.2.1l1.11.16-.81-.76h-.02c0-.02-.02-.03-.02-.03-.09-.06-.54-.47-.54-1.68v-12.3l13.1 15.15.62.72V9.27c0-1.51.23-1.71.84-2.23l.84-.71-1.09.1zm22.11-.03c-.01 0-1.03.1-1.65.1-.39 0-1.7-.1-1.71-.1l-.83-.06.52.63c.3.35.58.79.6.93-.2.74-4.17 8.06-7 13.24l-1.55-3.5c-1.63-3.69-4.09-9.25-4.18-9.76 0-.15.25-.62.48-.95l.4-.58-.72.06c-.01 0-1.45.1-2.07.1-.8 0-2.91-.07-2.92-.07l1.19.54c.43.2.97.69 1.25 1.28l6.99 15.1c-.12.3-.6 1.24-1.03 2.09-.45.9-1.3 1.42-2.15 1.85l-.1.06-.99.4 1.19.25c.37.03 2.28.1 3.57-2.11l.73-1.27c.1-.16 7.4-14.8 8.85-16.69a11.1 11.1 0 0 1 1.81-1.61l-.68.08zm8.39-.38a9.5 9.5 0 0 0-9.4 9.55c0 5.77 3.91 9.5 9.96 9.5 4.35 0 9.2-3.56 9.2-8.67 0-5.02-2.57-10.38-9.76-10.38zm0 1.18c4.08 0 7.52 4.22 7.52 9.2 0 4.86-3.44 7.48-6.68 7.48-4.4 0-7.98-3.86-7.98-8.59 0-4.76 2.94-8.1 7.14-8.1zM41.09 23.33l-.03-.03a4.75 4.75 0 0 1-.73-1.3l-6.9-15.92-.32-.74-.32.74-7.24 15.9c-.11.24-.45.92-.76 1.2-.44.38-1.6 1.45-1.82 1.6l.81-.1c.01 0 1-.1 1.8-.1.63 0 1.71.12 1.72.12l.99.11-.7-.7c-.29-.29-.56-.67-.56-.8 0-.23.18-.8.29-1.1-.02.02.7-1.64.95-2.22h8.55l.98 2.25c.1.3.29.94.29 1.2 0 .27-.3.56-.4.63l-.96.73 1.2-.11c.02 0 1.13-.1 1.88-.1.69 0 2.76.19 2.77.19l-.67-.55c0-.01-.5-.49-.82-.9zm-4.84-4.92h-7.28l3.68-8.77 3.6 8.77zm157.69 3.51c-.49.6-1.72 1.9-5.17 1.9-5.95 0-8.62-4.65-8.62-9.25 0-4.5 2.93-7.42 7.46-7.42 2 0 3.87.57 4.7 1.2.9.7 1.53 2.42 1.53 2.42l.36-2.18v-.02l-.02-1.19v-.05l-.03-.06c-.04-.05-.1-.16-.54-.3l-.78-.18a19.6 19.6 0 0 0-5.34-.84c-4.85 0-9.77 3.36-9.77 9.77 0 5.84 4.08 9.32 10.92 9.32 2.28 0 4.42-.47 4.86-.65l.33-.1.26-.06.07-.03.05-.05c.05-.04.1-.09.4-1.03l.08-.29.26-2.14-1 1.23zm22.41.98c0-.98.72-1.73 1.63-1.73.91 0 1.62.75 1.62 1.74 0 1-.71 1.74-1.62 1.74-.91 0-1.63-.73-1.63-1.74zm1.63 2.1c1.1 0 2.02-.87 2.02-2.08 0-1.2-.93-2.08-2.02-2.08-1.1 0-2.02.9-2.02 2.08a2.02 2.02 0 0 0 2.02 2.09zm-.43-1.93h.4l.61 1.05h.4l-.66-1.06c.34-.04.6-.23.6-.66 0-.47-.27-.68-.81-.68h-.89v2.4h.35v-1.05zm0-.3v-.75h.48c.24 0 .5.05.5.35 0 .37-.27.4-.56.4h-.42z" fill="currentColor" xmlns="http://www.w3.org/2000/svg"></path><path d="M139.63 22.55c-2.6-2.52-6.55-8.56-7.32-9.75l-.03-.06-.06-.08.08-.06.06-.04c.79-.54 4.08-1.92 4.14-6.01.05-3.98-3.78-5.86-7.61-5.86-.94 0-1.98.06-2.73.11h-.1c-.57.03-1.07.06-1.4.06-.57 0-1.8-.1-2.42-.16l.29.27c.15.12.91.79.91 2.3v18.8c0 1.8-1.05 2.5-1.06 2.5l-.55.37.08-.01.58-.04h.06c1.03-.1 1.79-.14 2.12-.14.97 0 2.07.12 2.2.14l.6.06-.19-.15a3.28 3.28 0 0 1-.28-.23c-.01 0-1.12-.86-1.12-2.52v-8.5h3.93l.03.05.02.04c.43.64 4.26 6.43 6.27 8.48 1.83 1.86 2.83 2.45 4.06 2.8 1.6.44 2.06.5 4.16.58a14.2 14.2 0 0 1-4.72-2.95zm-10.88-10h-2.88V1.98l.09-.03h.05c1.01-.2 1.49-.23 2.11-.23 3.15 0 5.82 1.6 5.81 5.7-.01 4.04-3.06 5.15-5.18 5.15z" fill="currentColor" xmlns="http://www.w3.org/2000/svg"></path></svg></span>
                        </span>
                    </Link>
                    <span className={styles.estDate}>[ EST. 1979 ]</span>
                </div>

                <nav className={styles.navDesktop}>
                    {navLinks.map((link, index) => (
                        <div key={index} className={styles.navLinkMask}>
                            <Link href={link.href} className={styles.navLink}>
                                <span className={styles.linkIndex}>0{index + 1}</span>
                                <span className={styles.linkText}>{link.label}</span>
                            </Link>
                        </div>
                    ))}
                </nav>

                <div className={styles.rightActions}>
                    {time && (
                        <div className={styles.locationTime}>
                            <span className={styles.dot}>●</span>
                            <span>TUCSON {time} MST</span>
                        </div>
                    )}

                    <Link href="/" className={styles.reserveBtn}>
                        <span className={styles.btnText}>Reserve</span>
                        <span className={styles.arrow}>&rarr;</span>
                    </Link>

                    <button
                        type="button"
                        className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ""}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Navigation Menu"
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            <div
                className={`${styles.mobileDrawer} ${
                    isMenuOpen ? styles.drawerOpen : ""
                }`}
                ref={drawerRef}
            >
                <div className={styles.mobileLinks}>
                    {navLinks.map((link, index) => (
                        <div key={index} className={styles.mobileLinkWrapper}>
                            <Link
                                href={link.href}
                                className={styles.mobileLink}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className={styles.mIndexMask}>
                                    <span className={styles.mIndexInner}>0{index + 1}</span>
                                </span>
                                <span className={styles.mTextMask}>
                                    <span className={styles.mText}>{link.label}</span>
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className={styles.mobileFooter}>
                    <div className={styles.mFooterTextMask}>
                        <p className={styles.mFooterText}>THE ARCHITECTURE OF WELL-BEING</p>
                    </div>
                    <div className={styles.mobileReserveBtnMask}>
                        <Link
                            href="/"
                            className={styles.mobileReserveBtn}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className={styles.mobileReserveBtnInner}>
                                Book a Stay &rarr;
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}