"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

gsap.registerPlugin(SplitText);

interface PerspectiveTextProps {
    label: string;
}

export default function PerspectiveText({ label }: PerspectiveTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const text1Ref = useRef<HTMLParagraphElement>(null);
    const text2Ref = useRef<HTMLParagraphElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            if (!text1Ref.current || !text2Ref.current) return;

            const split1 = new SplitText(text1Ref.current, { type: "chars" });
            const split2 = new SplitText(text2Ref.current, { type: "chars" });

            gsap.set(split1.chars, { transformOrigin: "50% 100%" });
            gsap.set(split2.chars, {
                yPercent: 100,
                rotateX: -90,
                opacity: 0,
                transformOrigin: "50% 0%",
            });

            tlRef.current = gsap
                .timeline({ paused: true })
                .to(
                    split1.chars,
                    {
                        yPercent: -100,
                        rotateX: 90,
                        opacity: 0,
                        duration: 0.45,
                        ease: "power3.inOut",
                        stagger: 0.025,
                    },
                    0
                )
                .to(
                    split2.chars,
                    {
                        yPercent: 0,
                        rotateX: 0,
                        opacity: 1,
                        duration: 0.45,
                        ease: "power3.inOut",
                        stagger: 0.025,
                    },
                    0
                );

            return () => {
                split1.revert();
                split2.revert();
            };
        },
        { scope: containerRef }
    );

    const handleMouseEnter = () => tlRef.current?.play();
    const handleMouseLeave = () => tlRef.current?.reverse();

    return (
        <div
            ref={containerRef}
            className={styles.perspectiveText}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <p ref={text1Ref}>{label}</p>
            <p ref={text2Ref} className={styles.clone}>
                {label}
            </p>
        </div>
    );
}