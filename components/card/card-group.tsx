import findUsersCards from "@/server/card/findUsersCards"
import CardDocument from "./card-document";
import DrawerOrDialog from "../drawer-or-dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import NewCardButton from "../home/new-card-button";

export default async function CardGroup({ userId }: { userId: string }) {
    const cards = await findUsersCards(userId);

    return (
        <>
            <div className="grid gap-3 max-sm:hidden">
                {
                    cards.map(({ card }) => {

                        return (
                            <DrawerOrDialog
                                key={card[0].id}
                                trigger={
                                    <CardDocument 
                                        key={card[0].id} 
                                        cardSideKey={card[0].card_front}
                                    />
                                }
                                title="View Card"
                            >
                                <div>
                                    <CardDocument 
                                        cardSideKey={card[0].card_front}
                                    />

                                    <CardDocument 
                                        cardSideKey={card[0].card_back}
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
                    <Carousel className="relative">
                        <CarouselContent>
                            {
                                cards.map(({ card }) => (
                                    <CarouselItem key={card[0].id}>
                                        <DrawerOrDialog
                                            key={card[0].id}
                                            trigger={
                                                <CardDocument 
                                                    key={card[0].id} 
                                                    cardSideKey={card[0].card_front}
                                                />
                                            }
                                            title="View Card"
                                        >
                                            <div className="px-3 space-y-3">
                                                <div>
                                                    <h3 className="text-lg font-semibold">Front Side</h3>
                                                    <CardDocument 
                                                        cardSideKey={card[0].card_front}
                                                    />
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-semibold">Back Side</h3> 
                                                    <CardDocument 
                                                        cardSideKey={card[0].card_back}
                                                    />
                                                </div>
                                            
                                            </div>
                                        </DrawerOrDialog>
                                    </CarouselItem>
                                ))
                            }
                            <CarouselItem>
                                <NewCardButton userId={cards[0].user_id}/>
                            </CarouselItem>
                        </CarouselContent>

                        <CarouselPrevious className="absolute z-10 left-0"/>
                        <CarouselNext className="absolute z-10 right-0"/>
                    </Carousel>
                }
            </div>
        
        </>
    )
}