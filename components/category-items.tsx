'use client'

import React from "react";
import Link from "next/link";
import { Categories, ICategoryItem } from "@/utils/categories"; 


const CategoryItem: React.FC<Omit<ICategoryItem, 'name'>> = ({ label, icon, href }) => {
    return (
        <li>
            <Link className="text-center w-full h-full" href={href}>
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-slate-300">
                    <>{icon}</>
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