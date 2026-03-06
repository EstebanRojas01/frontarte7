"use client";

import { useState, useEffect } from "react";

export type ActorFormData = {
    name: string;
    photo: string;
    nationality: string;
    birthDate: string;
    biography: string;
};

type Props = {
    initialData?: ActorFormData;
    onSubmit: (data: ActorFormData) => void;
};

export default function Formulario({ initialData, onSubmit }: Props) {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [nationality, setNationality] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [biography, setBiography] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setPhoto(initialData.photo);
            setNationality(initialData.nationality);
            setBirthDate(initialData.birthDate);
            setBiography(initialData.biography);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, photo, nationality, birthDate, biography });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
                <label>Photo</label>
                <input value={photo} onChange={(e) => setPhoto(e.target.value)} />
            </div>

            <div>
                <label>Nacionalidad</label>
                <input
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                />
            </div>

            <div>
                <label>BirthDate</label>
                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
            </div>

            <div>
                <label>Biography</label>
                <textarea
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                />
            </div>

            <button type="submit">Guardar</button>
        </form>
    );
}
