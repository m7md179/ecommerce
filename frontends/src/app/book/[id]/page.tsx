"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useShoppingCart } from "@/context/ShoppingCartContext"
import { isLoggedIn } from "@/services/auth.service"
import { Book } from "@/types/book"
import { bookService } from "@/services/bookService"
import Navbar from "@/components/Navbar"

const BookPage = () => {
  const params = useParams()
  const { addToCart } = useShoppingCart()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [searchResults, setSearchResults] = useState<Book[]>([])

  const id = params.id as string

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        const bookId = parseInt(id, 10) // Convert the id to a number
        if (isNaN(bookId)) {
          console.error("Invalid book ID:", id)
          // Handle error (e.g., redirect to 404 page)
          return
        }
        try {
          const fetchedBook = await bookService.getBookById(bookId)
          setBook(fetchedBook)
        } catch (error) {
          console.error("Failed to fetch book:", error)
          // Handle error (e.g., show error message, redirect to 404 page)
        }
      }
    }

    fetchBook()
  }, [id])

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      router.push("/login")
      return
    }

    if (book) {
      try {
        await addToCart(book.id, 1)
        // You might want to show a success message here
      } catch (error) {
        console.error("Failed to add item to cart", error)
        // You might want to show an error message here
      }
    }
  }
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

  if (!book) {
    return (
      <div className="h-screen flex items-center justify-center">Loading...</div>
    )
  }

  return (
    <div>
      <Navbar
        onClick={goToLoginPage}
        onSearch={handleSearch}
        searchBooks={searchBooks}
      />
      <div className="container  pt-[200px]">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
            <img
              src={book.cover || "/placeholder-cover.jpg"}
              alt={`Cover of ${book.title}`}
              className="w-full h-auto"
            />
          </div>
          <div>
            <p>
              <strong>author:</strong>
              {book.authors?.map((author) => author.name).join(", ")}
            </p>
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Price:</strong> ${book.price}
            </p>
            <Button onClick={handleAddToCart} className="mt-4">
              Add to cart
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-bold">User1</p>
              <p>Great book! Couldn't put it down.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-bold">User2</p>
              <p>Interesting plot, but the ending was a bit disappointing.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-bold">User3</p>
              <p>A must-read for fans of the genre!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPage
