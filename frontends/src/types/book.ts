export interface Book {
  id: number
  title: string
  authors: { name: string }[]
  cover?: string
  isbn: string
  price: number
  stock: number
}
