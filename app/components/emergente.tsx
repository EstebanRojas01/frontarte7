"use client";

import type { ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    title?: string;
    children: ReactNode;
    onClose: () => void;
};

export default function Emergente({ isOpen, title, children, onClose }: ModalProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            onClick={handleBackdropClick}
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
            }}
        >
            <div
                style={{
                    backgroundColor: "#111",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    minWidth: "320px",
                    maxWidth: "480px",
                }}
            >
                {title && <h2>{title}</h2>}
                {children}
                <button
                    onClick={onClose}
                    style={{
                        marginTop: "0.5rem",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor: "#6b7280",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
