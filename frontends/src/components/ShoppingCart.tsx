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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FaShoppingCart } from "react-icons/fa"
import { useShoppingCart } from "@/context/ShoppingCartContext"
import { ShoppingCartItemDto } from "@/types/ShoppingCart"
import Link from "next/link"

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, updateItemQuantity, clearCart } = useShoppingCart()
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [itemToRemove, setItemToRemove] = useState<number | null>(null)

  useEffect(() => {
    if (cart) {
      const items = cart.items.reduce((sum, item) => sum + item.quantity, 0)
      const price = cart.items.reduce(
        (sum, item) => sum + (item.book?.price || 0) * item.quantity,
        0,
      )
      setTotalItems(items)
      setTotalPrice(price)
    } else {
      setTotalItems(0)
      setTotalPrice(0)
    }
  }, [cart])

  const handleUpdateItemQuantity = async (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      setItemToRemove(bookId)
    } else {
      await updateItemQuantity(bookId, quantity)
    }
  }

  const handleRemoveItem = async () => {
    if (itemToRemove !== null) {
      await removeFromCart(itemToRemove)
      setItemToRemove(null)
    }
  }

  const handleClearCart = async () => {
    await clearCart()
  }

  const renderCartItem = (item: ShoppingCartItemDto) => (
    <div
      key={item.bookId}
      className="flex justify-between items-center mb-4 bg-gray-100 p-2 rounded"
    >
      <div className="flex flex-col">
        <span className="font-semibold">{item.book?.title || "Unknown Book"}</span>
        <span className="text-sm text-gray-600">
          ${item.book?.price.toFixed(2) || "N/A"} each
        </span>
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive" className="ml-2">
              Remove
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the item from your cart.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => removeFromCart(item.bookId)}>
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" disabled={!cart?.items.length}>
                    Clear Cart
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all items from your cart.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearCart}>
                      Clear Cart
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <SheetClose asChild>
                <Button disabled={!cart?.items.length}>
                  <Link href="/checkout">Checkout</Link>{" "}
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
      <AlertDialog
        open={itemToRemove !== null}
        onOpenChange={() => setItemToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the item from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveItem}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  )
}

export default ShoppingCart
