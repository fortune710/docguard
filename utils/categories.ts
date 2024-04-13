import { SquareUser, Landmark, HeartPulse, LucideIcon } from "lucide-react"

export interface ICategoryItem {
    label: string,
    name: string,
    icon: LucideIcon,
    href: string
}

export const Categories: ICategoryItem[] = [
    { name: "personal", label: "Personal", icon: SquareUser, href: "/documents?filter=personal" },
    { name: "finance", label: "Finance", icon: Landmark, href: "/documents?filter=finance" },
    { name: "health", label: "Health", icon: HeartPulse, href: "/documents?filter=health" }
];

export type Category = typeof Categories[number]['name']
