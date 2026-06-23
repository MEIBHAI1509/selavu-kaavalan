import {
    LayoutDashboard,
    Wallet,
    Tags,
    Receipt,
    PiggyBank,
    Goal,
    Repeat,
    BarChart3,
    User,
  } from "lucide-react";
  
  export const sidebarItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Wallets",
      href: "/wallets",
      icon: Wallet,
    },
    {
      title: "Categories",
      href: "/categories",
      icon: Tags,
    },
    {
      title: "Expenses",
      href: "/expenses",
      icon: Receipt,
    },
    {
      title: "Budgets",
      href: "/budgets",
      icon: PiggyBank,
    },
    {
      title: "Goals",
      href: "/goals",
      icon: Goal,
    },
    {
      title: "Recurring",
      href: "/recurring",
      icon: Repeat,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    },
  ];