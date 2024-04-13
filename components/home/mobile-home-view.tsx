import Link from "next/link";
import NewCardButton from "./new-card-button";
import CategoryItemList from "@/components/category-items";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import RecentlyAddedDocuments from "@/components/documents/recently-added";
import CardsStack from "./cards-stack";

interface MobileHomeViewProps {
    userId: string;
}

export default function MobileHomeView({ userId }: MobileHomeViewProps) {
    return (
        <>

            <section className="w-full mt-4">
                <div className="w-full flex items-center justify-between mb-1">
                    <h3 className="font-semibold">My Cards</h3>
                    <Link href='/documents?filter=all'>See More</Link>
                </div>

                <NewCardButton userId={userId}/>

            </section>
        
            <section className="grid grid-cols-2 w-full my-3 gap-3">
                <Card x-chunk="dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                        <CardDescription>Expired Documents</CardDescription>
                        <CardTitle className="text-4xl">0</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            All clear here!
                        </div>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                        <CardDescription>Expiring Soon</CardDescription>
                        <CardTitle className="text-4xl">0</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            Time to start renewing
                        </div>
                    </CardContent>
                </Card>

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