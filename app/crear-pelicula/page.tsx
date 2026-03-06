"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Actor = {
    name: string;
    photo: string;
    nationality: string;
    birthDate: string;
    biography: string;
};

type Platform = {
    name: string;
    url: string;
};

type Review = {
    text: string;
    score: number;
    creator: string;
};

type YoutubeTrailer = {
    name: string;
    url: string;
    duration: number;
    channel: string;
};

// 🆕 NUEVO TIPO PARA PREMIOS
type Prize = {
    name: string;
    organization: string;
};

export default function CrearPeliculaPage() {
    const router = useRouter();

    // Datos principales de la película
    const [formData, setFormData] = useState({
        title: "",
        poster: "",
        duration: "",
        country: "",
        releaseDate: "",
        popularity: "",
    });

    // Director
    const [director, setDirector] = useState({
        name: "",
        photo: "",
        nationality: "",
        birthDate: "",
        biography: "",
    });

    // Listas múltiples
    const [actors, setActors] = useState<Actor[]>([]);
    const [newActor, setNewActor] = useState<Actor>({
        name: "", photo: "", nationality: "", birthDate: "", biography: ""
    });
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [newPlatform, setNewPlatform] = useState<Platform>({ name: "", url: "" });
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState<Review>({ text: "", score: 0, creator: "" });
    const [youtubeTrailer, setYoutubeTrailer] = useState<YoutubeTrailer>({
        name: "", url: "", duration: 0, channel: ""
    });

    // 🆕 NUEVO ESTADO PARA PREMIOS
    const [prizes, setPrizes] = useState<Prize[]>([]);
    const [newPrize, setNewPrize] = useState<Prize>({ name: "", organization: "" });

    // Género
    const [genre, setGenre] = useState("");

    const genres = ["Drama", "Comedia", "Acción", "Terror", "Ciencia Ficción", "Romance", "Suspenso"];

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addActor = () => {
        if (newActor.name && newActor.photo) {
            setActors([...actors, { ...newActor }]);
            setNewActor({ name: "", photo: "", nationality: "", birthDate: "", biography: "" });
        }
    };

    const removeActor = (index: number) => {
        setActors(actors.filter((_, i) => i !== index));
    };

    const addPlatform = () => {
        if (newPlatform.name && newPlatform.url) {
            setPlatforms([...platforms, { ...newPlatform }]);
            setNewPlatform({ name: "", url: "" });
        }
    };

    const removePlatform = (index: number) => {
        setPlatforms(platforms.filter((_, i) => i !== index));
    };

    const addReview = () => {
        if (newReview.text && newReview.creator) {
            setReviews([...reviews, { ...newReview }]);
            setNewReview({ text: "", score: 0, creator: "" });
        }
    };

    const removeReview = (index: number) => {
        setReviews(reviews.filter((_, i) => i !== index));
    };

    // 🆕 FUNCIONES PARA PREMIOS
    const addPrize = () => {
        if (newPrize.name && newPrize.organization) {
            setPrizes([...prizes, { ...newPrize }]);
            setNewPrize({ name: "", organization: "" });
        }
    };

    const removePrize = (index: number) => {
        setPrizes(prizes.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // 1. Crear película con TODOS los datos incluyendo premios
            const movieRes = await fetch("http://localhost:3000/api/v1/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.title,
                    poster: formData.poster,
                    duration: Number(formData.duration),
                    country: formData.country,
                    releaseDate: formData.releaseDate,
                    popularity: Number(formData.popularity) || 0,
                    genre,
                    platforms,
                    reviews,
                    youtubeTrailer,
                    prizes, // 🆕 PREMIOS incluidos en la película
                }),
            });
            const movie = await movieRes.json();
            const movieId = movie.id;

            // 2. Crear director
            if (director.name) {
                await fetch("http://localhost:3000/api/v1/directors", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(director),
                });
            }

            // 3. Crear actores
            for (const actor of actors) {
                await fetch("http://localhost:3000/api/v1/actors", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(actor),
                });
            }

            // 🆕 4. Crear premios
            for (const prize of prizes) {
                await fetch("http://localhost:3000/api/v1/prizes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(prize),
                });
            }

            router.push("/peliculas");
        } catch (error) {
            console.error("Error creating movie:", error);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                            Nueva Película
                        </h1>
                        <p className="text-xl text-slate-300 max-w-md mx-auto">
                            Completa todos los datos para crear una entrada completa
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Datos Principales */}
                        <Section title="Información Principal" icon="🎬">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Título"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Duración (minutos)"
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => handleInputChange('duration', e.target.value)}
                                    required
                                />
                                <Input
                                    label="País"
                                    value={formData.country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Popularidad (1-5)"
                                    type="number"
                                    min={1} max={5}
                                    value={formData.popularity}
                                    onChange={(e) => handleInputChange('popularity', e.target.value)}
                                />
                                <div className="md:col-span-2">
                                    <Input
                                        label="URL del Póster"
                                        type="url"
                                        value={formData.poster}
                                        onChange={(e) => handleInputChange('poster', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        label="Fecha de Lanzamiento"
                                        type="date"
                                        value={formData.releaseDate}
                                        onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Género
                                    </label>
                                    <select
                                        className="input-field"
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                    >
                                        <option value="">Seleccionar género</option>
                                        {genres.map(g => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </Section>

                        {/* Director */}
                        <Section title="Director" icon="🎭">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input label="Nombre" value={director.name} onChange={(e) => setDirector({...director, name: e.target.value})} />
                                <Input label="Nacionalidad" value={director.nationality} onChange={(e) => setDirector({...director, nationality: e.target.value})} />
                                <Input label="URL Foto" type="url" value={director.photo} onChange={(e) => setDirector({...director, photo: e.target.value})} />
                                <Input label="Fecha Nacimiento" type="date" value={director.birthDate} onChange={(e) => setDirector({...director, birthDate: e.target.value})} />
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Biografía</label>
                                    <textarea
                                        className="input-field h-24 resize-vertical"
                                        value={director.biography}
                                        onChange={(e) => setDirector({...director, biography: e.target.value})}
                                        placeholder="Biografía del director..."
                                    />
                                </div>
                            </div>
                        </Section>

                        {/* Actores */}
                        <MultiSection
                            title="Actores"
                            icon="👥"
                            items={actors}
                            newItem={newActor}
                            onAdd={addActor}
                            onRemove={removeActor}
                            onNewItemChange={setNewActor}
                            fields={[
                                { key: 'name', label: 'Nombre', required: true },
                                { key: 'photo', label: 'URL Foto', type: 'url', required: true },
                                { key: 'nationality', label: 'Nacionalidad' },
                                { key: 'birthDate', label: 'Fecha Nacimiento', type: 'date' },
                            ]}
                        />

                        {/* Plataformas */}
                        <MultiSection
                            title="Plataformas"
                            icon="📱"
                            items={platforms}
                            newItem={newPlatform}
                            onAdd={addPlatform}
                            onRemove={removePlatform}
                            onNewItemChange={setNewPlatform}
                            fields={[
                                { key: 'name', label: 'Nombre', required: true },
                                { key: 'url', label: 'URL', type: 'url', required: true },
                            ]}
                        />

                        {/* 🆕 NUEVA SECCIÓN DE PREMIOS */}
                        <MultiSection
                            title="Premios"
                            icon="🏆"
                            items={prizes}
                            newItem={newPrize}
                            onAdd={addPrize}
                            onRemove={removePrize}
                            onNewItemChange={setNewPrize}
                            fields={[
                                { key: 'name', label: 'Nombre del Premio', required: true },
                                { key: 'organization', label: 'Organización', required: true },
                            ]}
                        />

                        {/* Tráiler Youtube */}
                        <Section title="Tráiler YouTube" icon="▶️">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Nombre del Tráiler"
                                    value={youtubeTrailer.name}
                                    onChange={(e) => setYoutubeTrailer({...youtubeTrailer, name: e.target.value})}
                                />
                                <Input
                                    label="URL del Video"
                                    type="url"
                                    value={youtubeTrailer.url}
                                    onChange={(e) => setYoutubeTrailer({...youtubeTrailer, url: e.target.value})}
                                />
                                <Input
                                    label="Duración (segundos)"
                                    type="number"
                                    value={youtubeTrailer.duration}
                                    onChange={(e) => setYoutubeTrailer({...youtubeTrailer, duration: Number(e.target.value)})}
                                />
                                <Input
                                    label="Canal"
                                    value={youtubeTrailer.channel}
                                    onChange={(e) => setYoutubeTrailer({...youtubeTrailer, channel: e.target.value})}
                                />
                            </div>
                        </Section>

                        {/* Reseñas */}
                        <MultiSection
                            title="Reseñas"
                            icon="⭐"
                            items={reviews}
                            newItem={newReview}
                            onAdd={addReview}
                            onRemove={removeReview}
                            onNewItemChange={setNewReview}
                            fields={[
                                { key: 'creator', label: 'Creador', required: true },
                                { key: 'score', label: 'Puntuación (1-5)', type: 'number', min: 1, max: 5, required: true },
                            ]}
                        >
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Texto de la reseña</label>
                                <textarea
                                    className="input-field h-24 resize-vertical"
                                    value={newReview.text}
                                    onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                                    placeholder="Escribe la reseña..."
                                    required
                                />
                            </div>
                        </MultiSection>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
                            <button
                                type="button"
                                onClick={() => router.push("/peliculas")}
                                className="flex-1 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl transition-all duration-300 font-medium text-slate-200 backdrop-blur-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 rounded-2xl transition-all duration-300 font-semibold text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                            >
                                ✨ Crear Película
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

// Componentes reutilizables (SIN CAMBIOS)
function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                {icon} {title}
            </h2>
            {children}
        </div>
    );
}

type Field = {
    key: string;
    label: string;
    type?: string;
    min?: number;
    max?: number;
    required?: boolean;
};

interface MultiSectionProps<T> {
    title: string;
    icon: string;
    items: T[];
    newItem: any;
    onAdd: () => void;
    onRemove: (index: number) => void;
    onNewItemChange: (item: any) => void;
    fields: Field[];
    children?: React.ReactNode;
}

function MultiSection<T>({ title, icon, items, newItem, onAdd, onRemove, onNewItemChange, fields, children }: MultiSectionProps<T>) {
    return (
        <Section title={title} icon={icon}>
            <div className="space-y-4">
                {/* Lista de items existentes */}
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                            <span className="font-medium text-slate-200">
                                {item[fields[0].key as keyof T] as string}
                            </span>
                            <button
                                type="button"
                                onClick={() => onRemove(index)}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* Formulario para nuevo item */}
                <div className="bg-gradient-to-r from-white/5 to-white/2 p-6 rounded-2xl border border-dashed border-white/20">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        {fields.map((field) => (
                            <Input
                                key={field.key}
                                label={field.label}
                                type={field.type}
                                value={newItem[field.key] || ''}
                                onChange={(e) => onNewItemChange({ ...newItem, [field.key]: e.target.value })}
                                min={field.min}
                                max={field.max}
                                required={field.required}
                            />
                        ))}
                    </div>
                    {children}
                    <button
                        type="button"
                        onClick={onAdd}
                        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-emerald-500/80 to-teal-500/80 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-medium text-white transition-all duration-300"
                        disabled={!newItem[fields[0].key]}
                    >
                        ➕ Añadir {title.toLowerCase()}
                    </button>
                </div>
            </div>
        </Section>
    );
}

function Input({ label, type = "text", value, onChange, required, min, max }: {
    label: string;
    type?: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    required?: boolean;
    min?: number;
    max?: number;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
                {label} {required && <span className="text-rose-400">*</span>}
            </label>
            <input
                type={type}
                className="input-field"
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                required={required}
            />
        </div>
    );
}
