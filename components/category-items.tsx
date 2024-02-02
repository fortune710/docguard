'use client'

import { FiUser } from "react-icons/fi";
import { FaMoneyBill } from "react-icons/fa6"
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IconType } from "react-icons";
import React from "react";
import Link from "next/link";

interface ICategoryItem {
    label: string,
    name: string,
    icon: any,
    href: string
}

const Categories: ICategoryItem[] = [
    { name: "personal", label: "Personal", icon:<FiUser/>, href: "/documents" },
    { name: "finance", label: "Finance", icon: <FaMoneyBill/>, href: "/documents" },
    { name: "health", label: "Health", icon: <MdOutlineHealthAndSafety/>, href: "/documents" }
]


const CategoryItem: React.FC<Omit<ICategoryItem, 'name'>> = ({ label, icon, href }) => {
    return (
        <li>
            <Link className="text-center w-full h-full" href={href}>
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-slate-300">
                    {icon}
                </div>
                <p>{label}</p>
            </Link>
        </li>
    )
}

const CategoryItemList = () => {
    return (
        <ul className="flex items-center gap-2">
            {
                Categories.map((category) => (
                    <CategoryItem
                        key={category.name}
                        {...category}
                    />
                ))
            }

        </ul>
    )
}

export default CategoryItemList;