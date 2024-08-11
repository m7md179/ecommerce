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
import { Skeleton } from "@/components/ui/skeleton"
import { useShoppingCart } from "@/context/ShoppingCartContext"

interface ScrollItemsProps {
  books: Book[]
  isLoading: boolean
}

const ScrollItems: React.FC<ScrollItemsProps> = ({ books, isLoading }) => {
  const { addToCart } = useShoppingCart()

  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent>
        {(isLoading ? Array.from({ length: 4 }) : books).map((book, i) => (
          <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
            <Card className="h-[320px] bg-slate-200 shadow-md rounded-2xl p-4 flex items-center justify-between flex-col">
              <CardHeader className="space-y-5">
                {isLoading ? (
                  <Skeleton className="h-5 w-32" />
                ) : (
                  <CardTitle>
                    <p className="text-sm">{(book as Book).title}</p>
                  </CardTitle>
                )}
              </CardHeader>
              <CardContent className="">
                <div>
                  {isLoading ? (
                    <Skeleton className="h-[120px] w-[80px]" />
                  ) : (book as Book).cover ? (
                    <img
                      src={(book as Book).cover}
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
                  {isLoading ? (
                    <Skeleton className="h-5 w-32" />
                  ) : (
                    (book as Book).authors?.map((author) => author.name).join(", ")
                  )}
                </CardDescription>
                <Button
                  onClick={() => {
                    if (!isLoading && book) {
                      console.log("Book being added:", book) // Debug log
                      addToCart(book as Book)
                    }
                  }}
                  disabled={isLoading}
                >
                  Add to cart
                </Button>
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

export default ScrollItems
