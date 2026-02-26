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

    // Mobile detection — ref for synchronous reads in effects, state for re-rendering frame UI
    const isMobileRef = useRef(false);
    const [isMobile, setIsMobile] = useState(false);



    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0); // for the loading screen (optional)

    const [showWelcome, setShowWelcome] = useState(false);
    const [showContinueBtn, setShowContinueBtn] = useState(false); // Option 2: Delay button
    const [showInstructions, setShowInstructions] = useState(false);
    const [hasBypassedLoader, setHasBypassedLoader] = useState(false); // Controls GSAP scroll lock
    const [holdProgress, setHoldProgress] = useState(0); // Option 3: Hold-to-enter progress
    const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Initial check for returning visitors, scroll position reset, and mobile detection
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Force scroll to top on every load
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);

            // Set mobile flag once — drives image loading (ref) AND frame sizing (state)
            const mobile = window.innerWidth < 768;
            isMobileRef.current = mobile;
            setIsMobile(mobile);

            const visited = localStorage.getItem("lumina_visited");
            if (visited === "true") {
                setHasBypassedLoader(true);
            }
        }
    }, []);

    // Handle button delay logic when Welcome popup opens
    useEffect(() => {
        if (showWelcome) {
            const t = setTimeout(() => setShowContinueBtn(true), 1200); // 1.2s delay before continue appears
            return () => clearTimeout(t);
        } else {
            setShowContinueBtn(false); // Reset when closed
        }
    }, [showWelcome]);

    // Handle Hold-to-Enter logic mechanics
    const startHold = () => {
        if (holdIntervalRef.current) return;
        setHoldProgress(0);
        let progress = 0;
        holdIntervalRef.current = setInterval(() => {
            progress += 1; // +1 every 10ms = 100 in 1000ms (1 second hold time but ultra smooth)
            setHoldProgress(progress);
            if (progress >= 100) {
                if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
                setShowInstructions(false);
                setHasBypassedLoader(true);
                if (typeof window !== "undefined") {
                    localStorage.setItem("lumina_visited", "true");
                }
            }
        }, 10);
    };

    const stopHold = () => {
        if (holdIntervalRef.current) {
            clearInterval(holdIntervalRef.current);
            holdIntervalRef.current = null;
        }
        setHoldProgress(0); // Instantly drop if they let go 
    };

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

    // Loading Logic: Fast Initial Load (Phase 1) + Background Load (Phase 2)
    useEffect(() => {
        let isCancelled = false;
        let p1LoadedCount = 0;
        const phase1Total = 150; // Block UX to fetch the first 150 frames (~3 sec on 10Mbps)

        // Dynamically pick mobile or web asset folders — reads viewport width directly to avoid effect ordering race
        const suffix = (typeof window !== "undefined" && window.innerWidth < 768) ? '-mob' : '-web';

        const loadPhase1 = async () => {
            const promises = [];
            const loadImg = (src: string, arr: HTMLImageElement[], index: number) => {
                const img = new Image();
                img.src = src;
                const p = new Promise((resolve) => {
                    img.onload = () => {
                        p1LoadedCount++;
                        if (!isCancelled) setProgress(Math.min(100, Math.floor((p1LoadedCount / phase1Total) * 100)));
                        resolve(img);
                    };
                    img.onerror = () => {
                        p1LoadedCount++;
                        if (!isCancelled) setProgress(Math.min(100, Math.floor((p1LoadedCount / phase1Total) * 100))); // Resolve anyway to not deadlock
                        resolve(img);
                    };
                });
                arr[index] = img;
                return p;
            };

            // Act 1 (First 150 frames for deeper initial buffer)
            for (let i = 1; i <= phase1Total; i++) {
                promises.push(loadImg(`/assets/lumina${suffix}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`, act1Images.current, i - 1));
            }

            // Minimal 1500ms delay: Downloading 150 files naturally takes ~2-4s for most users. 
            // This 1.5s buffer simply guarantees the UI flash looks deliberate for Gigabit users.
            const minimumDelay = new Promise(resolve => setTimeout(resolve, 1500));

            await Promise.all([...promises, minimumDelay]);

            if (!isCancelled) {
                setProgress(100);
                setLoaded(true);
                renderCanvas(act1Images.current[0], canvas1Ref.current);

                // Check localStorage directly to prevent React state race conditions.
                const visited = typeof window !== "undefined" ? localStorage.getItem("lumina_visited") : null;
                if (visited !== "true") {
                    setShowWelcome(true);
                }

                // Immediately kick off background loading for the massive rest of the site silently
                loadPhase2();
            }
        };

        const loadPhase2 = () => {
            // Act 1 remaining
            for (let i = phase1Total + 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                img.src = `/assets/lumina${suffix}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
                act1Images.current[i - 1] = img;
            }
            // Act 2
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                img.src = `/assets/monolith${suffix}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
                act2Images.current[i - 1] = img;
            }
            // Act 3
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                img.src = `/assets/extrait${suffix}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
                act3Images.current[i - 1] = img;
            }
        };

        loadPhase1();

        return () => {
            isCancelled = true;
        };
    }, []);

    const renderCanvas = (img: HTMLImageElement | undefined, canvas: HTMLCanvasElement | null) => {
        if (!img || !img.complete || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        // Canvas display dimensions (CSS pixels, accounting for ctx.scale(dpr))
        const displayW = canvas.width / dpr;
        const displayH = canvas.height / dpr;

        // Image natural dimensions
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        // Object-fit: cover — crop source image to fill canvas without distortion
        const canvasRatio = displayW / displayH;
        const imgRatio = imgW / imgH;

        let sx = 0, sy = 0, sw = imgW, sh = imgH;

        if (imgRatio > canvasRatio) {
            // Image is wider than canvas ratio → crop sides
            sw = imgH * canvasRatio;
            sx = (imgW - sw) / 2;
        } else {
            // Image is taller than canvas ratio → crop top/bottom
            sh = imgW / canvasRatio;
            sy = (imgH - sh) / 2;
        }

        ctx.clearRect(0, 0, displayW, displayH);
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, displayW, displayH);
    };

    // CSS DOM mechanics to freeze user scrolling explicitly when onboarding popups are active without crashing GSAP
    useEffect(() => {
        if (showWelcome || showInstructions) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => { document.body.style.overflow = "auto"; };
    }, [showWelcome, showInstructions]);

    // Responsive handling based strictly on the parent container (not window.innerWidth)
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
                    onUpdate: (self) => {
                        const pill = document.querySelector("#floating-pill");
                        if (pill) {
                            if (self.progress > 0.98) {
                                pill.classList.add("animate-pill-glow");
                            } else {
                                pill.classList.remove("animate-pill-glow");
                            }
                        }
                    }
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

            // Fade IN the navbar background so logo doesn't clash with "The Alchemy" section (Time 28.5 to 30)
            tl.to(document.querySelector("#navbar-bg"), { opacity: 0.95, duration: 1.5, ease: "power2.inOut" }, 28.5);

            // Unfurl the floating pill at the bottom of the scroll animation (Time 29 to 30)
            tl.to(document.querySelector("#floating-pill"), {
                width: 220,
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                    const pill = document.querySelector("#floating-pill") as HTMLElement;
                    if (pill) pill.dataset.gsapExpanded = "true";
                },
                onReverseComplete: () => {
                    const pill = document.querySelector("#floating-pill") as HTMLElement;
                    if (pill) delete pill.dataset.gsapExpanded;
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
                <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-row items-center gap-1 lg:gap-1.5">
                        <img
                            src="/assets/new-logo.png"
                            alt="Lumina Icon"
                            className="w-10 h-10 lg:w-16 lg:h-16 object-contain brightness-0 invert"
                        />
                        <h1 className="font-style-script text-5xl lg:text-7xl capitalize font-normal text-white pt-2" style={{ fontFamily: "var(--font-style-script)" }}>
                            Lumina
                        </h1>
                    </div>

                    {/* Progress Bar & Percentage Number */}
                    <div className="flex flex-col items-center gap-2 w-48 lg:w-64 mt-4">
                        <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
                            <div
                                className="absolute top-0 left-0 h-full bg-white/80 transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between w-full font-degular text-[10px] uppercase tracking-[0.2em] text-white/40 pt-1">
                            <span>Initializing</span>
                            <span>{progress}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Onboarding Popup 1: Welcome (Blocks canvas, forces background loading time) */}
            <div
                className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-700 ease-out 
                ${showWelcome ? 'opacity-100 pointer-events-auto backdrop-blur-md bg-black/40' : 'opacity-0 pointer-events-none'}`}
            >
                <div className={`flex flex-col items-center justify-center max-w-md w-full p-10 border border-white/20 rounded-2xl bg-black/60 shadow-2xl transition-transform duration-700 delay-300 ${showWelcome ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}>
                    <h2 className="font-style-script text-white text-5xl mb-6">Welcome</h2>
                    <p className="font-degular text-white/70 text-center text-sm md:text-base leading-relaxed mb-10">
                        Experience the world of Lumina. A digital flagship exploring the intersection of modern luxury and olfactory art.
                    </p>
                    <button
                        onClick={() => {
                            setShowWelcome(false);
                            setTimeout(() => setShowInstructions(true), 600);
                        }}
                        className={`group relative w-full overflow-hidden rounded-full border border-white/30 px-8 py-3 transition-all duration-1000 hover:border-white ${showContinueBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                    >
                        <span className="relative z-10 font-degular uppercase tracking-[0.2em] text-xs text-white transition-colors group-hover:text-black">
                            Continue
                        </span>
                        <div className="absolute inset-0 z-0 h-full w-0 bg-white transition-all duration-500 ease-out group-hover:w-full"></div>
                    </button>
                </div>
            </div>

            {/* Onboarding Popup 2: Instruction */}
            <div
                className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-700 ease-out 
                ${showInstructions ? 'opacity-100 pointer-events-auto backdrop-blur-md bg-black/40' : 'opacity-0 pointer-events-none'}`}
            >
                <div className={`flex flex-col items-center justify-center max-w-md w-full p-10 border border-white/20 rounded-2xl bg-black/60 shadow-2xl transition-transform duration-700 ${showInstructions ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}>
                    <div className="w-12 h-20 border-2 border-white/50 rounded-full flex justify-center p-2 mb-8 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <div className="w-1.5 h-3 bg-white rounded-full animate-bounce"></div>
                    </div>
                    <h2 className="font-degular font-bold uppercase tracking-[0.3em] text-white text-xl md:text-2xl mb-4 text-center animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                        Keep Scrolling
                    </h2>
                    <p className="font-degular text-white/50 text-center text-sm mb-10">
                        This is a continuous scrollytelling experience. Scroll downwards at your own pace to explore the collection.
                    </p>

                    {/* Hold to Enter Button */}
                    <div className="flex flex-col items-center gap-6 mt-4">
                        <button
                            onMouseDown={startHold}
                            onMouseUp={stopHold}
                            onMouseLeave={stopHold}
                            onTouchStart={startHold}
                            onTouchEnd={stopHold}
                            className={`group relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 outline-none select-none border border-white/20 ${holdProgress > 0 ? 'scale-95 bg-white/5' : 'hover:scale-105 hover:bg-white/5'}`}
                        >
                            {/* Progress Ring */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="48"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.8)"
                                    strokeWidth="2"
                                    style={{
                                        strokeDasharray: "301.6",
                                        strokeDashoffset: 301.6 - (301.6 * Math.min(holdProgress, 100)) / 100,
                                    }}
                                    className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                />
                            </svg>

                            {/* Abstract Minimal Target Icon */}
                            <svg viewBox="0 0 24 24" fill="none" className={`w-8 h-8 transition-colors duration-300 ${holdProgress > 0 ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]' : 'text-white/40 group-hover:text-white/80'}`} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="12" cy="12" r="1" fill="currentColor" />
                            </svg>
                        </button>

                        <div className="h-4">
                            <span className={`font-degular uppercase text-[10px] transition-all duration-300 whitespace-nowrap ${holdProgress > 0 ? 'opacity-100 text-white tracking-[0.3em]' : 'opacity-40 text-white tracking-[0.2em]'}`}>
                                {holdProgress > 0 ? 'Authenticating...' : 'Hold to Enter'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollytelling Container (Only fade in once loaded) */}
            <div
                ref={containerRef}
                className={`relative w-full h-[100dvh] bg-[#0B0C10] overflow-hidden flex items-center justify-center p-4 lg:p-8 pt-16 lg:pt-16 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
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

                    {/* === PREMIUM AMBIENT ICONS — xl+ only, fill empty side/top/bottom space around frame === */}
                    {/* SAFE ZONES: avoid top-left (logo) and bottom-right (portfolio pill) */}

                    {/* TOP RIGHT: Fine astrolabe / compass rose — away from logo */}
                    <div className="absolute top-12 right-20 hidden 2xl:block opacity-[0.13] text-white">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.5">
                            <circle cx="32" cy="32" r="30" />
                            <circle cx="32" cy="32" r="20" />
                            <circle cx="32" cy="32" r="10" />
                            <circle cx="32" cy="32" r="1.5" fill="currentColor" />
                            {/* Cardinal tick marks */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                                const r = Math.PI * deg / 180;
                                const x1 = 32 + 30 * Math.sin(r);
                                const y1 = 32 - 30 * Math.cos(r);
                                const x2 = 32 + (i % 2 === 0 ? 24 : 27) * Math.sin(r);
                                const y2 = 32 - (i % 2 === 0 ? 24 : 27) * Math.cos(r);
                                return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={i % 2 === 0 ? "0.8" : "0.4"} />;
                            })}
                            {/* Arrow pointing north */}
                            <polygon points="32,4 30,18 32,16 34,18" fill="currentColor" fillOpacity="0.5" />
                        </svg>
                    </div>

                    {/* BOTTOM LEFT: Crystal prism refraction — away from portfolio pill */}
                    <div className="absolute bottom-12 left-20 hidden 2xl:block opacity-[0.11] text-white">
                        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" stroke="currentColor" strokeWidth="0.5">
                            {/* Prism triangle */}
                            <polygon points="29,4 54,48 4,48" />
                            {/* Inner structure */}
                            <line x1="29" y1="4" x2="29" y2="48" />
                            <line x1="16" y1="26" x2="42" y2="26" />
                            {/* Refraction rays from base */}
                            <line x1="14" y1="48" x2="4" y2="56" strokeWidth="0.3" />
                            <line x1="22" y1="48" x2="14" y2="58" strokeWidth="0.3" />
                            <line x1="36" y1="48" x2="44" y2="58" strokeWidth="0.3" />
                            <line x1="44" y1="48" x2="54" y2="56" strokeWidth="0.3" />
                            {/* Apex dot */}
                            <circle cx="29" cy="4" r="1.5" fill="currentColor" />
                        </svg>
                    </div>

                    {/* MID LEFT EDGE: Fine signal oscilloscope — xl+ only, positioned ABOVE the left column (not overlapping KEEP SCROLLING) */}
                    <div className="absolute left-16 top-[22%] hidden 2xl:flex flex-row items-center gap-3 opacity-[0.12] text-white">
                        <svg width="24" height="32" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="0.5">
                            <path d="M12 0 L12 6 L4 12 L12 18 L20 12 L12 6" strokeLinecap="round" />
                            <path d="M12 18 L12 32" strokeDasharray="2 2" />
                        </svg>
                        <span className="font-degular text-[7px] uppercase tracking-[0.4em] text-white">SIGNAL</span>
                    </div>

                    {/* MID RIGHT EDGE: Fine molecular chain — xl+ only, positioned at 75% height (away from pill in bottom-right) */}
                    <div className="absolute right-16 top-[70%] hidden 2xl:flex flex-row items-center gap-3 opacity-[0.12] text-white">
                        <span className="font-degular text-[7px] uppercase tracking-[0.4em] text-white">CHAIN</span>
                        <svg width="48" height="16" viewBox="0 0 48 16" fill="none" stroke="currentColor" strokeWidth="0.5">
                            <circle cx="6" cy="8" r="4" />
                            <line x1="10" y1="8" x2="16" y2="8" />
                            <circle cx="20" cy="8" r="4" />
                            <line x1="24" y1="8" x2="28" y2="8" />
                            <circle cx="32" cy="8" r="4" />
                            <line x1="36" y1="8" x2="40" y2="8" />
                            <circle cx="44" cy="8" r="3" />
                            <circle cx="6" cy="8" r="1.5" fill="currentColor" />
                        </svg>
                    </div>

                    {/* === 2XL+ ULTRAWIDE FILLERS (1536px+ / ~20" screens) — lightweight SVGs to fill empty margins === */}

                    {/* TOP CENTER-LEFT: Delicate starburst */}
                    <div className="absolute top-10 left-[30%] hidden 2xl:block opacity-[0.08] text-white">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="0.4">
                            <line x1="18" y1="0" x2="18" y2="36" />
                            <line x1="0" y1="18" x2="36" y2="18" />
                            <line x1="5" y1="5" x2="31" y2="31" />
                            <line x1="5" y1="31" x2="31" y2="5" />
                            <circle cx="18" cy="18" r="6" />
                            <circle cx="18" cy="18" r="1.5" fill="currentColor" />
                        </svg>
                    </div>

                    {/* TOP CENTER-RIGHT: Fine concentric rings */}
                    <div className="absolute top-8 right-[30%] hidden 2xl:block opacity-[0.07] text-white">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.3">
                            <circle cx="20" cy="20" r="18" strokeDasharray="3 3" />
                            <circle cx="20" cy="20" r="12" />
                            <circle cx="20" cy="20" r="6" strokeDasharray="2 2" />
                            <circle cx="20" cy="20" r="1" fill="currentColor" />
                        </svg>
                    </div>

                    {/* BOTTOM CENTER: Fine waveform line */}
                    <div className="absolute bottom-8 left-[40%] hidden 2xl:block opacity-[0.08] text-white">
                        <svg width="120" height="20" viewBox="0 0 120 20" fill="none" stroke="currentColor" strokeWidth="0.4">
                            <path d="M0 10 L10 10 L15 3 L20 17 L25 10 L35 10 L40 3 L45 17 L50 10 L60 10 L65 3 L70 17 L75 10 L85 10 L90 3 L95 17 L100 10 L120 10" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* LEFT VERTICAL STRIP: Grid dots column — 2xl only */}
                    <div className="absolute left-8 top-[15%] hidden 2xl:flex flex-col gap-8 opacity-[0.06] text-white">
                        {[0, 1, 2, 3, 4].map(i => (
                            <svg key={i} width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                                <circle cx="3" cy="3" r="1.5" />
                            </svg>
                        ))}
                    </div>

                    {/* RIGHT VERTICAL STRIP: Grid dots column — 2xl only */}
                    <div className="absolute right-8 top-[15%] hidden 2xl:flex flex-col gap-8 opacity-[0.06] text-white">
                        {[0, 1, 2, 3, 4].map(i => (
                            <svg key={i} width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                                <circle cx="3" cy="3" r="1.5" />
                            </svg>
                        ))}
                    </div>

                    {/* BOTTOM-LEFT AREA: Fine latitude line — 2xl only */}
                    <div className="absolute bottom-[20%] left-8 hidden 2xl:flex items-center gap-2 opacity-[0.07] text-white">
                        <div className="w-16 h-[1px] bg-white/30" />
                        <span className="font-degular text-[7px] uppercase tracking-[0.3em]">E 002° 20'</span>
                    </div>

                    {/* TOP-RIGHT AREA: Fine timestamp — 2xl only */}
                    <div className="absolute top-[25%] right-8 hidden 2xl:flex items-center gap-2 opacity-[0.07] text-white">
                        <span className="font-degular text-[7px] uppercase tracking-[0.3em]">ISO 9001</span>
                        <div className="w-12 h-[1px] bg-white/30" />
                    </div>

                    {/* Left Column Fillers */}
                    <div className="flex flex-col items-center justify-between h-[60%] my-auto opacity-30">
                        {/* Top Crosshair */}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
                            <path d="M6 0V12M0 6H12" />
                        </svg>

                        {/* Center Scroll Text */}
                        <div className="flex flex-col items-center gap-6">
                            <span
                                className="font-degular tracking-[0.5em] text-[10px] text-white uppercase animate-scroll-flicker"
                                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                            >
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

                {/* Frame: portrait 9:16 on mobile (with padding), landscape 16:9 on desktop. Both use CSS min() to never overflow. */}
                <div
                    className="relative rounded-xl lg:rounded-2xl bg-black overflow-hidden z-30"
                    style={isMobile ? {
                        width: "min(calc(100vw - 32px), calc((100dvh - 96px) * 9 / 16))",
                        height: "min(calc(100dvh - 96px), calc((100vw - 32px) * 16 / 9))",
                    } : {
                        width: "min(1120px, calc(100vw - 32px), calc((100vh - 64px) * 16 / 9))",
                        height: "min(630px, calc(100vh - 64px), calc((100vw - 32px) * 9 / 16))",
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
                        {/* Top Left: REC */}
                        <div className="absolute top-3 left-4 lg:top-5 lg:left-6 flex items-center gap-2">
                            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-red-500 rounded-full animate-rec-flicker"></div>
                            <span className="font-degular font-bold text-white tracking-widest text-sm lg:text-base selection:bg-transparent shadow-black drop-shadow-md">REC</span>
                        </div>

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
