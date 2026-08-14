"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
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
              <span className={styles.logoInner}>Canyon Ranch</span>
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
            >
                <div className={styles.mobileLinks}>
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={styles.mobileLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className={styles.mIndex}>0{index + 1}</span>
                            <span className={styles.mText}>{link.label}</span>
                        </Link>
                    ))}
                </div>

                <div className={styles.mobileFooter}>
                    <p>THE ARCHITECTURE OF WELL-BEING</p>
                    <Link
                        href="/reserve"
                        className={styles.mobileReserveBtn}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Book a Stay &rarr;
                    </Link>
                </div>
            </div>
        </header>
    );
}