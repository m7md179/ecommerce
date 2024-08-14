import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Book } from "@/types/book"
import { Skeleton } from "@/components/ui/skeleton"
import BookCard from "@/components/BookCard"

interface ScrollItemsProps {
  books: Book[]
  isLoading: boolean
}

const ScrollItems: React.FC<ScrollItemsProps> = ({ books, isLoading }) => {
  const displayedBooks = books.slice(0, 12) // Limit to 12 books

  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent>
        {(isLoading ? Array.from({ length: 12 }) : displayedBooks).map((book, i) => (
          <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
            {isLoading ? (
              <div className="bg-gray-200 rounded-lg p-4 animate-pulse h-[320px]">
                <div className="h-[180px] bg-gray-300 rounded"></div>
                <div className="mt-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ) : (
              <BookCard book={book as Book} />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default ScrollItems