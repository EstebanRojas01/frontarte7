// app/components/detalle-pelicula.tsx
"use client";

import { DetallePelicula } from "../peliculas/page"; // Importa el type

type Props = {
    pelicula: DetallePelicula;
};

export default function DetallePelicula({ pelicula }: Props) {
    return (
        <div style={{ display: "grid", gap: "1.5rem", maxHeight: "70vh", overflowY: "auto" }}>
            {/* Poster */}
            <img
                src={pelicula.poster}
                alt={pelicula.title}
                style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
            />

            {/* Datos básicos */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", padding: "1rem", background: "rgba(15,23,42,0.6)", borderRadius: "12px" }}>
                <div><strong>Fecha:</strong> {new Date(pelicula.releaseDate).toLocaleDateString()}</div>
                <div><strong>Duración:</strong> {pelicula.duration} min</div>
                <div><strong>País:</strong> {pelicula.country}</div>
                <div><strong>Popularidad:</strong> {pelicula.popularity}</div>
                <div><strong>Género:</strong> {pelicula.genre?.type || "N/A"}</div>
            </div>

            {/* Director */}
            {pelicula.director && (
                <section>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Director</h3>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <img src={pelicula.director.photo} alt={pelicula.director.name} style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
                        <div>
                            <strong>{pelicula.director.name}</strong> • {pelicula.director.nationality}
                        </div>
                    </div>
                </section>
            )}

            {/* Actores */}
            <section>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Actores ({pelicula.actors.length})</h3>
                <ul style={{ paddingLeft: "1.2rem" }}>
                    {pelicula.actors.map((actor) => (
                        <li key={actor.id} style={{ marginBottom: "0.4rem" }}>
                            {actor.name} ({actor.nationality})
                        </li>
                    ))}
                </ul>
            </section>

            {/* Plataformas */}
            {pelicula.platforms?.length && (
                <section>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Plataformas</h3>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        {pelicula.platforms.map((platform) => (
                            <a key={platform.id} href={platform.url} target="_blank" rel="noopener noreferrer" style={{ padding: "0.4rem 0.8rem", background: "#22c55e", color: "#0f172a", borderRadius: "20px", textDecoration: "none" }}>
                                {platform.name}
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* Trailer */}
            {pelicula.youtubeTrailer && (
                <section>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Trailer</h3>
                    <a href={pelicula.youtubeTrailer.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "0.6rem 1.2rem", background: "#ef4444", color: "white", borderRadius: "25px", textDecoration: "none" }}>
                        ▶ {pelicula.youtubeTrailer.name}
                    </a>
                </section>
            )}

            {/* Reviews */}
            {pelicula.reviews?.length && (
                <section>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Reseñas</h3>
                    <div style={{ display: "grid", gap: "0.75rem" }}>
                        {pelicula.reviews.slice(0, 2).map((review) => (
                            <div key={review.id} style={{ padding: "0.75rem", background: "rgba(30,41,59,0.5)", borderRadius: "8px" }}>
                                <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{review.creator} ⭐{review.score}</div>
                                <p style={{ margin: 0, fontSize: "0.9rem" }}>{review.text.slice(0, 100)}...</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
