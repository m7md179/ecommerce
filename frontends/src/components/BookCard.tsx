import React from "react"
import { useRouter } from "next/navigation"
import { Book } from "@/types/book"
import { Button } from "@/components/ui/button"
import { useShoppingCart } from "@/context/ShoppingCartContext"
import { isLoggedIn } from "@/services/auth.service"

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const { addToCart } = useShoppingCart()
  const router = useRouter()

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      router.push("/login")
      return
    }

    try {
      await addToCart(book.id, 1)
      // You might want to show a success message here
    } catch (error) {
      console.error("Failed to add item to cart", error)
      // You might want to show an error message here
    }
  }

  const handleCardClick = () => {
    router.push(`/book/${book.id}`)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[320px] shadow-md rounded-2xl">
        <div onClick={handleCardClick} className="cursor-pointer">
          {book.cover ? (
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              className="h-[320px]"
            />
          ) : (
            <div
              style={{ width: "80px", height: "120px", backgroundColor: "#ccc" }}
              aria-label="No cover available"
            />
          )}
        </div>
      </div>
      <p>Price: ${book.price}</p>
      <Button onClick={handleAddToCart}>Add to cart</Button>
    </div>
  )
}

export default BookCard
