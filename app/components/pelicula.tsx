"use client";

export type Pelicula = {
    id: string;
    title: string;
    poster: string;
    duration: number;
    country: string;
    releaseDate: string;
    popularity: number;
    actors?: { id: string; name: string }[];
    prizes?: { id: string; name: string }[];
};

type Props = {
    movie: Pelicula;
    onVerDetalle: (movie: Pelicula) => void;
};

export default function PeliculaCard({ movie, onVerDetalle }: Props) {
    const actorName = movie.actors?.[0]?.name ?? "Sin actor";
    const prizeName = movie.prizes?.[0]?.name ?? "Sin premio";

    return (
        <article
            style={{
                border: "1px solid #374151",
                borderRadius: "10px",
                padding: "1rem",
                display: "flex",
                gap: "1rem",
                backgroundColor: "#050816",
                alignItems: "center",
            }}
        >
            <img
                src={movie.poster}
                alt={movie.title}
                style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                }}
            />
            <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0 }}>{movie.title}</h2>
                <p style={{ margin: "0.25rem 0", fontSize: "0.9rem", opacity: 0.9 }}>
                    Lanzamiento: {movie.releaseDate.slice(0, 10)}
                </p>
                <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                    Actor: {actorName}
                </p>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>Premio: {prizeName}</p>
            </div>
            <button
                onClick={() => onVerDetalle(movie)}
                style={{
                    padding: "0.4rem 0.8rem",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                }}
            >
                Ver detalle
            </button>
        </article>
    );
}
