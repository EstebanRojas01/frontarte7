"use client";

export type Actor = {
    id: string;
    name: string;
    photo: string;
    nationality: string;
    birthDate: string;
    biography: string;
};

type Props = {
    actors: Actor[];
    onEdit?: (actor: Actor) => void;
    onDelete?: (id: string) => void;
};

export default function Lista({ actors, onEdit, onDelete }: Props) {
    if (!actors.length) return <p>No hay actores registrados.</p>;

    return (
        <div style={{ display: "grid", gap: "1rem" }}>
            {actors.map((actor) => (
                <article
                    key={actor.id}
                    style={{
                        border: "1px solid #444",
                        borderRadius: "8px",
                        padding: "1rem",
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={actor.photo}
                        alt={actor.name}
                        style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "8px",
                        }}
                    />
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0 }}>{actor.name}</h2>
                        <p style={{ margin: "0.25rem 0" }}>
                            {actor.nationality} · {actor.birthDate.slice(0, 10)}
                        </p>
                        <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
                            {actor.biography}
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {onEdit && (
                            <button
                                onClick={() => onEdit(actor)}
                                style={{
                                    padding: "0.3rem 0.6rem",
                                    borderRadius: "4px",
                                    border: "none",
                                    backgroundColor: "#3b82f6",
                                    color: "white",
                                    cursor: "pointer",
                                }}
                            >
                                Editar
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(actor.id)}
                                style={{
                                    padding: "0.3rem 0.6rem",
                                    borderRadius: "4px",
                                    border: "none",
                                    backgroundColor: "#ef4444",
                                    color: "white",
                                    cursor: "pointer",
                                }}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}
