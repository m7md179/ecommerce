import React from "react"
import { Book } from "@/types/book"
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useShoppingCart } from "@/context/ShoppingCartContext"

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const { addToCart } = useShoppingCart()

  const handleAddToCart = async () => {
    try {
      await addToCart(book.id, 1) // Assuming book.id is the productId
      // You might want to show a success message here
    } catch (error) {
      console.error("Failed to add item to cart", error)
      // You might want to show an error message here
    }
  }

  return (
    <Card className="h-[320px] bg-slate-200 shadow-md rounded-2xl p-4 flex items-center justify-between flex-col">
      <CardHeader className="space-y-5">
        <CardTitle>
          <p className="text-sm">{book.title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {book.cover ? (
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            width="80"
            height="120"
          />
        ) : (
          <div
            style={{ width: "80px", height: "120px", backgroundColor: "#ccc" }}
            aria-label="No cover available"
          />
        )}
      </CardContent>
      <CardFooter className="flex items-center flex-col space-y-4 p-3">
        <CardDescription>
          {book.authors.map((author) => author.name).join(", ")}
        </CardDescription>
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </CardFooter>
    </Card>
  )
}

export default BookCard
