import {
  ShoppingCartDto,
  ShoppingCartItemDto,
  AddToCartDto,
} from "@/types/ShoppingCart"
import axios from "axios"

const API_URL = "http://localhost:5148/api/ShoppingCart"

export const ShoppingCartService = {
  getCart: async (userId: string): Promise<ShoppingCartDto> => {
    try {
      const response = await axios.get<ShoppingCartDto>(`${API_URL}/${userId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching cart:", error)
      throw error
    }
  },

  addItem: async (userId: string, bookId: number, quantity: number): Promise<void> => {
    try {
      const item: AddToCartDto = { bookId, quantity }
      await axios.post(`${API_URL}/${userId}/items`, item)
    } catch (error) {
      console.error("Error adding item to cart:", error)
      throw error
    }
  },

  removeItem: async (userId: string, bookId: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${userId}/items/${bookId}`)
    } catch (error) {
      console.error("Error removing item from cart:", error)
      throw error
    }
  },

  updateItemQuantity: async (
    userId: string,
    bookId: number,
    quantity: number,
  ): Promise<void> => {
    try {
      await axios.put(`${API_URL}/${userId}/items`, { bookId, quantity })
    } catch (error) {
      console.error("Error updating item quantity:", error)
      throw error
    }
  },

  clearCart: async (userId: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${userId}`)
    } catch (error) {
      console.error("Error clearing cart:", error)
      throw error
    }
  },
}
