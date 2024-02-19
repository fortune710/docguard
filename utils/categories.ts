import { FiUser } from "react-icons/fi";
import { FaMoneyBill } from "react-icons/fa6"
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IconType } from "react-icons";


export interface ICategoryItem {
    label: string,
    name: string,
    icon: IconType,
    href: string
}

export const Categories: ICategoryItem[] = [
    { name: "personal", label: "Personal", icon: FiUser, href: "/documents?filter=personal" },
    { name: "finance", label: "Finance", icon: FaMoneyBill, href: "/documents?filter=finance" },
    { name: "health", label: "Health", icon: MdOutlineHealthAndSafety, href: "/documents?filter=health" }
];

export type Category = typeof Categories[number]['name']
