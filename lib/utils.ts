// Utility functions

import { type ClassValue, clsx } from "clsx";

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Uses clsx for conditional class joining.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
