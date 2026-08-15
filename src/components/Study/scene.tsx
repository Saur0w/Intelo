"use client";

import { Suspense, useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { aboutVertexShader, aboutFragmentShader } from "@/lib/Shaders";

function ShaderMesh({ src }: { src: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const texture = useTexture(src);
    const [hovered, setHover] = useState(false);
    const lastScrollY = useRef(0);
    const targetVelocity = useRef(0);
    const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

    const { viewport } = useThree();

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uHover: { value: 0.0 },
        uTime: { value: 0.0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uScrollVelocity: { value: 0.0 }
    }), [texture]);

    useEffect(() => {
        lastScrollY.current = window.scrollY;
    }, []);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

            const targetHover = hovered ? 1.0 : 0.0;
            materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uHover.value,
                targetHover,
                delta * 5
            );

            materialRef.current.uniforms.uMouse.value.lerp(targetMouse.current, delta * 5);
            const currentScrollY = window.scrollY;
            targetVelocity.current = (currentScrollY - lastScrollY.current) * 0.005;
            lastScrollY.current = currentScrollY;

            materialRef.current.uniforms.uScrollVelocity.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uScrollVelocity.value,
                targetVelocity.current,
                0.1
            );
        }
    });

    return (
        <mesh
            ref={meshRef}
            scale={[viewport.width * 0.7, viewport.height * 0.8, 1]}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => {
                setHover(false);
                targetMouse.current.set(0.5, 0.5);
            }}
            onPointerMove={(e) => {
                if (e.uv) {
                    targetMouse.current.copy(e.uv);
                }
            }}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={aboutVertexShader}
                fragmentShader={aboutFragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export function Scene({ src }: { src: string; alt: string }) {
    return (
        <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
            <Canvas camera={{ position: [0, 0, 0.86] }} dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <ShaderMesh src={src} />
                </Suspense>
            </Canvas>
        </div>
    );
}