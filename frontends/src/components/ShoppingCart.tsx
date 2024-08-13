import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaShoppingCart } from "react-icons/fa"
import { useShoppingCart } from "@/context/ShoppingCartContext"
import { ShoppingCartItemDto } from "@/types/ShoppingCart"

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, updateItemQuantity, clearCart } = useShoppingCart()
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (cart) {
      const items = cart.items.reduce((sum, item) => sum + item.quantity, 0)
      const price = cart.items.reduce((sum, item) => sum + 1 * item.quantity, 0)
      setTotalItems(items)
      setTotalPrice(price)
    } else {
      setTotalItems(0)
      setTotalPrice(0)
    }
  }, [cart])

  const handleUpdateItemQuantity = async (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(bookId)
    } else {
      await updateItemQuantity(bookId, quantity)
    }
  }

  const renderCartItem = (item: ShoppingCartItemDto) => (
    <div
      key={item.bookId}
      className="flex justify-between items-center mb-4 bg-gray-100 p-2 rounded"
    >
      <div className="flex flex-col">
        <span className="font-semibold">book title</span>
        <span className="text-sm text-gray-600">$1 each</span>
      </div>
      <div className="flex items-center">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleUpdateItemQuantity(item.bookId, item.quantity - 1)}
        >
          -
        </Button>
        <span className="mx-2">{item.quantity}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleUpdateItemQuantity(item.bookId, item.quantity + 1)}
        >
          +
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="ml-2"
          onClick={() => removeFromCart(item.bookId)}
        >
          Remove
        </Button>
      </div>
    </div>
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <FaShoppingCart />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            You have {totalItems} item(s) in your cart
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto">
          {cart?.items.length ? (
            cart.items.map(renderCartItem)
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}
        </div>
        <SheetFooter>
          <div className="flex flex-col items-stretch w-full">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <Button
                onClick={clearCart}
                variant="outline"
                disabled={!cart?.items.length}
              >
                Clear Cart
              </Button>
              <SheetClose asChild>
                <Button disabled={!cart?.items.length}>Checkout</Button>
              </SheetClose>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ShoppingCart
