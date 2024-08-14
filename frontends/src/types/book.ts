export interface Book {
  id: number
  title: string
  authors: { name: string }[]
  price: number
  isbn: string
  stock: number
  cover: string
  mainCategory: string
  subCategory: string
}