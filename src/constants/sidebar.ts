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
  HandCoins,
  Settings,
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
    title: "Income",
    href: "/income",
    icon: HandCoins,
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
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  }
];