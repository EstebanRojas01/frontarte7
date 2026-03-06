"use client";

import Link from "next/link";

export default function HomePage() {
    return (
        <main
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Fondo animado */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: "radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120,219,255,0.3) 0%, transparent 50%)",
                    animation: "float 6s ease-in-out infinite",
                    zIndex: 1,
                }}
            />

            <section
                style={{
                    background: "rgba(15, 23, 42, 0.95)",
                    backdropFilter: "blur(20px)",
                    padding: "3.5rem 2.5rem",
                    borderRadius: "24px",
                    minWidth: "380px",
                    maxWidth: "560px",
                    width: "100%",
                    textAlign: "center",
                    boxShadow: "0 25px 60px rgba(15,23,42,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        width: "90px",
                        height: "90px",
                        background: "linear-gradient(135deg, #3b82f6, #10b981, #f59e0b)",
                        borderRadius: "24px",
                        margin: "0 auto 1.8rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.2rem",
                        fontWeight: "bold",
                        color: "white",
                        boxShadow: "0 15px 40px rgba(59,130,246,0.5)",
                    }}
                >
                    🎥
                </div>

                <h1
                    style={{
                        fontSize: "2.8rem",
                        fontWeight: "800",
                        background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #f1f5f9 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        margin: "0 0 1.2rem 0",
                        letterSpacing: "-0.03em",
                    }}
                >
                    FrontArte7
                </h1>

                <p
                    style={{
                        fontSize: "1.15rem",
                        margin: "0 0 2.8rem",
                        color: "#cbd5e1",
                        lineHeight: 1.6,
                        maxWidth: "90%",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    Plataforma completa para cine: gestiona películas, actores y más.
                </p>

                <nav
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1.2rem",
                        marginBottom: "1rem",
                    }}
                >
                    <Link
                        href="/peliculas"
                        style={{
                            padding: "1.2rem 1.5rem",
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            color: "white",
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "1rem",
                            boxShadow: "0 12px 35px rgba(59,130,246,0.4)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.transform = "translateY(-4px)";
                            el.style.boxShadow = "0 20px 50px rgba(59,130,246,0.6)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.transform = "translateY(0)";
                            el.style.boxShadow = "0 12px 35px rgba(59,130,246,0.4)";
                        }}
                    >
                        🎬 Películas
                    </Link>

                    <Link
                        href="/actors"
                        style={{
                            padding: "1.2rem 1.5rem",
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            color: "white",
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "1rem",
                            boxShadow: "0 12px 35px rgba(16,185,129,0.4)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.transform = "translateY(-4px)";
                            el.style.boxShadow = "0 20px 50px rgba(16,185,129,0.6)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.transform = "translateY(0)";
                            el.style.boxShadow = "0 12px 35px rgba(16,185,129,0.4)";
                        }}
                    >
                        👥 Actores
                    </Link>
                </nav>

                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <Link
                        href="/crear-pelicula"
                        style={{
                            padding: "1.1rem 2rem",
                            borderRadius: "16px",
                            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                            color: "white",
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "1rem",
                            boxShadow: "0 12px 35px rgba(139,92,246,0.4)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.transform = "translateY(-3px)";
                            el.style.boxShadow = "0 18px 45px rgba(139,92,246,0.6)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.transform = "translateY(0)";
                            el.style.boxShadow = "0 12px 35px rgba(139,92,246,0.4)";
                        }}
                    >
                        ➕ Crear Película
                    </Link>

                    <Link
                        href="/crear"
                        style={{
                            padding: "1.1rem 2rem",
                            borderRadius: "16px",
                            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                            color: "white",
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "1rem",
                            boxShadow: "0 12px 35px rgba(245,158,11,0.4)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.transform = "translateY(-3px)";
                            el.style.boxShadow = "0 18px 45px rgba(245,158,11,0.6)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.transform = "translateY(0)";
                            el.style.boxShadow = "0 12px 35px rgba(245,158,11,0.4)";
                        }}
                    >
                        👤 Crear Actor
                    </Link>
                </nav>

                <p style={{ marginTop: "2.5rem", fontSize: "0.85rem", color: "#64748b" }}>
                    Powered by Next.js 13+ • App Router • TypeScript
                </p>
            </section>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-15px) rotate(1deg); }
                    66% { transform: translateY(-5px) rotate(-1deg); }
                }
            `}</style>
        </main>
    );
}

