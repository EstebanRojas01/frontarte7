"use client";

import Link from "next/link";

export default function HomePage() {
    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
            }}
        >
            <section
                style={{
                    backgroundColor: "#111",
                    padding: "2rem",
                    borderRadius: "12px",
                    minWidth: "320px",
                    maxWidth: "480px",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>FrontArte7</h1>
                <p style={{ marginTop: 0, marginBottom: "1.5rem", opacity: 0.8 }}>
                    Gestiona actores: crea, edita y elimina registros.
                </p>

                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                    }}
                >
                    <Link
                        href="/actors"
                        style={{
                            padding: "0.75rem 1rem",
                            borderRadius: "8px",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        Ver actores
                    </Link>

                    <Link
                        href="/crear"
                        style={{
                            padding: "0.75rem 1rem",
                            borderRadius: "8px",
                            backgroundColor: "#10b981",
                            color: "white",
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        Crear actor
                    </Link>
                </nav>
            </section>
        </main>
    );
}
