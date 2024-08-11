export interface Book {
  id: number
  title: string
  authors: { name: string }[]
  cover?: string
  publish_date: string
  number_of_pages: number
  isbn: string
  price?: number
}

export interface IsbnBook {
  isbn: string[]
}
