"use client"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { ShoppingCartService } from "@/services/ShoppingCartService"
import { CartItem, ShoppingCartDto } from "@/types/ShoppingCart"
interface ShoppingCartContextType {
  cartItems: CartItem[]
  addToCart: (productId: number, quantity: number) => Promise<void>
  removeFromCart: (productId: number) => Promise<void>
  updateItemQuantity: (productId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined,
)

export const ShoppingCartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart data when the component mounts
    ShoppingCartService.getCart().then((cart) => setCartItems(cart.items))
  }, [])

  const addToCart = async (productId: number, quantity: number) => {
    await ShoppingCartService.addItem(productId, quantity)
    const updatedCart = await ShoppingCartService.getCart()
    setCartItems(updatedCart.items)
  }

  const removeFromCart = async (productId: number) => {
    await ShoppingCartService.removeItem(productId)
    const updatedCart = await ShoppingCartService.getCart()
    setCartItems(updatedCart.items)
  }

  const updateItemQuantity = async (productId: number, quantity: number) => {
    await ShoppingCartService.updateItemQuantity(productId, quantity)
    const updatedCart = await ShoppingCartService.getCart()
    setCartItems(updatedCart.items)
  }

  const clearCart = async () => {
    // Implement clear cart functionality in your backend and service if needed
    // For now, we'll just clear the local state
    setCartItems([])
  }

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateItemQuantity, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext)
  if (context === undefined) {
    throw new Error("useShoppingCart must be used within a ShoppingCartProvider")
  }
  return context
}
