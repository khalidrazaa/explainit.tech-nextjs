"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendOtp, verifyOtp } from '../../../lib/services/auth';

export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1️⃣ Send OTP
  async function handleSendOtp() {
    setLoading(true);
    setError("");

    try {
      const res = await sendOtp({ email });
      alert(res.message); // "OTP sent" message from backend
      setStep("otp");
    } catch (err: unknown) {
        if(err instanceof Error){
            setError(err.message || "Failed to send OTP");
        }else{
            setError("Failed to send OTP");
        }
      
    } finally {
      setLoading(false);
    }
  }

  // 2️⃣ Verify OTP
  async function handleVerifyOtp() {
    setLoading(true);
    setError("");

    try {
      const res = await verifyOtp({ email, otp });

      // ⚡ Save token (here using localStorage, but httpOnly cookie is more secure)
      localStorage.setItem("access_token", res.access_token);

      // Redirect to admin dashboard
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      if(err instanceof Error){
        setError(err.message || "Failed to verify OTP");
      }else{
        setError("Failed to verify OTP");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">Admin Login</h1>

        {error && (
          <div className="mb-3 rounded bg-red-100 p-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {step === "email" && (
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === "otp" && (
          <div>
            <label className="mb-2 block text-sm font-medium">OTP</label>
            <input
              type="text"
              className="w-full rounded border px-3 py-2"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="mt-4 w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}