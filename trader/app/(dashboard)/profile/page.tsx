"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/apiFetch";

export default function ProfilePage() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        async function loadProfile() {

            const response = await apiFetch("/api/auth/me");

            const data = await response.json();

            setUser(data);

        }

        loadProfile();

    }, []);

    return (
        <div className="grid">
            {JSON.stringify(user)}
        </div>
    );
}