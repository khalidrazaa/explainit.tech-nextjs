"use client";

import { useRouter } from "next/navigation";
import { logout } from "../../../lib/services/auth";
import { useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </header>

      <p>Welcome! You are logged in.</p>
    </div>
  );
}