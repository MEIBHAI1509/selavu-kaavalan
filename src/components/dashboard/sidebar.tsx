"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { sidebarItems } from "@/constants/sidebar";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 lg:hidden">
        <h1 className="font-tamil text-lg font-bold text-primary">
          செலவுக்காவலன்
        </h1>

        <Sheet>
          <SheetTrigger asChild>
            <button>
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0">
            <MobileSidebar pathname={pathname} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r bg-card lg:block">
        <DesktopSidebar pathname={pathname} />
      </aside>
    </>
  );
}

function DesktopSidebar({
  pathname,
}: {
  pathname: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <h1 className="font-tamil text-2xl font-bold text-primary">
          செலவுக்காவலன்
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Expense Guardian
        </p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  <Icon size={20} />

                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function MobileSidebar({
  pathname,
}: {
  pathname: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <h1 className="font-tamil text-2xl font-bold text-primary">
          செலவுக்காவலன்
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Expense Guardian
        </p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  <Icon size={20} />

                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}