"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const statementRef = useRef<HTMLHeadingElement>(null);
    const inquiryLabelRef = useRef<HTMLSpanElement>(null);
    const inquiryLinkRef = useRef<HTMLAnchorElement>(null);
    const newsletterLabelRef = useRef<HTMLSpanElement>(null);
    const newsletterFormRef = useRef<HTMLFormElement>(null);
    const logoSvgRef = useRef<SVGSVGElement>(null);

    useGSAP(
        () => {
            const footer = footerRef.current;
            const logoSvg = logoSvgRef.current;
            const statement = statementRef.current;
            if (!footer) return;

            let splitStatement: SplitText | null = null;
            if (statement) {
                splitStatement = new SplitText(statement, {
                    type: "lines, words, chars",
                    linesClass: styles.maskLine,
                    wordsClass: styles.wordWrap,
                });
                gsap.set(splitStatement.lines, { overflow: "hidden" });

                gsap.from(splitStatement.chars, {
                    yPercent: 120,
                    opacity: 0,
                    duration: 1.1,
                    stagger: 0.02,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 78%",
                        toggleActions: "play none none reverse",
                    },
                });
            }

            const splitTargets: HTMLElement[] = [];
            if (inquiryLabelRef.current) splitTargets.push(inquiryLabelRef.current);
            if (inquiryLinkRef.current) splitTargets.push(inquiryLinkRef.current);
            if (newsletterLabelRef.current) splitTargets.push(newsletterLabelRef.current);

            let splitInquiryNews: SplitText | null = null;
            if (splitTargets.length > 0) {
                splitInquiryNews = new SplitText(splitTargets, {
                    type: "lines, words",
                    linesClass: styles.maskLine,
                });
                gsap.set(splitInquiryNews.lines, { overflow: "hidden" });

                gsap.from(splitInquiryNews.words, {
                    yPercent: 115,
                    opacity: 0,
                    duration: 0.85,
                    stagger: 0.018,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 72%",
                        toggleActions: "play none none reverse",
                    },
                });
            }

            if (newsletterFormRef.current) {
                gsap.from(newsletterFormRef.current, {
                    y: 25,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                });
            }

            const navLinkItems = footer.querySelectorAll<HTMLElement>(`.${styles.linkMaskItem}`);
            const locationItems = footer.querySelectorAll<HTMLElement>(`.${styles.locMaskItem}`);
            const copyrightItem = footer.querySelector<HTMLElement>(`.${styles.copyMaskItem}`);

            if (navLinkItems.length > 0) {
                gsap.from(navLinkItems, {
                    yPercent: 120,
                    opacity: 0,
                    duration: 0.85,
                    stagger: 0.03,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 68%",
                        toggleActions: "play none none reverse",
                    },
                });
            }

            if (locationItems.length > 0) {
                gsap.from(locationItems, {
                    yPercent: 110,
                    opacity: 0,
                    duration: 0.75,
                    stagger: 0.04,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 65%",
                        toggleActions: "play none none reverse",
                    },
                });
            }

            if (copyrightItem) {
                gsap.from(copyrightItem, {
                    yPercent: 110,
                    opacity: 0,
                    duration: 0.75,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 65%",
                        toggleActions: "play none none reverse",
                    },
                });
            }

            if (logoSvg) {
                gsap.fromTo(
                    logoSvg,
                    { yPercent: 30, opacity: 0.6 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: footer,
                            start: "top bottom",
                            end: "bottom bottom",
                            scrub: 0.5,
                        },
                    }
                );
            }

            return () => {
                if (splitStatement) splitStatement.revert();
                if (splitInquiryNews) splitInquiryNews.revert();
            };
        },
        { scope: footerRef }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <footer className={styles.footer} ref={footerRef}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.leftColumn}>
                        <h2 ref={statementRef} className={styles.statement}>
                            Live well. Age well.
                        </h2>

                        <div className={styles.inquiryBlock}>
                            <span ref={inquiryLabelRef} className={styles.label}>
                                Reservations & Inquiries:
                            </span>
                            <div className={styles.maskContainer}>
                                <Link
                                    ref={inquiryLinkRef}
                                    href="mailto:xyz@xyz.com"
                                    className={styles.inquiryLink}
                                >
                                    xyz@xyz.com
                                </Link>
                            </div>
                        </div>

                        <div className={styles.newsletterBlock}>
                            <span ref={newsletterLabelRef} className={styles.label}>
                                Sign up for our longevity journal (No spam)
                            </span>
                            <form
                                ref={newsletterFormRef}
                                className={styles.newsletterForm}
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    className={styles.inputField}
                                />
                                <button type="submit" aria-label="Subscribe" className={styles.submitBtn}>
                                    →
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.navCol}>
                            <ul className={styles.linkList}>
                                {["Sanctuaries", "Rituals", "Wellness Lab", "Dispensary", "Heritage", "Contact"].map((item, idx) => (
                                    <li key={idx} className={styles.linkMaskLine}>
                                        <Link href="/" className={styles.linkMaskItem}>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.navCol}>
                            <ul className={styles.linkList}>
                                {[
                                    { name: "Instagram ↗", href: "https://instagram.com" },
                                    { name: "LinkedIn ↗", href: "https://linkedin.com" },
                                    { name: "YouTube ↗", href: "https://youtube.com" },
                                ].map((item, idx) => (
                                    <li key={idx} className={styles.linkMaskLine}>
                                        <Link
                                            href={item.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`${styles.externalLink} ${styles.linkMaskItem}`}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.locationsGroup}>
                                {["Tucson—AZ", "Lenox—MA", "Woodside—CA"].map((loc, idx) => (
                                    <div key={idx} className={styles.locMaskLine}>
                                        <span className={styles.locMaskItem}>{loc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`${styles.navCol} ${styles.legalCol}`}>
                            <ul className={styles.linkList}>
                                {["Terms of use", "Privacy policy", "Accessibility"].map((item, idx) => (
                                    <li key={idx} className={styles.linkMaskLine}>
                                        <Link href="/" className={styles.linkMaskItem}>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.copyright}>
                                <div className={styles.copyMaskLine}>
                                    <span className={styles.copyMaskItem}>© 1979–2026</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles.giantLogoContainer}>
                <svg className="styles_canyonRanchLogo__DiwtJ" xmlns="http://www.w3.org/2000/svg" width="160"
                     height="22" viewBox="0 0 160 22" fill="none" aria-hidden="true">
                    <path
                        d="M15.8369 18.1781C15.8721 18.1429 15.9014 18.1136 16.1831 17.2158C16.1831 17.2099 16.2652 16.8989 16.2652 16.8989C16.2711 16.8755 16.4236 14.8042 16.4236 14.8042L15.6139 15.9777C14.8804 16.9224 13.6541 18.0138 10.6205 18.0138C4.75869 18.0138 2.12997 13.3138 2.12997 8.65484C2.12997 3.99589 5.02273 1.03858 9.49978 1.03858C11.4537 1.03858 13.2786 1.65469 14.1118 2.2708C14.9215 2.8693 15.3968 5.04621 15.3968 5.04621L15.6022 4.08978L15.8017 2.58765V2.54658C15.8017 2.54658 15.8017 2.54071 15.7782 1.36131V1.31436L15.7547 1.2733C15.7313 1.22635 15.6902 1.15007 15.2912 1.03272L14.5401 0.833219C13.7421 0.586776 11.6239 0 9.38242 0C4.71762 0 0 3.33285 0 9.70516C0 11.8997 0.756929 19.0582 10.4914 19.0582C12.7153 19.0582 14.7983 18.5654 15.1621 18.4128C15.1797 18.4128 15.344 18.3541 15.4907 18.313C15.4848 18.313 15.7371 18.2485 15.7371 18.2485L15.7958 18.2309L15.831 18.1957L15.8369 18.1781Z"
                        fill="currentColor"></path>
                    <path
                        d="M110.272 13.9123H104.973L107.649 7.27594L110.266 13.9123H110.272ZM113.787 17.6265V17.6089L113.769 17.6031C113.558 17.386 113.305 16.8227 113.235 16.6232C113.235 16.6173 108.218 4.5768 108.218 4.5768L107.989 4.01937L107.749 4.5768L102.485 16.5938C102.403 16.7757 101.734 18.3131 101.734 18.3131C101.775 18.3307 102.427 18.4891 103.055 18.5888C103.037 18.5888 104.293 15.5552 104.48 15.1093H110.706L111.422 16.8109C111.498 17.0456 111.627 17.5268 111.627 17.7263C111.627 17.9258 111.41 18.1429 111.34 18.2016L110.642 18.7473L111.522 18.6651C111.522 18.6651 112.337 18.5888 112.883 18.5888C113.388 18.5888 114.878 18.7062 114.884 18.7062C114.86 18.6886 114.268 18.1722 113.787 17.6265Z"
                        fill="currentColor"></path>
                    <path
                        d="M127.792 4.82911C127.792 4.82911 127.094 4.90538 126.777 4.90538C126.425 4.90538 125.773 4.82911 125.762 4.82911L125.034 4.74696L125.55 5.26919C125.615 5.33373 125.674 5.39241 125.721 5.43348C126.002 5.69166 126.143 5.82662 126.143 6.75371V15.479C125.955 15.2619 125.709 14.9743 125.427 14.6457L124.882 14.0062C122.84 11.6122 118.392 6.21388 118.351 6.1552C118.222 6.01438 118.052 5.58017 118.052 5.43935C118.052 5.34546 118.093 5.21637 118.11 5.18117L118.269 4.7763L117.84 4.82324C117.84 4.82324 117.242 4.89952 116.866 4.89952C116.268 4.89952 114.742 4.78217 114.736 4.7763C114.736 4.7763 116.127 5.80901 116.127 6.75371V16.8989C116.127 18.1018 115.165 18.6358 115.165 18.6358C115.171 18.6358 116.444 18.5595 116.708 18.5595C117.113 18.5595 117.57 18.6358 117.582 18.6358L118.357 18.7531L117.799 18.1898H117.782L117.764 18.1722C117.676 18.0959 117.371 17.7908 117.371 16.8989V7.58692L126.918 19.0582L127.369 19.6039V6.98841C127.369 5.84422 127.534 5.69166 127.98 5.29265L128.578 4.75283L127.786 4.82911"
                        fill="currentColor"></path>
                    <path
                        d="M155.734 18.1722C155.412 17.8964 155.265 17.7674 155.265 16.6466V6.92975C155.265 5.75034 155.265 5.5743 155.629 5.24571L156.221 4.71176C156.221 4.71176 154.854 4.90539 154.449 4.90539C154.021 4.90539 153.346 4.82911 153.346 4.82911L152.472 4.72936L153.147 5.28679C153.54 5.60951 153.622 5.80314 153.622 7.04122V10.5149H146.293V6.91801C146.293 5.77381 146.416 5.64472 146.739 5.29853L146.763 5.27505L147.256 4.75283L146.546 4.83498C146.546 4.83498 145.906 4.91126 145.478 4.91126C145.049 4.91126 144.339 4.83498 144.333 4.83498L143.389 4.73523L144.157 5.31026C144.562 5.60951 144.668 5.68579 144.668 6.92387V16.5234C144.674 17.0456 144.644 17.4857 144.457 17.8084C144.175 18.2309 143.359 18.7121 143.359 18.7121C143.365 18.7121 145.014 18.5712 145.501 18.5712C146.053 18.5712 146.657 18.6475 146.663 18.6475L147.584 18.7649L146.851 18.184C146.405 17.8378 146.299 17.7498 146.299 16.5879V11.6708H153.628V16.7053C153.628 17.6852 153.059 18.2016 153.059 18.2016L152.401 18.7766L153.293 18.6534C153.381 18.6358 154.05 18.5888 154.438 18.5888C154.972 18.5888 155.517 18.6651 155.517 18.6651L156.38 18.7825L155.74 18.1957L155.734 18.1722Z"
                        fill="currentColor"></path>
                    <path
                        d="M86.9472 4.84084C86.9472 4.84084 86.249 4.91712 85.9321 4.91712C85.58 4.91712 84.9287 4.84084 84.917 4.84084L84.1835 4.75869L84.6999 5.28091C84.7586 5.34546 84.8231 5.39828 84.8701 5.44522C85.1517 5.7034 85.2925 5.83835 85.2925 6.76545V15.4731C85.1224 15.2736 84.8877 15.0095 84.6412 14.7103L84.0427 14.0062C82.0008 11.6122 77.5589 6.22562 77.512 6.16694C77.3829 6.02612 77.2127 5.59191 77.2127 5.45108C77.2127 5.3572 77.2538 5.22811 77.2714 5.1929L77.4298 4.78803L77.0015 4.83497C77.0015 4.83497 76.403 4.91126 76.0275 4.91126C75.429 4.91126 74.4549 4.83497 74.449 4.83497L73.8799 4.77043L74.4901 5.22811C75.2177 5.75033 75.2823 5.82661 75.2823 6.77131V16.9048C75.2881 18.1018 74.361 18.6886 74.361 18.6886C74.3669 18.6886 75.5991 18.5712 75.8632 18.5712C76.268 18.5712 76.7374 18.6475 76.7374 18.6475L77.5707 18.7707L76.9546 18.1957H76.9487L76.9311 18.1781C76.8665 18.1312 76.5379 17.8202 76.5379 16.9048V7.59278L86.0729 19.0582L86.5247 19.6039V6.98841C86.5247 5.84421 86.689 5.69166 87.135 5.30439L87.7452 4.76456L86.9531 4.84084"
                        fill="currentColor"></path>
                    <path
                        d="M44.2187 4.84671C44.2187 4.84671 43.5204 4.92299 43.2036 4.92299C42.8515 4.92299 42.2002 4.84671 42.1884 4.84671L41.455 4.76456L41.9713 5.28679C42.0359 5.35133 42.0946 5.40414 42.1415 5.45108C42.4232 5.70926 42.564 5.84422 42.564 6.77131V15.479C42.3821 15.2736 42.1415 14.9861 41.8833 14.681L41.3083 14.0062C39.2663 11.6122 34.8245 6.22561 34.7834 6.17281C34.6543 6.02025 34.4842 5.59777 34.4842 5.45695C34.4842 5.3572 34.5253 5.23397 34.5429 5.19877L34.7013 4.7939L34.2729 4.84084C34.2729 4.84084 33.6744 4.91712 33.2989 4.91712C32.7063 4.91712 31.8437 4.88192 31.832 4.88192L31.1748 4.84671L31.8085 5.28679C32.5596 5.82075 32.5596 5.83248 32.5596 6.78305V16.9107C32.5596 17.8671 32.0902 18.1898 32.0667 18.2074L31.4212 18.6827C31.4212 18.6827 32.8706 18.5771 33.1346 18.5771C33.5395 18.5771 33.9972 18.6534 34.0089 18.6534L34.8186 18.7766L34.226 18.2016H34.2201L34.2025 18.1781C34.138 18.1253 33.8094 17.8202 33.8094 16.9048V7.60452L43.3385 19.0582L43.7903 19.6039V6.99429C43.7903 5.85009 43.9546 5.69752 44.4006 5.31025L45.0108 4.77043L44.2187 4.84671Z"
                        fill="currentColor"></path>
                    <path
                        d="M60.3025 4.82911C60.3025 4.82911 59.5514 4.90539 59.0996 4.90539C58.818 4.90539 57.8615 4.82911 57.8557 4.82911L57.2572 4.78217L57.6386 5.25745C57.8498 5.5215 58.061 5.85595 58.0728 5.96157C57.9261 6.519 55.0392 12.0581 52.9738 15.9718L51.853 13.3197C50.6678 10.5384 48.8781 6.33124 48.8136 5.94397C48.8136 5.83835 48.9955 5.48042 49.1598 5.22811L49.459 4.78804L48.9309 4.82911C48.9309 4.82911 47.8747 4.90539 47.4229 4.90539C46.8479 4.90539 45.3047 4.85845 45.2988 4.85845L46.1614 5.26332C46.4724 5.42174 46.8714 5.78554 47.0767 6.23735C47.0767 6.23735 51.6946 16.6114 52.1582 17.65C52.0701 17.8847 51.7239 18.5888 51.4071 19.2284C51.0785 19.9091 50.4624 20.3081 49.8404 20.6308L49.7641 20.6719L49.0483 20.9711L49.9108 21.1647C50.1807 21.1882 51.5655 21.2469 52.5044 19.5687L53.0383 18.6123C53.1028 18.4891 58.419 7.42262 59.4693 5.99678C59.616 5.79728 60.502 4.923 60.7895 4.77631L60.2966 4.83498L60.3025 4.82911Z"
                        fill="currentColor"></path>
                    <path
                        d="M66.4101 5.42761C69.3733 5.42761 71.8788 8.61963 71.8788 12.3867C71.8788 16.1537 69.3733 18.0373 67.0203 18.0373C63.8166 18.0373 61.2113 15.121 61.2113 11.5476C61.2113 7.97419 63.353 5.42761 66.4101 5.42761ZM66.4101 4.54159C63.1242 4.54159 59.5684 7.29941 59.5684 11.7588C59.5684 16.2183 62.4201 18.935 66.815 18.935C69.9776 18.935 73.51 16.2535 73.51 12.3867C73.51 8.51988 71.6382 4.53573 66.4101 4.53573"
                        fill="currentColor"></path>
                    <path
                        d="M26.3692 13.9123H21.0706L23.7463 7.27593L26.3633 13.9123H26.3692ZM29.8839 17.6265L29.8663 17.6089C29.6551 17.3918 29.4027 16.8285 29.3323 16.629C29.3323 16.6232 24.3155 4.58267 24.3155 4.58267L24.0866 4.02523L23.846 4.58267L18.5827 16.5997C18.5006 16.7816 18.2542 17.2979 18.0312 17.515C17.7085 17.7967 16.8635 18.6123 16.7051 18.7179L17.2977 18.6416C17.2977 18.6416 18.0253 18.5654 18.6003 18.5654C19.0639 18.5654 19.8502 18.6592 19.8619 18.6592L20.5778 18.7414L20.0731 18.2192C19.8619 17.9962 19.6624 17.7028 19.6624 17.6148C19.6624 17.4388 19.7915 17.0104 19.8678 16.7816C19.8619 16.7874 20.3783 15.5376 20.5602 15.0976H26.7799L27.4957 16.7992C27.572 17.0339 27.7011 17.515 27.7011 17.7145C27.7011 17.914 27.4899 18.1311 27.4136 18.1898L26.7153 18.7355L27.5955 18.6534C27.5955 18.6534 28.4111 18.5771 28.9568 18.5771C29.4614 18.5771 30.9636 18.7179 30.9753 18.7179L30.4883 18.3013C30.4883 18.3013 30.1245 17.9375 29.8898 17.6207"
                        fill="currentColor"></path>
                    <path
                        d="M141.053 16.5586C140.701 17.0163 139.803 17.9962 137.292 17.9962C132.967 17.9962 131.025 14.4814 131.025 11.0019C131.025 7.52237 133.161 5.3924 136.453 5.3924C137.902 5.3924 139.269 5.82662 139.868 6.29603C140.525 6.81825 140.977 8.12088 140.977 8.12088L141.241 6.47793V6.46032L141.223 5.56257V5.52149L141.2 5.48042C141.176 5.43935 141.135 5.3572 140.812 5.25745C140.806 5.25745 140.243 5.11662 140.243 5.11662C139.639 4.92299 138.043 4.48292 136.353 4.48292C132.826 4.48292 129.253 7.01775 129.253 11.8645C129.253 16.277 132.216 18.9057 137.192 18.9057C138.847 18.9057 140.402 18.5478 140.724 18.4128C140.73 18.4069 140.853 18.3717 140.965 18.3365C140.959 18.3365 141.153 18.2896 141.153 18.2896L141.2 18.272L141.241 18.2309C141.276 18.1957 141.305 18.1664 141.528 17.4505C141.528 17.4446 141.587 17.2334 141.587 17.2334C141.593 17.2158 141.775 15.6139 141.775 15.6139L141.041 16.5469L141.053 16.5586Z"
                        fill="currentColor"></path>
                    <path
                        d="M158.222 17.1982V16.6349H158.569C158.739 16.6349 158.932 16.676 158.932 16.8989C158.932 17.1806 158.733 17.1982 158.528 17.1982H158.222ZM158.222 17.4329H158.51L158.956 18.2192H159.243L158.768 17.4212C159.015 17.3859 159.202 17.2451 159.202 16.9224C159.202 16.5645 159.003 16.406 158.61 16.406H157.97V18.225H158.228V17.427L158.222 17.4329ZM158.533 18.8939C159.326 18.8939 160 18.2309 160 17.3155C160 16.4002 159.326 15.743 158.533 15.743C157.741 15.743 157.061 16.4178 157.061 17.3155C157.055 18.2309 157.73 18.8939 158.533 18.8939ZM157.348 17.3097C157.348 16.5645 157.864 15.9953 158.533 15.9953C159.202 15.9953 159.713 16.5586 159.713 17.3097C159.713 18.0607 159.196 18.6299 158.533 18.6299C157.87 18.6299 157.348 18.0725 157.348 17.3097Z"
                        fill="currentColor"></path>
                    <path
                        d="M93.6419 9.48218H91.5412V1.4728L91.6058 1.45519H91.6469C92.3803 1.3085 92.7265 1.27916 93.1783 1.27916C95.4667 1.27916 97.4089 2.48204 97.4031 5.58018C97.3972 8.63724 95.1792 9.47632 93.6419 9.47632M101.546 17.028C99.6621 15.1269 96.787 10.556 96.2237 9.65822L96.2002 9.61715L96.1591 9.5526L96.2178 9.51152L96.2589 9.47632C96.8339 9.07145 99.2338 8.02113 99.2749 4.93473C99.3101 1.93047 96.5229 0.504623 93.7416 0.504623C93.0551 0.504623 92.2982 0.545697 91.7584 0.586771H91.6821C91.2713 0.610241 90.9075 0.627849 90.667 0.627849C90.2445 0.627849 89.3585 0.551571 88.9067 0.510497L89.112 0.709996C89.2294 0.803879 89.7809 1.3085 89.7809 2.4527V16.6584C89.7809 18.0314 89.0182 18.5595 89.0064 18.5595L88.6133 18.8353H88.672C88.672 18.8353 89.0827 18.7942 89.0944 18.7942H89.1355C89.8866 18.7297 90.4381 18.6944 90.6728 18.6944C91.3828 18.6944 92.1808 18.7883 92.2689 18.7942L92.7148 18.8411L92.574 18.7238C92.4566 18.6299 92.3979 18.583 92.3686 18.5478C92.3686 18.5478 91.553 17.9023 91.553 16.6466V10.2274H94.4106L94.434 10.2626L94.4516 10.2861C94.7626 10.7789 97.5498 15.1562 99.0049 16.6994C100.337 18.1136 101.065 18.5536 101.962 18.8177C103.124 19.1521 103.459 19.1932 104.984 19.2577C104.755 19.2401 102.878 18.3541 101.552 17.0222"
                        fill="currentColor"></path>
                </svg>
            </div>
        </footer>
    );
}