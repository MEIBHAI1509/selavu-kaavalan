import {
    Utensils,
    Car,
    ShoppingCart,
    Pill,
    Plane,
    Receipt,
    GraduationCap,
    Film,
  } from "lucide-react";
  
  export const categoryIcons = {
    food: Utensils,
    fuel: Car,
    shopping: ShoppingCart,
    medical: Pill,
    travel: Plane,
    bills: Receipt,
    education: GraduationCap,
    entertainment: Film,
  };
  
  export const categoryOptions = [
    { label: "Food", value: "food" },
    { label: "Fuel", value: "fuel" },
    { label: "Shopping", value: "shopping" },
    { label: "Medical", value: "medical" },
    { label: "Travel", value: "travel" },
    { label: "Bills", value: "bills" },
    { label: "Education", value: "education" },
    { label: "Entertainment", value: "entertainment" },
  ];