import { Book } from '@/types/book'
import { categories } from './categories'

export function getCategoryFromISBN(isbn: string): { mainCategory: string, subCategory: string } | null {
  const categoryCode = isbn.slice(-3)
  const mainCategoryCode = categoryCode[0]

  for (const [mainCategory, subCategories] of Object.entries(categories)) {
    for (const [subCategory, code] of Object.entries(subCategories)) {
      if (code === categoryCode) {
        return { mainCategory, subCategory }
      }
    }
  }

  return null
}

export function filterBooksByCategory(books: Book[], mainCategory: string, subCategory?: string): Book[] {
  return books.filter(book => {
    const category = getCategoryFromISBN(book.isbn)
    if (!category) return false
    if (subCategory) {
      return category.mainCategory === mainCategory && category.subCategory === subCategory
    }
    return category.mainCategory === mainCategory
  })
}