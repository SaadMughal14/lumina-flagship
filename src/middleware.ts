import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // --- Content Security Policy ---
    // Allows self, Google Fonts, inline styles (required by Next.js), and data: URIs for images.
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",              // Next.js requires inline scripts
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Tailwind + Google Fonts
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob:",
        "media-src 'self' blob:",
        "connect-src 'self'",
        "frame-src 'none'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
    ].join("; ");

    response.headers.set("Content-Security-Policy", csp);

    // --- Clickjacking Protection ---
    response.headers.set("X-Frame-Options", "DENY");

    // --- HTTPS Enforcement (2 years, with preload) ---
    response.headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload"
    );

    // --- MIME-Type Sniffing Prevention ---
    response.headers.set("X-Content-Type-Options", "nosniff");

    // --- Referrer Policy ---
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // --- Permissions Policy (deny sensitive APIs) ---
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    );

    // --- DNS Prefetch ---
    response.headers.set("X-DNS-Prefetch-Control", "on");

    return response;
}

// Apply to all routes
export const config = {
    matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
