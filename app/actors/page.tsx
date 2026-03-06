"use client";

import { useEffect, useState } from "react";
import ActorsList from "../components/actorsList";

type Actor = {
    id: number;
    name: string;
    photo: string;
    nationality: string;
    birthday: string;
    biography: string;
};

export default function ActorsPage() {
    const [actors, setActors] = useState<Actor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <p>Cargando actores...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Lista de actores</h1>
            <ActorsList actors={actors} />
        </main>
    );
}
