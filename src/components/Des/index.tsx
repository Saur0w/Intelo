"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface ShowreelProps {
    videoSrc?: string;
    captionSrc?: string;
    onPlayClick?: () => void;
}

export default function Showreel({
                                     videoSrc = "https://player.vimeo.com/progressive_redirect/playback/915632870/rendition/1080p/file.mp4?loc=external",
                                     captionSrc,
                                     onPlayClick
                                 }: ShowreelProps) {
    const containerRef = useRef<HTMLElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const container = containerRef.current;
            const cursor = cursorRef.current;
            const video = videoRef.current;
            const title = titleRef.current;
            if (!container || !cursor) return;

            // 1. Force play muted video on load
            if (video) {
                video.muted = true;
                video.play().catch(() => {
                    // Browser policy fallback
                });
            }

            // 2. Parallax on ScrollTrigger
            if (video) {
                gsap.fromTo(
                    video,
                    { yPercent: -15, scale: 1.18 },
                    {
                        yPercent: 15,
                        scale: 1.05,
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.6,
                            invalidateOnRefresh: true
                        }
                    }
                );
            }

            if (title) {
                gsap.to(title, {
                    yPercent: -40,
                    opacity: 0.35,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top center",
                        end: "bottom top",
                        scrub: 0.6
                    }
                });
            }

            // 3. Rejouice-style Mouse Follower
            gsap.set(cursor, {
                xPercent: -50,
                yPercent: -50,
                scale: 0,
                autoAlpha: 0
            });

            const xSetter = gsap.quickTo(cursor, "x", {
                duration: 0.5,
                ease: "power3.out"
            });
            const ySetter = gsap.quickTo(cursor, "y", {
                duration: 0.5,
                ease: "power3.out"
            });

            const handleMouseMove = (e: MouseEvent) => {
                const bounds = container.getBoundingClientRect();
                const mouseX = e.clientX - bounds.left;
                const mouseY = e.clientY - bounds.top;

                xSetter(mouseX);
                ySetter(mouseY);
            };

            const handleMouseEnter = () => {
                gsap.to(cursor, {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.35,
                    ease: "power3.out"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(cursor, {
                    scale: 0,
                    autoAlpha: 0,
                    duration: 0.3,
                    ease: "power3.in"
                });
            };

            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                container.removeEventListener("mousemove", handleMouseMove);
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className={styles.showreelSection}
            onClick={onPlayClick}
        >
            {/* Background Video with Parallax Container */}
            <div className={styles.videoWrapper}>
                <video
                    ref={videoRef}
                    className={styles.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    src={videoSrc}
                >
                    {captionSrc && (
                        <track
                            kind="captions"
                            src={captionSrc}
                            srcLang="en-US"
                            label="English"
                            default
                        />
                    )}
                </video>
                <div className={styles.videoOverlay} />
            </div>

            {/* Centered Showreel Heading */}
            <div className={styles.content}>
                <h2 ref={titleRef} className={styles.title}>
                    Showreel
                </h2>
            </div>

            {/* Custom Mouse Follower Badge */}
            <div ref={cursorRef} className={styles.customCursor}>
                <span className={styles.playIcon}>▶</span>
                <span className={styles.playText}>Play Reel</span>
            </div>
        </section>
    );
}