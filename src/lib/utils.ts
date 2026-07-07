import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "EUR") {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatSignedCurrency(value: number, currency = "EUR") {
  const segno = value >= 0 ? "+" : "−";
  const formattato = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.abs(value));
  return `${segno}${formattato}`;
}

export function formatSignedPercent(value: number, decimali = 2) {
  const segno = value >= 0 ? "+" : "−";
  const formattato = Math.abs(value).toLocaleString("it-IT", {
    minimumFractionDigits: decimali,
    maximumFractionDigits: decimali,
  });
  return `${segno}${formattato}%`;
}
