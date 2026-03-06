"use client";

import { useRouter } from "next/navigation";
import Formulario, { ActorFormData } from "../components/formulario";

export default function CrearActorPage() {
    const router = useRouter();

    const handleCreate = async (data: ActorFormData) => {
        const res = await fetch("http://localhost:3000/api/v1/actors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                photo: data.photo,
                nationality: data.nationality,
                birthDate: data.birthDate,
                biography: data.biography,
            }),
        });

        router.push("/actors");
    };

    return (
        <main style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
            <section
                style={{
                    backgroundColor: "#111",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    minWidth: "320px",
                    maxWidth: "480px",
                    width: "100%",
                }}
            >
                <h1 style={{ marginTop: 0, marginBottom: "1rem" }}>Crear actor</h1>
                <Formulario onSubmit={handleCreate} />
            </section>
        </main>
    );
}
