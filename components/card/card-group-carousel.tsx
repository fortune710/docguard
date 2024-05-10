'use client'

import { Cards } from "@/server/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import DrawerOrDialog from "../drawer-or-dialog";
import CardDocument from "./card-document";
import NewCardButton from "../home/new-card-button";


interface CardGroupCarouselProps {
    cards: Cards
}

export default function CardGroupCarousel({ cards }: CardGroupCarouselProps) {
    return (
        <Carousel className="relative">
            <CarouselContent key={cards[0].id}>
                {
                    cards.map(({ card }) => (
                        <CarouselItem key={card[0]?.id}>
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
                                <div className="px-3 space-y-3">
                                    <div>
                                        <h3 className="text-lg font-semibold">Front Side</h3>
                                        <CardDocument 
                                            cardSideKey={card[0]?.card_front}
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold">Back Side</h3> 
                                        <CardDocument 
                                            cardSideKey={card[0]?.card_back}
                                        />
                                    </div>
                                
                                </div>
                            </DrawerOrDialog>
                        </CarouselItem>
                    ))
                }
                <CarouselItem>
                    <NewCardButton userId={cards[0]?.user_id}/>
                </CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="absolute z-10 left-0"/>
            <CarouselNext className="absolute z-10 right-0"/>
        </Carousel>
    )
}