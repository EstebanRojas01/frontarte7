"use client";

import { useEffect, useState } from "react";
import Emergente from "../components/emergente";
import PeliculaCard, { Pelicula } from "../components/pelicula";
import DetallePelicula from "../components/detalle-pelicula";


type Actor = {
    id: string;
    name: string;
    photo: string;
    nationality: string;
    birthDate: string;
    biography?: string;
};

type Director = {
    id: string;
    name: string;
    photo: string;
    nationality: string;
    birthDate: string;
    biography?: string;
};

type Genre = { id: string; type: string };
type Platform = { id: string; name: string; url: string };
type Review = { id: string; text: string; score: number; creator: string };
type Trailer = { id: string; name: string; url: string; duration: number; channel: string };

type DetallePelicula = {
    id: string;
    title: string;
    synopsis?: string;
    poster: string;
    releaseDate: string;
    duration: number;
    country: string;
    popularity: number;
    director?: Director;
    actors: Actor[];
    genre?: Genre;
    platforms?: Platform[];
    reviews?: Review[];
    youtubeTrailer?: Trailer;
};

export default function PeliculasPage() {
    const [movies, setMovies] = useState<Pelicula[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [detalle, setDetalle] = useState<DetallePelicula | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/v1/movies");
                if (!res.ok) throw new Error("Error cargando películas");
                const data = await res.json();
                setMovies(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        if (selectedId) {
            fetch(`http://localhost:3000/api/v1/movies/${selectedId}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Película no encontrada");
                    return res.json();
                })
                .then((data: DetallePelicula) => setDetalle(data))
                .catch((err: Error) => {
                    console.error(err);
                    setDetalle(null);
                });
        }
    }, [selectedId]);

    if (loading) return <main style={{ padding: "2rem" }}>Cargando películas...</main>;
    if (error) return <main style={{ padding: "2rem" }}>Error: {error}</main>;

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Películas</h1>

            <div style={{ display: "grid", gap: "1rem" }}>
                {movies.map((movie) => (
                    <PeliculaCard
                        key={movie.id}
                        movie={movie}
                        onVerDetalle={() => setSelectedId(movie.id.toString())}
                    />
                ))}
            </div>

            <Emergente
                isOpen={!!detalle}
                title={detalle?.title || "Cargando..."}
                onClose={() => {
                    setSelectedId(null);
                    setDetalle(null);
                }}
            >
                {detalle && <DetallePelicula pelicula={detalle} />}
            </Emergente>
        </main>
    );
}
