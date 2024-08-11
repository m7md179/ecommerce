import { ShoppingCartDto, CartItem } from "@/types/ShoppingCart"
import axios from "axios"

const API_URL = "http://localhost:5148/api/shoppingcart" // Adjust this if your API is hosted elsewhere

export const ShoppingCartService = {
  getCart: async (): Promise<ShoppingCartDto> => {
    const response = await axios.get<ShoppingCartDto>(API_URL)
    return response.data
  },

  addItem: async (productId: number, quantity: number): Promise<void> => {
    await axios.post(`${API_URL}/items`, { productId, quantity })
  },

  removeItem: async (productId: number): Promise<void> => {
    await axios.delete(`${API_URL}/items/${productId}`)
  },

  updateItemQuantity: async (productId: number, quantity: number): Promise<void> => {
    await axios.put(`${API_URL}/items/${productId}`, { quantity })
  },
}
