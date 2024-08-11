import axios from "axios"
import { Book, IsbnBook } from "@/types/book"

const API_URL = "http://localhost:5148/api/Books"

export async function getBookInfo(isbn: string): Promise<Book | null> {
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`

  try {
    const response = await axios.get(url)
    const bookData = response.data[`ISBN:${isbn}`]

    if (!bookData) {
      console.log("Book not found")
      return null
    }
    const bookInfo: Book = {
      id: bookData.key,
      title: bookData.title,
      authors: bookData.authors,
      cover: bookData.cover ? bookData.cover.large : undefined,
      publish_date: bookData.publish_date,
      number_of_pages: bookData.number_of_pages,
      isbn: bookData.isbn ? bookData.isbn[0] : undefined,
    }

    return bookInfo
  } catch (error) {
    console.error("Error fetching book data:", error)
    return null
  }
}
export const bookService = {
  getAllBooks: async () => {
    const response = await axios.get(API_URL)
    const bookData = response.data
    const bookInfo: IsbnBook = {
      isbn: bookData.isbn,
    }
    return bookInfo
  },
}
