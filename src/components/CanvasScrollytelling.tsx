"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TOTAL_FRAMES = 240;

export default function CanvasScrollytelling() {
    const containerRef = useRef<HTMLDivElement>(null);

    const canvas1Ref = useRef<HTMLCanvasElement>(null);
    const canvas2Ref = useRef<HTMLCanvasElement>(null);
    const canvas3Ref = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);



    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0); // for the loading screen (optional)
    const [frameBounds, setFrameBounds] = useState({ width: "100%", height: "100%" });

    // We store Image objects in refs to persist across renders without trigerring react state
    const act1Images = useRef<HTMLImageElement[]>([]);
    const act2Images = useRef<HTMLImageElement[]>([]);
    const act3Images = useRef<HTMLImageElement[]>([]);

    // Frame tracking objects for GSAP to animate
    const frames = useRef({
        act1: 1,
        act2: 1,
        act3: 1,
    });

    // Loading Logic Phase 1, 2, 3
    useEffect(() => {
        let isCancelled = false;

        const loadInitial60 = async () => {
            const promises = [];
            for (let i = 1; i <= 60; i++) {
                const img = new Image();
                img.src = `/assets/lumina-web/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
                promises.push(
                    new Promise((resolve) => {
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(img); // resolve anyway to not block
                    })
                );
                act1Images.current[i - 1] = img;
            }

            await Promise.all(promises);

            if (!isCancelled) {
                setLoaded(true); // Phase 2: dismiss loader
                // Draw the first frame immediately
                renderCanvas(act1Images.current[0], canvas1Ref.current);
                loadRest(); // Phase 3: load the rest in background
            }
        };

        const loadRest = async () => {
            // Act 1 remaining
            for (let i = 61; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                img.src = `/assets/lumina-web/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
                act1Images.current[i - 1] = img;
            }
            // Act 2
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                img.src = `/assets/monolith-web/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
                act2Images.current[i - 1] = img;
            }
            // Act 3
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                img.src = `/assets/extrait-web/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
                act3Images.current[i - 1] = img;
            }
        };

        loadInitial60();

        return () => {
            isCancelled = true;
        };
    }, []);

    const renderCanvas = (img: HTMLImageElement | undefined, canvas: HTMLCanvasElement | null) => {
        if (!img || !img.complete || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

        // "Contain" / Letterbox logic
        if (canvasRatio > imgRatio) {
            // Screen is wider than image (add black bars on left/right)
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
            offsetY = 0;
            offsetX = (canvasWidth - drawWidth) / 2;
        } else {
            // Screen is taller than image (add black bars on top/bottom)
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        }

        // Sync the frame's CSS size to EXACTLY match the drawn image
        // (convert from Dpr-scaled pixel sizes back to CSS sizes)
        const dpr = window.devicePixelRatio || 1;
        setFrameBounds({
            width: `${drawWidth / dpr}px`,
            height: `${drawHeight / dpr}px`
        });

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Resize handling with devicePixelRatio for high-quality rendering
    useEffect(() => {
        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            [canvas1Ref, canvas2Ref, canvas3Ref].forEach((ref) => {
                const canvas = ref.current;
                if (canvas) {
                    const rect = canvas.parentElement?.getBoundingClientRect();
                    if (rect) {
                        // Set actual size in memory (scaled to account for extra pixel density)
                        canvas.width = rect.width * dpr;
                        canvas.height = rect.height * dpr;

                        // Normalize coordinate system to use css pixels
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            ctx.scale(dpr, dpr);
                        }
                    }
                }
            });
            // Re-render current frames on resize using layout dimensions
            renderCanvas(act1Images.current[Math.max(0, Math.round(frames.current.act1) - 1)], canvas1Ref.current);
            renderCanvas(act2Images.current[Math.max(0, Math.round(frames.current.act2) - 1)], canvas2Ref.current);
            renderCanvas(act3Images.current[Math.max(0, Math.round(frames.current.act3) - 1)], canvas3Ref.current);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useGSAP(
        () => {
            if (!loaded) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=1200%", // 1200vh of scrolling for slower, smoother frame rate
                    scrub: 1,
                    pin: true,
                },
            });

            // --- OVERLAPPING CONTINUOUS SCROLL LOGIC ---

            // ACT 1 logic (Time 0 to 12)
            tl.to(
                frames.current,
                {
                    act1: TOTAL_FRAMES,
                    snap: "act1",
                    ease: "none",
                    duration: 12,
                    onUpdate: () => renderCanvas(act1Images.current[Math.max(0, Math.round(frames.current.act1) - 1)], canvas1Ref.current),
                },
                0
            );

            // Crossfade 1 -> 2 (Starts fading out Act 1 at Time 9, fades in Act 2 at Time 9, finishes crossfade at Time 12)
            // By doing this while Act 1's frames are still updating, it looks like a continuous transforming video
            tl.to(canvas1Ref.current, { opacity: 0, duration: 3, ease: "none" }, 9);
            tl.to(canvas2Ref.current, { opacity: 1, duration: 3, ease: "none" }, 9);

            // ACT 2 logic (Time 9 to 21) - Act 2 starts playing frames AS it is fading in
            tl.to(
                frames.current,
                {
                    act2: TOTAL_FRAMES,
                    snap: "act2",
                    ease: "none",
                    duration: 12,
                    onUpdate: () => renderCanvas(act2Images.current[Math.max(0, Math.round(frames.current.act2) - 1)], canvas2Ref.current),
                },
                9
            );

            // Crossfade 2 -> 3 (Time 18 to 21)
            tl.to(canvas2Ref.current, { opacity: 0, duration: 3, ease: "none" }, 18);
            tl.to(canvas3Ref.current, { opacity: 1, duration: 3, ease: "none" }, 18);

            // ACT 3 logic (Time 18 to 30) - Act 3 starts playing AS it is fading in
            tl.to(
                frames.current,
                {
                    act3: TOTAL_FRAMES,
                    snap: "act3",
                    ease: "none",
                    duration: 12,
                    onUpdate: () => renderCanvas(act3Images.current[Math.max(0, Math.round(frames.current.act3) - 1)], canvas3Ref.current),
                },
                18
            );

            // Header is initially opacity-0. It will ONLY fade in right before footer appears.

            // Fade out the premium frame and text at the very end (Time 27 to 30) so it disappears before the footer
            tl.to([frameRef.current, textRef.current], { opacity: 0, duration: 3, ease: "power2.inOut" }, 27);

            // Fade the global header back in right before footer appears (Time 28.5)
            tl.to(document.querySelector("#global-header"), { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 28.5);

            // Unfurl the floating pill at the bottom of the scroll animation (Time 29 to 30)
            tl.to(document.querySelector("#floating-pill"), {
                width: 220,
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(document.querySelector("#floating-pill"), {
                        boxShadow: "0px 0px 15px 5px rgba(255,255,255,0.3)",
                        borderColor: "rgba(255,255,255,0.6)",
                        duration: 0.8,
                        yoyo: true,
                        repeat: -1,
                        ease: "power1.inOut"
                    });
                },
                onReverseComplete: () => {
                    gsap.killTweensOf(document.querySelector("#floating-pill"));
                    gsap.set(document.querySelector("#floating-pill"), { boxShadow: "none", borderColor: "rgba(255,255,255,0.1)" });
                }
            }, 29);
            tl.to(document.querySelector("#floating-pill-text"), {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out"
            }, 29);

        },
        { dependencies: [loaded], scope: containerRef }
    );

    return (
        <>
            {/* Loading Screen */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0B0C10] text-[#FFFFFF] transition-opacity duration-1000 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <div className="flex flex-col items-center gap-6">
                    <h1 className="font-cursive text-6xl lg:text-7xl capitalize font-normal text-white">
                        Lumina
                    </h1>
                    {/* Elegant loading line expanding outward */}
                    <div className="relative w-32 h-[1px] bg-white/10 overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-white/60 animate-[loadingLine_2s_ease-in-out_infinite]"></div>
                    </div>
                    <p className="font-degular text-xs uppercase tracking-[0.4em] text-white/40">
                        Initializing Experience
                    </p>
                </div>
            </div>

            {/* Scrollytelling Container (Only fade in once loaded) */}
            <div
                ref={containerRef}
                className={`relative w-full h-[100dvh] bg-[#0B0C10] overflow-hidden flex items-center justify-center p-4 lg:p-8 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            >

                {/* Edge Typography & Architectural Marks (Visible only on wider screens) */}
                <div ref={textRef} className="absolute inset-0 hidden lg:flex items-center justify-between px-10 pointer-events-none z-40 transition-opacity duration-700">

                    {/* Brand Logo Removed - Placed in Header */}

                    {/* Architectural Framing Corners */}
                    <svg className="absolute top-10 right-10 w-8 h-8 opacity-30 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M4 4h16v16" />
                        <circle cx="20" cy="4" r="1.5" fill="currentColor" />
                    </svg>
                    <svg className="absolute bottom-10 left-10 w-8 h-8 opacity-30 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M20 20H4V4" />
                        <circle cx="4" cy="20" r="1.5" fill="currentColor" />
                    </svg>
                    <svg className="absolute bottom-10 right-10 w-8 h-8 opacity-30 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M4 20h16V4" />
                        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
                    </svg>

                    {/* Left Column Fillers */}
                    <div className="flex flex-col items-center justify-between h-[60%] my-auto opacity-30">
                        {/* Top Crosshair */}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
                            <path d="M6 0V12M0 6H12" />
                        </svg>

                        {/* Center Scroll Text */}
                        <div className="flex flex-col items-center gap-6">
                            <span className="font-degular tracking-[0.5em] text-[10px] text-white uppercase" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                                KEEP SCROLLING
                            </span>
                            <div className="w-[1px] h-16 bg-white/30 rounded-full"></div>
                        </div>

                        {/* Bottom Diamond */}
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white mt-10">
                            <rect x="4" y="0.5" width="4.95" height="4.95" transform="rotate(45 4 0.5)" />
                        </svg>
                    </div>

                    {/* Right Column Fillers */}
                    <div className="flex flex-col items-center justify-between h-[60%] my-auto opacity-30">
                        {/* Top Star/Asterisk */}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
                            <path d="M6 1V11M1 6H11M2.5 2.5L9.5 9.5M2.5 9.5L9.5 2.5" />
                        </svg>

                        {/* Center Coordinate/Arrow */}
                        <div className="flex flex-col items-center gap-6">
                            <span className="font-degular tracking-[0.3em] text-[10px] text-white" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                                N 48° 52' 5"
                            </span>
                            {/* Custom animated trailing line for arrow */}
                            <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden rounded-full">
                                <div className="absolute top-0 left-0 w-full h-[50%] bg-white animate-[scrollLine_2s_ease-in-out_infinite]"></div>
                            </div>
                        </div>

                        {/* Bottom Crosshair */}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white mt-10">
                            <path d="M6 0V12M0 6H12" />
                        </svg>
                    </div>
                </div>

                {/* The actual bounded wrapper that matches the frame precisely */}
                <div
                    className="relative rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 ease-out z-30"
                    style={{
                        width: frameBounds.width,
                        height: frameBounds.height,
                        // Provide sensible max bounds
                        maxWidth: "1400px",
                        maxHeight: "100%"
                    }}
                >

                    {/* Premium Frame Overlay (sits top-level inside the bound to cast inset shadows over the video) */}
                    <div
                        ref={frameRef}
                        className="absolute inset-0 border border-white/10 z-50 pointer-events-none rounded-xl lg:rounded-2xl transition-opacity duration-700"
                        style={{
                            boxShadow: "inset 0 0 100px 20px rgba(11,12,16, 0.9), inset 0 0 60px 10px rgba(0,0,0,0.8)"
                        }}
                    >
                        {/* Decorative Corner Marks */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30 rounded-tl-xl lg:rounded-tl-2xl"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30 rounded-tr-xl lg:rounded-tr-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30 rounded-bl-xl lg:rounded-bl-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30 rounded-br-xl lg:rounded-br-2xl"></div>
                    </div>

                    {/* ACT 3: EXTRAIT */}
                    <canvas
                        ref={canvas3Ref}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 z-10"
                    />

                    {/* ACT 2: MONOLITH */}
                    <canvas
                        ref={canvas2Ref}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 z-20"
                    />

                    {/* ACT 1: LUMINA */}
                    <canvas
                        ref={canvas1Ref}
                        className="absolute inset-0 w-full h-full object-cover opacity-100 z-40"
                    />

                </div>
            </div>
        </>
    );
}
