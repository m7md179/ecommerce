"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { bookService } from "@/services/bookService"
import { Book } from "@/types/book"
import BookCard from "@/components/BookCard"
import Navbar from "@/components/Navbar"
import { Skeleton } from "@/components/ui/skeleton"
import SearchResult from "@/components/SearchResult"
import { useShoppingCart } from "@/context/ShoppingCartContext"

const ITEMS_PER_PAGE = 12

function SubCategory() {
  const [books, setBooks] = useState<Book[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<Book[]>([])

  const router = useRouter()
  const params = useParams()
  const mainCategory = params?.mainCategory as string
  const subCategory = params?.subCategory as string

  const { addToCart } = useShoppingCart()

  useEffect(() => {
    async function fetchBooks() {
      if (!mainCategory || !subCategory) return

      setIsLoading(true)
      setError(null)
      try {
        const booksData = await bookService.getBooksByCategory(
          mainCategory,
          subCategory,
        )
        setBooks(booksData)
      } catch (err) {
        setError("Failed to fetch books. Please try again later.")
        console.error("Error fetching books:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBooks()
  }, [mainCategory, subCategory])

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE)

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

  const paginatedBooks = books.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  )

  return (
    <main>
      <Navbar
        onClick={goToLoginPage}
        onSearch={handleSearch}
        searchBooks={searchBooks}
      />
      <div className="h-[200px]"></div>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">{`${mainCategory} > ${subCategory}`}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
          {searchResults.length > 0 ? (
            <SearchResult searchResults={searchResults} />
          ) : isLoading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg p-4 animate-pulse">
                <div className="h-[180px] bg-gray-300 rounded"></div>
                <div className="mt-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))
          ) : (
            paginatedBooks.map((book, i) => <BookCard key={i} book={book} />)
          )}
        </div>
        <div className="my-14">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                  aria-disabled={currentPage === 0}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(i)}
                    aria-current={currentPage === i ? "page" : undefined}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
                  }
                  aria-disabled={currentPage === totalPages - 1}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  )
}

export default SubCategory
