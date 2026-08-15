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
    sku: string;
    src: string;
    alt: string;
    title: string;
    category: "rituals" | "living" | "curations";
    categoryLabel: string;
    volume: string;
    origin: string;
    ritualNotes: string;
    ingredients: string;
    price: string;
    href: string;
}

const shopItems: ShopItem[] = [
    {
        id: "skin-care",
        indexStr: "01",
        sku: "CR-SKN-019",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp299b3yz507k4lkg4if5s",
        alt: "Botanical Sculpt & Mineral Elixir",
        title: "Botanical Sculpt & Mineral Elixir",
        category: "rituals",
        categoryLabel: "Facial Care",
        volume: "50 ML / 1.7 FL. OZ.",
        origin: "Tucson Sanctuary Studio",
        ritualNotes: "Cold-pressed Sonoran jojoba, prickly pear seed, wild desert sage, rose quartz infusion.",
        ingredients: "Simmondsia Chinensis Seed Oil, Opuntia Ficus-Indica Seed Oil, Salvia Apiana Oil, Quartz Extract.",
        price: "$120",
        href: "#skin-care",
    },
    {
        id: "spa-collection",
        indexStr: "02",
        sku: "CR-SPA-044",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp549a41ph07k473m14zze",
        alt: "Thermal Bath Soak & Cedar Mist",
        title: "Thermal Bath Soak & Cedar Mist",
        category: "rituals",
        categoryLabel: "Hydrotherapy",
        volume: "300 G / 10.5 OZ.",
        origin: "Lenox Berkshire Springs",
        ritualNotes: "Purifying Epsom salt crystals, wild mountain cedar, crushed pine needle, bergamot rind.",
        ingredients: "Magnesium Sulfate, Cedrus Atlantica Wood Oil, Pinus Sylvestris Leaf Extract, Citrus Aurantium Peel Oil.",
        price: "$85",
        href: "#spa-collection",
    },
    {
        id: "apparel",
        indexStr: "03",
        sku: "CR-LIV-102",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp71vn3p3f06l81iwtf2b8",
        alt: "Organic Linen Sanctuary Tunic",
        title: "Organic Linen Sanctuary Tunic",
        category: "living",
        categoryLabel: "Sanctuary Wear",
        volume: "Sizes: S • M • L • XL",
        origin: "Woodside Forest Atelier",
        ritualNotes: "100% unbleached Belgian flax linen, garment-dyed in small batches with natural plant indigo.",
        ingredients: "100% Pure Organic Linen, Horn Button Accents, Organic Cotton Stitching.",
        price: "$165",
        href: "#apparel",
    },
    {
        id: "gift-cards",
        indexStr: "04",
        sku: "CR-CUR-001",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazp0wcs3k7606l8jdao8exa",
        alt: "Sanctuary Gift Passport",
        title: "Immersive Sanctuary Passport",
        category: "curations",
        categoryLabel: "Gifting & Journey",
        volume: "Universal Sanctuary Access",
        origin: "Global Destinations",
        ritualNotes: "Hand-embossed textured parchment, custom copperplate calligraphy, beeswax seal presentation.",
        ingredients: "Archival Cotton Paper, Pure Beeswax, Brass Certificate Medallion.",
        price: "From $250",
        href: "#gift-cards",
    },
    {
        id: "best-sellers",
        indexStr: "05",
        sku: "CR-LIV-088",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazpavv241ut07k3zfntb775",
        alt: "Heritage Canvas Carryall",
        title: "Sanctuary Heritage Canvas Carryall",
        category: "living",
        categoryLabel: "Living Objects",
        volume: "Capacity: 28 Liters",
        origin: "Tucson Sanctuary Studio",
        ritualNotes: "Heavyweight 18oz organic cotton canvas, solid brass hardware, vegetable-tanned bridle leather trim.",
        ingredients: "100% Organic Heavy Canvas, Italian Vegetable Leather, Antiqued Solid Brass.",
        price: "$140",
        href: "#best-sellers",
    },
    {
        id: "shop-all",
        indexStr: "06",
        sku: "CR-CUR-012",
        src: "https://us-east-1-shared-usea1-02.graphassets.com/AbltN5ThcTDi6XXh1GSBTz/cmazpaj3d3qu206l8s61l0eg6",
        alt: "Complete Longevity Dispensary",
        title: "Complete Longevity Dispensary",
        category: "curations",
        categoryLabel: "The Apothecary",
        volume: "12-Piece Full Suite",
        origin: "Clinical Wellness Lab",
        ritualNotes: "The definitive collection of cellular formulas, body elixirs, and restorative ritual objects.",
        ingredients: "Full 12-Piece Formulations suite in custom matte black archival presentation chest.",
        price: "$480",
        href: "#shop-all",
    },
];

