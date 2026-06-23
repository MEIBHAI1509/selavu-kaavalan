"use client";

import { Bell, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { authService } from "@/services/auth.service";

export default function Topbar() {
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    await authService.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div>
          <h1 className="text-xl font-semibold">
            Welcome Back 👋
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your finances efficiently
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-border p-2 hover:bg-accent">
            <Bell size={18} />
          </button>

          <button
            className="rounded-xl border border-border p-2 hover:bg-accent"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-border p-2 hover:bg-accent"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}