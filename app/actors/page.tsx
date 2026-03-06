"use client";

import { useEffect, useState } from "react";
import Lista, { Actor } from "../components/lista";
import Formulario, { ActorFormData } from "../components/formulario";
import Emergente from "../components/emergente";

export default function ActorsPage() {
    const [actors, setActors] = useState<Actor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingActor, setEditingActor] = useState<Actor | null>(null);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/v1/actors");
                if (!res.ok) throw new Error("Error al obtener actores");
                const data = await res.json();
                setActors(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchActors();
    }, []);

    const handleDelete = async (id: string) => {
        const ok = window.confirm("¿Seguro que deseas eliminar este actor?");
        if (!ok) return;

        try {
            const res = await fetch(`http://localhost:3000/api/v1/actors/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Error al eliminar actor");

            setActors((prev) => prev.filter((actor) => actor.id !== id));
        } catch (err) {
            console.error(err);
            alert("No se pudo eliminar el actor");
        }
    };

    const handleStartEdit = (actor: Actor) => {
        setEditingActor(actor);
    };

    const handleUpdate = async (data: ActorFormData) => {
        if (!editingActor) return;

        try {
            const res = await fetch(
                `http://localhost:3000/api/v1/actors/${editingActor.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: data.name,
                        photo: data.photo,
                        nationality: data.nationality,
                        birthDate: data.birthDate,
                        biography: data.biography,
                    }),
                }
            );

            if (!res.ok) throw new Error("Error al actualizar actor");

            const updated = await res.json();

            setActors((prev) =>
                prev.map((actor) => (actor.id === updated.id ? updated : actor))
            );

            setEditingActor(null);
        } catch (err) {
            console.error(err);
            alert("No se pudo actualizar el actor");
        }
    };

    if (loading) return <p>Cargando actores...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Actores</h1>

            <Lista
                actors={actors}
                onDelete={handleDelete}
                onEdit={handleStartEdit}
            />

            <Emergente
                isOpen={!!editingActor}
                title={editingActor ? `Editando: ${editingActor.name}` : ""}
                onClose={() => setEditingActor(null)}
            >
                {editingActor && (
                    <Formulario
                        initialData={{
                            name: editingActor.name,
                            photo: editingActor.photo,
                            nationality: editingActor.nationality,
                            birthDate: editingActor.birthDate.slice(0, 10),
                            biography: editingActor.biography,
                        }}
                        onSubmit={handleUpdate}
                    />
                )}
            </Emergente>
        </main>
    );
}
