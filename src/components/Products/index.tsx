"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip, CustomEase);
}

export interface ShopItem {
    id: string;
    indexStr: string;
    src: string;
    alt: string;
    title: string;
    category: "rituals" | "living" | "curations";
    categoryLabel: string;
    origin: string;
    ritualNotes: string;
    price: string;
    href: string;
}

const shopItems: ShopItem[] = [
    {
        id: "skin-care",
        indexStr: "01",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp299b3yz507k4lkg4if5s",
        alt: "Woman using botanical face roller",
        title: "Botanical Sculpt & Mineral Elixir",
        category: "rituals",
        categoryLabel: "Facial Care",
        origin: "Sonoran Desert Sanctuary",
        ritualNotes: "Prickly Pear Seed • Cold-Pressed Jojoba • Rose Quartz",
        price: "$120",
        href: "#skin-care",
    },
    {
        id: "spa-collection",
        indexStr: "02",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp549a41ph07k473m14zze",
        alt: "CR Spa Collection products",
        title: "Thermal Bath Soak & Cedar Mist",
        category: "rituals",
        categoryLabel: "Hydrotherapy",
        origin: "Lenox Berkshire Springs",
        ritualNotes: "Epsom Crystals • Wild Mountain Sage • Pine Needle",
        price: "$85",
        href: "#spa-collection",
    },
    {
        id: "apparel",
        indexStr: "03",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp71vn3p3f06l81iwtf2b8",
        alt: "Man wearing Canyon Ranch apparel on court",
        title: "Organic Linen Sanctuary Tunic",
        category: "living",
        categoryLabel: "Sanctuary Wear",
        origin: "Woodside Forest Atelier",
        ritualNotes: "100% Unbleached Flax • Natural Indigo Dye",
        price: "$165",
        href: "#apparel",
    },
    {
        id: "gift-cards",
        indexStr: "04",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp0wcs3k7606l8jdao8exa",
        alt: "Sanctuary Gift Cards",
        title: "Immersive Sanctuary Passport",
        category: "curations",
        categoryLabel: "Gifting & Journey",
        origin: "All 4 Global Destinations",
        ritualNotes: "Custom Calligraphy • Hand-Poured Wax Seal",
        price: "From $250",
        href: "#gift-cards",
    },
    {
        id: "best-sellers",
        indexStr: "05",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazpavv241ut07k3zfntb775",
        alt: "Woman with Canyon Ranch tote bag",
        title: "Sanctuary Heritage Canvas Carryall",
        category: "living",
        categoryLabel: "Living Objects",
        origin: "Tucson Sanctuary Studio",
        ritualNotes: "Heavyweight Organic Cotton • Brass Hardware",
        price: "$140",
        href: "#best-sellers",
    },
    {
        id: "shop-all",
        indexStr: "06",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazpaj3d3qu206l8s61l0eg6",
        alt: "Skincare bottles on a vanity",
        title: "The Complete Longevity Dispensary",
        category: "curations",
        categoryLabel: "The Apothecary",
        origin: "Clinical Wellness Lab",
        ritualNotes: "Integrative Formulations • Full 12-Piece Suite",
        price: "$480",
        href: "#shop-all",
    },
];

const categories = [
    { key: "all", label: "All Formulations" },
    { key: "rituals", label: "Care & Rituals" },
    { key: "living", label: "Sanctuary Living" },
    { key: "curations", label: "Curations & Gifts" },
] as const;

type CategoryType = (typeof categories)[number]["key"];
type LayoutMode = "editorial" | "grid";