const categories = [
    { key: "all", label: "ALL OBJECTS", count: 6 },
    { key: "rituals", label: "CARE & RITUALS", count: 2 },
    { key: "living", label: "SANCTUARY LIVING", count: 2 },
    { key: "curations", label: "GIFTS & ARCHIVE", count: 2 },
] as const;

type CategoryType = (typeof categories)[number]["key"];
type LayoutMode = "editorial" | "archive";

export default function Products() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const leadRef = useRef<HTMLParagraphElement>(null);

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
                duration: 0.85,
                ease: "fashionEase",
                stagger: 0.03,
                scale: true,
                fade: true,
                absolute: false,
                onEnter: (elements) =>
                    gsap.fromTo(
                        elements,
                        { opacity: 0, scale: 0.92, y: 30 },
                        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "fashionEase" }
                    ),
                onLeave: (elements) =>
                    gsap.to(elements, {
                        opacity: 0,
                        scale: 0.92,
                        duration: 0.3,
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
                duration: 1.0,
                ease: "fashionEase",
                stagger: 0.02,
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

            CustomEase.create("fashionEase", "0.22, 1, 0.36, 1");
            CustomEase.create("maskEase", "0.77, 0, 0.175, 1");

            if (titleRef.current) {
                const splitTitle = new SplitText(titleRef.current, {
                    type: "words,chars",
                    charsClass: styles.charInner,
                    wordsClass: styles.wordMask,
                });

                gsap.fromTo(
                    splitTitle.chars,
                    { yPercent: 120, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.1,
                        stagger: 0.015,
                        ease: "fashionEase",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }

            if (leadRef.current) {
                const splitLead = new SplitText(leadRef.current, {
                    type: "lines",
                    linesClass: styles.lineMask,
                });

                gsap.fromTo(
                    splitLead.lines,
                    { yPercent: 110, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.9,
                        stagger: 0.04,
                        ease: "fashionEase",
                        scrollTrigger: {
                            trigger: leadRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }

            const cards = container.querySelectorAll<HTMLElement>(`.${styles.productCard}`);

            cards.forEach((card) => {
                const imgContainer = card.querySelector<HTMLElement>(`.${styles.imageContainer}`);
                const imgInner = card.querySelector<HTMLElement>(`.${styles.cardImg}`);
                const cardDetails = card.querySelector<HTMLElement>(`.${styles.cardDetails}`);

                if (!imgContainer || !imgInner) return;

                const cardTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 84%",
                        toggleActions: "play none none reverse",
                    },
                });

                cardTl
                    .fromTo(
                        imgContainer,
                        { clipPath: "inset(100% 0% 0% 0%)" },
                        {
                            clipPath: "inset(0% 0% 0% 0%)",
                            duration: 1.25,
                            ease: "maskEase",
                        }
                    )
                    .fromTo(
                        imgInner,
                        { scale: 1.25 },
                        {
                            scale: 1,
                            duration: 1.35,
                            ease: "fashionEase",
                        },
                        0
                    )
                    .fromTo(
                        cardDetails,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "fashionEase",
                        },
                        "-=0.6"
                    );
            });
        },
        { scope: sectionRef }
    );

    return (
        <section className={styles.productsSection} ref={sectionRef} id="apothecary">
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.topIndexRow}>
                        <span className={styles.sectionIndex}>[ SECTION 04 / DISPENSARY ]</span>
                        <span className={styles.editionTag}>COLLECTION 2026 • BOTANICAL LAB</span>
                    </div>

                    <div className={styles.titleGrid}>
                        <h2 ref={titleRef} className={styles.mainTitle}>
                            Formulated for Longevity.
                        </h2>
                        <div className={styles.leadBlock}>
                            <p ref={leadRef} className={styles.leadText}>
                                Evidence-based botanical formulas, tactile linen garments, and restorative objects designed to sustain daily equilibrium.
                            </p>
                        </div>
                    </div>

                    <div className={styles.controlsBar}>
                        <nav className={styles.categoryNav} aria-label="Product Categories">
                            {categories.map((cat) => {
                                const isActive = activeCategory === cat.key;
                                return (
                                    <button
                                        key={cat.key}
                                        type="button"
                                        className={`${styles.filterBtn} ${isActive ? styles.activeFilter : ""}`}
                                        onClick={() => handleCategoryChange(cat.key)}
                                    >
                                        <span className={styles.btnText}>{cat.label}</span>
                                        <span className={styles.btnCount}>({cat.count})</span>
                                    </button>
                                );
                            })}
                        </nav>

                        <div className={styles.layoutToggle}>
                            <span className={styles.toggleLabel}>LAYOUT</span>
                            <div className={styles.toggleGroup}>
                                <button
                                    type="button"
                                    className={`${styles.viewBtn} ${layoutMode === "editorial" ? styles.activeView : ""}`}
                                    onClick={() => handleLayoutChange("editorial")}
                                >
                                    [ SPREAD ]
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.viewBtn} ${layoutMode === "archive" ? styles.activeView : ""}`}
                                    onClick={() => handleLayoutChange("archive")}
                                >
                                    [ ARCHIVE ]
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <div
                    ref={gridRef}
                    className={`${styles.productGrid} ${
                        layoutMode === "editorial" ? styles.editorialView : styles.archiveView
                    }`}
                >
                    {filteredItems.map((item) => (
                        <article
                            key={item.id}
                            className={`${styles.productCard} ${
                                selectedItem?.id === item.id ? styles.activeCard : ""
                            }`}
                            data-category={item.category}
                        >
                            <div className={styles.cardInner} onClick={() => setSelectedItem(item)}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                        unoptimized
                                        className={styles.cardImg}
                                    />

                                    <div className={styles.imageHeader}>
                                        <span className={styles.itemSku}>{item.sku}</span>
                                        <span className={styles.itemCategory}>{item.categoryLabel}</span>
                                    </div>

                                    <div className={styles.hoverDrawer}>
                                        <span className={styles.quickInspectText}>QUICK INSPECT +</span>
                                        <span className={styles.viewVolume}>{item.volume}</span>
                                    </div>
                                </div>

                                <div className={styles.cardDetails}>
                                    <div className={styles.titlePriceRow}>
                                        <h3 className={styles.cardTitle}>{item.title}</h3>
                                        <span className={styles.cardPrice}>{item.price}</span>
                                    </div>

                                    <p className={styles.cardRitualNotes}>{item.ritualNotes}</p>

                                    <div className={styles.cardFooter}>
                                        <span className={styles.originTag}>{item.origin}</span>
                                        <span className={styles.acquireText}>ACQUIRE →</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {selectedItem && (
                    <aside className={styles.slideDrawer} aria-live="polite">
                        <div className={styles.drawerBackdrop} onClick={() => setSelectedItem(null)} />
                        <div className={styles.drawerPanel}>
                            <header className={styles.drawerHeader}>
                                <div className={styles.drawerMeta}>
                                    <span>{selectedItem.sku}</span>
                                    <span className={styles.dividerDot}>•</span>
                                    <span>{selectedItem.categoryLabel}</span>
                                </div>
                                <button
                                    type="button"
                                    aria-label="Close panel"
                                    className={styles.closeDrawerBtn}
                                    onClick={() => setSelectedItem(null)}
                                >
                                    [ CLOSE ✕ ]
                                </button>
                            </header>

                            <div className={styles.drawerScrollable}>
                                <div className={styles.drawerImageWrapper}>
                                    <Image
                                        src={selectedItem.src}
                                        alt={selectedItem.alt}
                                        fill
                                        unoptimized
                                        className={styles.drawerImg}
                                    />
                                </div>

                                <div className={styles.drawerContent}>
                                    <div className={styles.drawerTitleRow}>
                                        <h3 className={styles.drawerTitle}>{selectedItem.title}</h3>
                                        <span className={styles.drawerPrice}>{selectedItem.price}</span>
                                    </div>

                                    <span className={styles.drawerVolume}>{selectedItem.volume}</span>

                                    <div className={styles.specSection}>
                                        <span className={styles.specLabel}>PROVENANCE & ORIGIN</span>
                                        <p className={styles.specValue}>{selectedItem.origin}</p>
                                    </div>

                                    <div className={styles.specSection}>
                                        <span className={styles.specLabel}>RITUAL APPLICATION</span>
                                        <p className={styles.specValue}>{selectedItem.ritualNotes}</p>
                                    </div>

                                    <div className={styles.specSection}>
                                        <span className={styles.specLabel}>BOTANICAL FORMULATION</span>
                                        <p className={styles.specValueMono}>{selectedItem.ingredients}</p>
                                    </div>

                                    <div className={styles.drawerActionBox}>
                                        <Link href={selectedItem.href} className={styles.acquireActionBtn}>
                                            <span>ADD TO SANCTUARY DISPENSARY</span>
                                            <span>{selectedItem.price}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                <footer className={styles.sectionFooter}>
                    <div className={styles.footerBorder} />
                    <div className={styles.footerRow}>
                        <div className={styles.purityBadge}>
                            <span className={styles.purityDot} />
                            <span>100% CLINICAL & BOTANICAL PURITY ASSURED</span>
                        </div>
                        <Link href="/" className={styles.archiveLink}>
                            <span>EXPLORE FULL ARCHIVE (40 OBJECTS)</span>
                            <span className={styles.arrow}>→</span>
                        </Link>
                    </div>
                </footer>
            </div>
        </section>
    );
}