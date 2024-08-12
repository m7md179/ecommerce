import axios from "axios"
import { Book } from "@/types/book"

const API_URL = "http://localhost:5148/api/Books"

export const bookService = {
  getAllBooks: async (): Promise<Book[]> => {
    const response = await axios.get(API_URL)
    return response.data
  },

  getBookById: async (id: number): Promise<Book> => {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  addBook: async (book: Omit<Book, "id">): Promise<Book> => {
    const response = await axios.post(API_URL, book)
    return response.data
  },

  updateBook: async (id: number, book: Partial<Book>): Promise<Book> => {
    const response = await axios.put(`${API_URL}/${id}`, book)
    return response.data
  },

  deleteBook: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`)
  },

  searchBooks: async (searchTerm: string): Promise<Book[]> => {
    const response = await axios.get(`${API_URL}/search`, {
      params: { searchTerm },
    })
    return response.data
  },

  getBookInfo: async (isbn: string): Promise<Book | null> => {
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`

    try {
      const response = await axios.get(url)
      const bookData = response.data[`ISBN:${isbn}`]

      if (!bookData) {
        console.log("Book not found")
        return null
      }
      const bookInfo: Book = {
        id: 0, // This will be set by the backend when adding the book
        title: bookData.title,
        authors: bookData.authors
          ? bookData.authors.map((author: any) => author.name)
          : ["Unknown"],
        price: 0, // This needs to be set manually
        isbn: isbn,
        stock: 0, // This needs to be set manually
        cover: bookData.cover ? bookData.cover.large : undefined,
        publish_date: bookData.publish_date,
        number_of_pages: bookData.number_of_pages,
      }

      return bookInfo
    } catch (error) {
      console.error("Error fetching book data:", error)
      return null
    }
  },
}
