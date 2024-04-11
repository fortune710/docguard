'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Categories } from "@/utils/categories";
import { Filter, ListFilter } from "lucide-react";
import { FaChevronDown } from "react-icons/fa6";
import { StringParam, useQueryParam, withDefault } from "use-query-params";


const CategoryDropdown: React.FC = () => {
    const [category, setCategory] = useQueryParam<string>('filter', withDefault(StringParam, 'all'));
    const isMobile = useMediaQuery('(max-width: 640px)');

    return (
        <>
            {
                !isMobile  ? 
                <div className="flex items-center justify-between w-full mb-4">
                    <Tabs defaultValue="all" className="w-[400px]">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger onClick={() => setCategory('all')} value="all">
                                    All
                                </TabsTrigger>
                                {
                                    Categories.map(({ name, label }) => (
                                        <TabsTrigger onClick={() => setCategory(name)} key={name} value={name}>
                                            {label}
                                        </TabsTrigger>
                                    ))
                                }
                            </TabsList>
                        </div>
                    </Tabs>
                    
                    <div>
                        <Button className="bg-white shadow-sm text-black border border-muted">
                            <ListFilter/>
                            Filter
                        </Button>
                    </div>
                </div>
                :
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
                                key={name}
                                onClick={() => setCategory(name)}
                                checked={category === name}
                            >
                                { label }
                            </DropdownMenuCheckboxItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>

            }
        
        </>

    )
}

export default CategoryDropdown;