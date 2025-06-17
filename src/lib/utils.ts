import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateMovieSlug(title: string, year: number, id: number): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-')    // Replace spaces with hyphens
    .replace(/-+/g, '-');    // Replace multiple hyphens with single hyphen
  return `${baseSlug}-${year}-${id}`;
}
