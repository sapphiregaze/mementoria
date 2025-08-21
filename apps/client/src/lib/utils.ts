import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initials(name: string | undefined | null) {
  if (!name || typeof name !== "string") {
    return "";
  }
  const nameParts = name.trim().split(/\s+/);
  const initials = nameParts.map((word) => word[0].toUpperCase());
  return initials.join("");
}
