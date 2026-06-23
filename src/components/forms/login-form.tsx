"use client";

import { useState } from "react";
import { authService } from "@/services/auth.service";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const { error } =
      await authService.signIn(
        email,
        password
      );

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/dashboard";
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4"
    >
      <input
        className="w-full rounded-lg border p-3"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        className="w-full rounded-lg border p-3"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        className="w-full rounded-lg bg-primary p-3 text-white"
      >
        Login
      </button>

      <button
        type="button"
        onClick={() =>
          authService.signInWithGoogle()
        }
        className="w-full rounded-lg border p-3"
      >
        Continue with Google
      </button>
    </form>
  );
}