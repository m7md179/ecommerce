export interface ShoppingCartItemDto {
  bookId: number
  quantity: number
  // price: number
}

export interface ShoppingCartDto {
  items: ShoppingCartItemDto[]
  // Add other properties as needed
}
