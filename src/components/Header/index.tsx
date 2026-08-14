"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface NavLink {
    label: string;
    href: string;
}

const navLinks: NavLink[] = [
    { label: "About", href: "/" },
    { label: "Experiences", href: "/" },
    { label: "Destinations", href: "/" },
    { label: "Offers", href: "/" },
    { label: "Shop", href: "/" },
];

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    useGSAP(
        () => {
            const header = headerRef.current;
            if (!header) return;

            gsap.fromTo(
                header,
                { y: -30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    delay: 0.2,
                    ease: "power3.out",
                }
            );

            const handleScroll = () => {
                const scrolled = window.scrollY > 40;
                if (scrolled) {
                    header.classList.add(styles.isScrolled);
                    header.classList.add(styles.themeLight);
                    header.classList.remove(styles.themeDark);
                    setTheme("light");
                } else {
                    header.classList.remove(styles.isScrolled);
                    // Check element beneath header
                    const elem = document.elementFromPoint(window.innerWidth / 2, 50);
                    const themedSection = elem?.closest("[data-theme]");
                    const isDarkSection = themedSection ? themedSection.getAttribute("data-theme") === "dark" : true;

                    if (isDarkSection) {
                        header.classList.add(styles.themeDark);
                        header.classList.remove(styles.themeLight);
                        setTheme("dark");
                    } else {
                        header.classList.add(styles.themeLight);
                        header.classList.remove(styles.themeDark);
                        setTheme("light");
                    }
                }
            };

            handleScroll();
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        },
        { scope: headerRef }
    );

    return (
        <header
            className={`${styles.header} ${theme === "dark" ? styles.themeDark : styles.themeLight}`}
            ref={headerRef}
        >
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo}>
                        Canyon Ranch
                    </Link>
                    <span className={styles.estDate}>[ EST. 1979 ]</span>
                </div>

                <nav className={styles.navDesktop}>
                    {navLinks.map((link, index) => (
                        <Link key={index} href={link.href} className={styles.navLink}>
                            <span className={styles.linkIndex}>0{index + 1}</span>
                            <span className={styles.linkText}>{link.label}</span>
                        </Link>
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
                        className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ""}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
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
                        href="/"
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