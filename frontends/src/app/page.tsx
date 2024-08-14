"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import banner from "@/images/banner.jpg"
import Navbar from "@/components/Navbar"
import ScrollItems from "@/components/ScrollItems"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Book } from "@/types/book"
import { bookService } from "@/services/bookService"
import SearchResult from "@/components/SearchResult"

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [isLoading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await bookService.getAllBooks()
        setBooks(booksData)
      } catch (error) {
        console.error("Error fetching books:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const goToLoginPage = () => {
    router.push("/login")
  }

  const handleSearch = async (query: string) => {
    try {
      const results = await bookService.searchBooks(query)
      setSearchResults(results)
    } catch (error) {
      console.error("Error searching books:", error)
      setSearchResults([])
    }
  }

  const searchBooks = async (query: string): Promise<Book[]> => {
    try {
      return await bookService.searchBooks(query)
    } catch (error) {
      console.error("Error searching books:", error)
      return []
    }
  }

  return (
    <main>
      <Navbar
        onClick={goToLoginPage}
        onSearch={handleSearch}
        searchBooks={searchBooks}
      />
      <section className="flex flex-col items-center justify-center p-8">
        {searchResults.length > 0 ? (
          <SearchResult searchResults={searchResults} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center h-[700px] text-center">
              <div className="p-8">
                <h2 className="text-xl md:text-3xl font-bold">
                  Discover Amazing Books
                </h2>
                <div className="mt-4 text-gray-600">
                  Explore a wide variety of books and find your next great read.
                </div>
              </div>
              <Image
                alt="banner"
                src={banner}
                className="w-full h-full"
                layout="responsive"
                priority
              />
            </div>
            <div className="w-full md:w-[80vw] h-[100vh] flex justify-center items-center mt-[-100px]">
              <ScrollItems books={books} isLoading={isLoading} />
            </div>
          </>
        )}
      </section>
    </main>
  )
}
