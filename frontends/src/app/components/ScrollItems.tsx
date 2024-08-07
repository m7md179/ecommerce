import React from "react";

import { Button } from "../../components/ui/button";
import { 
    Card ,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardHeader
  } from "../../components/ui/card"
  import{
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
  } from "../../components/ui/carousel"


interface ScrollItemsProps{}

/**
 * A component that renders a carousel of items.
 * @param props - The properties for the component.
 * @returns The rendered component.
 */
const ScrollItems: React.FC<ScrollItemsProps> = (props: ScrollItemsProps): JSX.Element => {
    return(
        <Carousel
            opts={{ align: "start"}}
            className="w-full"
          >
            <CarouselContent>
            {Array.from({length: 10}).map((_, i: number) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
                <Card className="h-[320px] bg-slate-200 shadow-md rounded-2xl p-4 flex items-center justify-between flex-col">
                  <CardHeader className="space-y-10">
                    <CardTitle>Header</CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <div>
                      <img src="https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg" width="80px" height="120px"/>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center flex-col space-y-4 p-3">
                    <CardDescription>
                      Description
                    </CardDescription>
                    <Button>Add to cart</Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>
    );
}

export default ScrollItems;