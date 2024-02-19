'use client'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Categories } from "@/utils/categories";
import { FaChevronDown } from "react-icons/fa6";
import { StringParam, useQueryParam, withDefault } from "use-query-params";


const CategoryDropdown: React.FC = () => {
    const [category, setCategory] = useQueryParam<string>('filter', withDefault(StringParam, 'all'));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-2">
                    <h1 className='capitalize'>
                        { category === 'all' ? category + ' documents' : category }
                    </h1>
                    <FaChevronDown/>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Categories
                </DropdownMenuLabel>
                
                <DropdownMenuCheckboxItem 
                    checked={category === 'all'} 
                    onClick={() => setCategory('all')}
                >
                    All Documents
                </DropdownMenuCheckboxItem>
                {
                    Categories.map(({ name, label }) => (
                    <DropdownMenuCheckboxItem 
                        onClick={() => setCategory(name)}
                        checked={category === name}
                    >
                        { label }
                    </DropdownMenuCheckboxItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default CategoryDropdown;