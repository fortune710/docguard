'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Categories } from "@/utils/categories";

const CategorySelect: React.FC = () => {
    return (
        <Select name="category">
            <SelectTrigger name="category">
                <SelectValue className="mt-1" placeholder='Select Category'/>
            </SelectTrigger>
            <SelectContent>
                {
                    Categories.map((category) => (
                        <SelectItem value={category.name}>
                            {category.label}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}

export default CategorySelect;