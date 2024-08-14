import React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Book } from "@/types/book"
import { useEffect, useState } from "react"

interface BookScrollProps {
  books: Book[]
}

/**
 * A component that renders a carousel of items.
 * @param props - The properties for the component.
 * @returns The rendered component.
 */
const BookScroll: React.FC<BookScrollProps> = ({
  books,
}: BookScrollProps): JSX.Element => {
  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent>
        {books.map((book, i) => (
          <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
            <Card className="h-[320px] bg-slate-200 shadow-md rounded-2xl p-4 flex items-center justify-between flex-col">
              <CardHeader className="space-y-5">
                <CardTitle>
                  <p className="text-sm">{book?.title}</p>
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <div>
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt="Book Cover"
                      width="80px"
                      height="120px"
                    />
                  ) : (
                    <div
                      style={{
                        width: "80px",
                        height: "120px",
                        backgroundColor: "#ccc",
                      }}
                    />
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex items-center flex-col space-y-4 p-3">
                <CardDescription>
                  {book.authors.map((author) => author.name).join(", ")}
                </CardDescription>
                <Button>Add to cart</Button>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default BookScroll
