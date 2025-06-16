"use client";

import ErrorMessage from "@/components/reusable/ErrorMessage";
import Loading from "@/components/reusable/Loading";
import StatsList from "@/components/StatsList/StatsList";
import { useEffect, useState } from "react";

type Stats = Record<string, number>;

export default function Home() {
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://country-tracker-api.vercel.app/";

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_URL}/stats`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const trackVisit = async () => {
    try {
      await fetch(`${API_URL}/track`, { method: "POST" });
      fetchStats();
    } catch (err) {
      console.error("Failed to track visit:", err);
    }
  };

  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">🌍 Country Visit Tracker</h1>

      {error && <ErrorMessage message={error} />}
      {loading ? <Loading /> : <StatsList stats={stats} />}
    </main>
  );
}
