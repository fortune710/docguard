'use client'

import React from "react";
import Link from "next/link";
import { Categories, ICategoryItem } from "@/utils/categories"; 


const CategoryItem: React.FC<Omit<ICategoryItem, 'name'>> = ({ label, href, ...rest }) => {
    return (
        <li>
            <Link className="text-center w-full h-full" href={href}>
                <div className="flex items-center justify-center rounded-lg bg-white shadow border border-muted h-20 w-20">
                    <rest.icon/>
                </div>
                <p>{label}</p>
            </Link>
        </li>
    )
}

const CategoryItemList = () => {
    return (
        <ul className="flex items-center gap-3">
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