export default function Products() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
    const [layoutMode, setLayoutMode] = useState<LayoutMode>("editorial");
    const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

    const filteredItems = shopItems.filter(
        (item) => activeCategory === "all" || item.category === activeCategory
    );

    const handleCategoryChange = (cat: CategoryType) => {
        if (cat === activeCategory || !gridRef.current) return;

        const cards = gridRef.current.querySelectorAll(
            `.${styles.productCard}, .${styles.imageContainer}`
        );
        const state = Flip.getState(cards);

        setActiveCategory(cat);

        requestAnimationFrame(() => {
            if (!gridRef.current) return;
            const updatedCards = gridRef.current.querySelectorAll(
                `.${styles.productCard}, .${styles.imageContainer}`
            );

            Flip.from(state, {
                targets: updatedCards,
                duration: 0.9,
                ease: "luxuryFlip",
                stagger: 0.04,
                scale: true,
                fade: true,
                absolute: false,
                onEnter: (elements) =>
                    gsap.fromTo(
                        elements,
                        { opacity: 0, scale: 0.88, y: 35 },
                        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "luxuryEase" }
                    ),
                onLeave: (elements) =>
                    gsap.to(elements, {
                        opacity: 0,
                        scale: 0.85,
                        duration: 0.35,
                        ease: "power2.in",
                    }),
            });
        });
    };

    const handleLayoutChange = (mode: LayoutMode) => {
        if (mode === layoutMode || !gridRef.current) return;

        const targets = gridRef.current.querySelectorAll(
            `.${styles.productCard}, .${styles.imageContainer}, .${styles.cardImg}`
        );
        const state = Flip.getState(targets);

        setLayoutMode(mode);

        requestAnimationFrame(() => {
            if (!gridRef.current) return;
            const updatedTargets = gridRef.current.querySelectorAll(
                `.${styles.productCard}, .${styles.imageContainer}, .${styles.cardImg}`
            );

            Flip.from(state, {
                targets: updatedTargets,
                duration: 1.1,
                ease: "luxuryFlip",
                stagger: 0.03,
                scale: true,
                nested: true,
                prune: true,
                onComplete: () => {
                    ScrollTrigger.refresh();
                },
            });
        });
    };

    useGSAP(
        () => {
            const container = sectionRef.current;
            if (!container) return;

            CustomEase.create("luxuryEase", "0.19, 1, 0.22, 1");
            CustomEase.create("luxuryFlip", "0.25, 1, 0.3, 1");

            if (titleRef.current) {
                const split = new SplitText(titleRef.current, {
                    type: "words,chars",
                    wordsClass: styles.wordMask,
                    charsClass: styles.charInner,
                });

                gsap.fromTo(
                    split.chars,
                    { yPercent: 130, opacity: 0, rotateZ: 4 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        rotateZ: 0,
                        duration: 1.1,
                        stagger: 0.015,
                        ease: "luxuryEase",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }

            const cards = container.querySelectorAll(`.${styles.productCard}`);
            gsap.fromTo(
                cards,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.08,
                    ease: "luxuryEase",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 78%",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section className={styles.productsSection} ref={sectionRef} id="apothecary">
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.topMeta}>
                        <div className={styles.badge}>
                            <span className={styles.pulseDot} />
                            <span>THE APOTHECARY & DISPENSARY</span>
                        </div>
                        <span className={styles.batchTag}>ORIGIN NO. 1979 • PURE BOTANICAL</span>
                    </div>

                    <div className={styles.headlineRow}>
                        <h2 ref={titleRef} className={styles.mainTitle}>
                            Formulated for Longevity
                        </h2>

                        <div className={styles.storyBlock}>
                            <p className={styles.storyLead}>
                                Integrative remedies formulated alongside clinical physicians and
                                holistic herbalists across our four desert and forest havens.
                            </p>
                        </div>
                    </div>

                    <div className={styles.controlsBar}>
                        <nav className={styles.categoryNav} aria-label="Product Categories">
                            {categories.map((cat) => (
                                <button
                                    key={cat.key}
                                    type="button"
                                    className={`${styles.filterBtn} ${
                                        activeCategory === cat.key ? styles.activeFilter : ""
                                    }`}
                                    onClick={() => handleCategoryChange(cat.key)}
                                >
                                    <span>{cat.label}</span>
                                    {cat.key !== "all" && (
                                        <span className={styles.countBadge}>
                                            {shopItems.filter((i) => i.category === cat.key).length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>

                        <div className={styles.layoutSwitcher}>
                            <span className={styles.switchLabel}>View Mode</span>
                            <div className={styles.switchButtons}>
                                <button
                                    type="button"
                                    aria-label="Editorial Spread Layout"
                                    className={`${styles.viewBtn} ${
                                        layoutMode === "editorial" ? styles.activeView : ""
                                    }`}
                                    onClick={() => handleLayoutChange("editorial")}
                                >
                                    Editorial
                                </button>
                                <button
                                    type="button"
                                    aria-label="Gallery Grid Layout"
                                    className={`${styles.viewBtn} ${
                                        layoutMode === "grid" ? styles.activeView : ""
                                    }`}
                                    onClick={() => handleLayoutChange("grid")}
                                >
                                    Grid
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <div
                    ref={gridRef}
                    className={`${styles.productGrid} ${
                        layoutMode === "editorial" ? styles.editorialView : styles.gridView
                    }`}
                >
                    {filteredItems.map((item) => (
                        <article
                            key={item.id}
                            className={`${styles.productCard} ${
                                selectedItem?.id === item.id ? styles.cardActive : ""
                            }`}
                            data-category={item.category}
                        >
                            <div
                                className={styles.cardInner}
                                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                            >
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        unoptimized
                                        className={styles.cardImg}
                                    />

                                    <div className={styles.imageHeader}>
                                        <span className={styles.itemIndex}>{item.indexStr}</span>
                                        <span className={styles.itemCategory}>{item.categoryLabel}</span>
                                    </div>

                                    <div className={styles.hoverOverlay}>
                                        <span className={styles.inspectBtn}>
                                            {selectedItem?.id === item.id ? "Close Details ✕" : "Ritual Story ↗"}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.cardDetails}>
                                    <div className={styles.titlePriceRow}>
                                        <h3 className={styles.cardTitle}>{item.title}</h3>
                                        <span className={styles.cardPrice}>{item.price}</span>
                                    </div>

                                    <p className={styles.ritualNotes}>{item.ritualNotes}</p>

                                    <div className={styles.originFooter}>
                                        <span className={styles.originText}>Provenance: {item.origin}</span>
                                        <span className={styles.viewLink}>Acquire Object →</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {selectedItem && (
                    <aside className={styles.spotlightInspection} aria-live="polite">
                        <div className={styles.spotlightBackdrop} onClick={() => setSelectedItem(null)} />
                        <div className={styles.spotlightModal}>
                            <button
                                type="button"
                                className={styles.closeBtn}
                                onClick={() => setSelectedItem(null)}
                            >
                                ✕
                            </button>
                            <div className={styles.spotlightGrid}>
                                <div className={styles.spotlightMedia}>
                                    <Image
                                        src={selectedItem.src}
                                        alt={selectedItem.alt}
                                        fill
                                        unoptimized
                                        className={styles.spotlightImg}
                                    />
                                </div>
                                <div className={styles.spotlightBody}>
                                    <div className={styles.spotlightCategory}>
                                        {selectedItem.categoryLabel} • {selectedItem.origin}
                                    </div>
                                    <h3 className={styles.spotlightTitle}>{selectedItem.title}</h3>
                                    <div className={styles.spotlightPrice}>{selectedItem.price}</div>

                                    <div className={styles.spotlightDivider} />

                                    <div className={styles.detailSection}>
                                        <h4>Ritual Application & Synergy</h4>
                                        <p>{selectedItem.ritualNotes}</p>
                                    </div>

                                    <div className={styles.detailSection}>
                                        <h4>Integrative Standard</h4>
                                        <p>
                                            Crafted free of synthetic binders, parabens, and micro-plastics.
                                            Sustainably sourced and packaged in recyclable amber glass and organic flax.
                                        </p>
                                    </div>

                                    <Link href={selectedItem.href} className={styles.spotlightAction}>
                                        <span>Proceed to Acquisition</span>
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                <footer className={styles.apothecaryFooter}>
                    <div className={styles.footerRule} />
                    <div className={styles.footerRow}>
                        <div className={styles.guaranteeTag}>
                            <span className={styles.guaranteeDot} />
                            <span>100% CLINICAL & BOTANICAL PURITY GUARANTEED</span>
                        </div>
                        <Link href="/" className={styles.allCatalogLink}>
                            <span>Explore Full 40-Piece Sanctuary Dispensary</span>
                            <span className={styles.arrowIcon}>→</span>
                        </Link>
                    </div>
                </footer>
            </div>
        </section>
    );
}