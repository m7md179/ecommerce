export interface CartItem {
  productId: number
  quantity: number
  title: string
  price: number
}

export interface ShoppingCartDto {
  items: CartItem[]
  // Add other properties as needed
}
