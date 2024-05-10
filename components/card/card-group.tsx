import findUsersCards from "@/server/card/findUsersCards"
import CardDocument from "./card-document";
import DrawerOrDialog from "../drawer-or-dialog";
import NewCardButton from "../home/new-card-button";
import CardGroupCarousel from "./card-group-carousel";

export default async function CardGroup({ userId }: { userId: string }) {
    const cards = await findUsersCards(userId);

    return (
        <>
            <div className="grid gap-3 max-sm:hidden">
                {
                    cards.map(({ card }) => {

                        return (
                            <DrawerOrDialog
                                key={card[0]?.id}
                                trigger={
                                    <CardDocument 
                                        key={card[0]?.id} 
                                        cardSideKey={card[0]?.card_front}
                                    />
                                }
                                title="View Card"
                            >
                                <div>
                                    <CardDocument 
                                        cardSideKey={card[0]?.card_front}
                                    />

                                    <CardDocument 
                                        cardSideKey={card[0]?.card_back}
                                    />
                                
                                </div>
                            </DrawerOrDialog>
                        )
                    })
                }
            </div>

            <div className="sm:hidden">
                {
                    cards.length <= 0 ? <NewCardButton userId={userId}/> :
                    <CardGroupCarousel cards={cards}/>
                }
            </div>
        
        </>
    )
}