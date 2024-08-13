import { Book } from "./book"

export interface ShoppingCartItemDto {
  bookId: number
  quantity: number
  book?: Book // Optional book details for frontend use
}

export interface ShoppingCartDto {
  items: ShoppingCartItemDto[]
}

// New interface for adding items to cart (without book details)
export interface AddToCartDto {
  bookId: number
  quantity: number
}
