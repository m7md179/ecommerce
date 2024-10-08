"use client"
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { ShoppingCartService } from "@/services/ShoppingCartService"
import { ShoppingCartDto, ShoppingCartItemDto } from "@/types/ShoppingCart"
import { Book } from "@/types/book"
import { isLoggedIn, getUserId } from "@/services/auth.service"
import { bookService } from "@/services/bookService"

interface ShoppingCartContextType {
  cart: ShoppingCartDto | null
  addToCart: (bookId: number, quantity: number) => Promise<void>
  removeFromCart: (bookId: number) => Promise<void>
  updateItemQuantity: (bookId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  userId: string | null
  setUserId: (userId: string | null) => void
  refreshCart: () => Promise<void>
  isUserLoggedIn: boolean
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined)

export const ShoppingCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ShoppingCartDto | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)

  const fetchCart = useCallback(async () => {
    if (userId) {
      try {
        const cartData = await ShoppingCartService.getCart(userId)
        // Fetch book details for each item in the cart
        const updatedItems = await Promise.all(
          cartData.items.map(async (item) => {
            const bookDetails = await bookService.getBookById(item.bookId)
            return { ...item, book: bookDetails }
          })
        )
        setCart({ ...cartData, items: updatedItems })
      } catch (error) {
        console.error("Error fetching cart:", error)
      }
    } else {
      setCart(null)
    }
  }, [userId])

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = isLoggedIn()
      setIsUserLoggedIn(loggedIn)
      if (loggedIn) {
        const currentUserId = getUserId()
        if (currentUserId) {
          setUserId(currentUserId)
        }
      } else {
        setUserId(null)
      }
    }

    checkLoginStatus()
    fetchCart()
  }, [fetchCart])

  const addToCart = async (bookId: number, quantity: number) => {
    if (!userId) {
      console.error("User ID is not set")
      return
    }
    await ShoppingCartService.addItem(userId, bookId, quantity)
    await fetchCart()
  }

  const removeFromCart = async (bookId: number) => {
    if (!userId) {
      console.error("User ID is not set")
      return
    }
    await ShoppingCartService.removeItem(userId, bookId)
    await fetchCart()
  }

  const updateItemQuantity = async (bookId: number, quantity: number) => {
    if (!userId) {
      console.error("User ID is not set")
      return
    }
    await ShoppingCartService.updateItemQuantity(userId, bookId, quantity)
    await fetchCart()
  }

  const clearCart = async () => {
    if (!userId) {
      console.error("User ID is not set")
      return
    }
    await ShoppingCartService.clearCart(userId)
    setCart(null)
  }

  const refreshCart = useCallback(async () => {
    await fetchCart()
  }, [fetchCart])

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        userId,
        setUserId,
        refreshCart,
        isUserLoggedIn,
      }}
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
