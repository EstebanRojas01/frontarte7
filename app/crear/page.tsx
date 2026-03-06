"use client";

import ActorForm, { ActorFormData } from "../components/actorForm";

export default function CrearActorPage() {
    const handleCreate = (data: ActorFormData) => {
        console.log("Crear actor:", data);
        // después: POST al backend y redirigir a /actors
    };

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Crear actor</h1>
            <ActorForm onSubmit={handleCreate} />
        </main>
    );
}
