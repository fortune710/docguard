import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { twMerge } from "tailwind-merge"
import { ChangeEvent } from "react"

interface SearchbarProps extends Partial<Pick<React.HTMLProps<HTMLInputElement>, 'disabled'|'value'|'onChange'|'className'>> {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => any
}


export default function Searchbar(props: SearchbarProps) {
    return (
        <form className="w-full">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search documents..."
                    className={twMerge("w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3", props.className ?? "")}
                    disabled={props.disabled}
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        </form>

    )
}