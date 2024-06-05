import Link from "next/link";
import NewCardButton from "./new-card-button";
import CategoryItemList from "@/components/category-items";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import RecentlyAddedDocuments from "@/components/documents/recently-added";
import CardsStack from "./cards-stack";
import ExpringDocuments from "./expiring-documents";
import CardGroup from "@/components/card/card-group";
import SearchModal from "../search/search-modal";

interface MobileHomeViewProps {
    userId: string;
}

export default function MobileHomeView({ userId }: MobileHomeViewProps) {
    
    return (
        <>
            <SearchModal userId={userId}/>

            <section className="w-full mt-4">
                <div className="w-full flex items-center justify-between mb-1">
                    <h3 className="font-semibold">My Cards</h3>
                    <Link href='/documents?filter=all'>See More</Link>
                </div>

                <CardGroup userId={userId}/>

            </section>
        
            <section className="grid grid-cols-2 w-full my-3 gap-3">
                <ExpringDocuments/>
            </section>      

            <section  className="w-full mt-4">
                <div className="w-full flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-xl">My Uploads</h3>
                    <Link href='/documents?filter=all'>See More</Link>
                </div>

                <CategoryItemList/>
            </section>

            <section className="py-5 pb-20">
                <RecentlyAddedDocuments/>
            </section>
        </>
    )
}