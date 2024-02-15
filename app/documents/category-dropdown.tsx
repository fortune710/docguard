'use client'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Categories } from "@/utils/categories";
import { FaCaretDown, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa6";


const CategoryDropdown: React.FC = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-2">
                    <h1>Documents</h1>
                    <FaChevronDown/>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Categories
                </DropdownMenuLabel>
                {
                    Categories.map((category) => (
                    <DropdownMenuCheckboxItem>
                        { category.label }
                    </DropdownMenuCheckboxItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default CategoryDropdown;