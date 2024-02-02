import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Urbanist } from "next/font/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const urbanist = Urbanist({
  subsets: ["latin"],
  variable: '--font-urbanist'
})


