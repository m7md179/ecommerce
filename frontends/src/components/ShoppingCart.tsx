import React from "react"
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

const ShoppingCart: React.FC = () => {
  const { cartItems, removeFromCart, updateItemQuantity, clearCart } =
    useShoppingCart()
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <FaShoppingCart />
          {totalItems > 0 && <span className="ml-1">{totalItems}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            You have {totalItems} item(s) in your cart
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.title} (x{item.quantity})
              </span>
              <div>
                <Button
                  onClick={() =>
                    updateItemQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </Button>
                <Button
                  onClick={() =>
                    updateItemQuantity(item.productId, item.quantity - 1)
                  }
                >
                  -
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        <SheetFooter>
          <div className="flex justify-between items-center w-full">
            <span>Total: ${totalPrice.toFixed(2)}</span>
            <div>
              <Button onClick={clearCart} variant="outline" className="mr-2">
                Clear Cart
              </Button>
              <SheetClose asChild>
                <Button>Checkout</Button>
              </SheetClose>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ShoppingCart
