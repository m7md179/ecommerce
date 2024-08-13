"use client"
import Navbar from "@/app/components/Navbar"
import ScrollItems from "@/app/components/ScrollItems"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { bookService, getBookInfo } from "../../../services/bookService"
import { useState, useEffect } from "react"
import { Book } from "@/types/book"

export default function Category() {
  const router = useRouter()
  const [categories, setCategories] = useState<{ [key: string]: Book[] }>({})
  const [isLoading, setLoading] = useState(true)

  const goToLoginPage = () => {
    router.push("/login")
  }

  useEffect(() => {
    async function fetchBooks() {
      try {
        const fetchedIsbnList = await bookService.getAllBooks();
        // Ensure fetchedIsbnList.isbn is an array of strings
        if (Array.isArray(fetchedIsbnList.isbn)) {
          const bookPromises = fetchedIsbnList.isbn.map((isbn) => getBookInfo(isbn))
          const booksData = await Promise.all(bookPromises)
          const filteredBooks = booksData.filter((book): book is Book => book !== null)
          const categories = {
            Romance: filteredBooks.slice(0, 10),
            Mystery: filteredBooks.slice(10, 20),
            Thriller: filteredBooks.slice(20, 30),
          }
          setCategories(categories)
        } else {
          console.error("Fetched ISBN list is not an array:", fetchedIsbnList.isbn)
        }
      } catch (error) {
        console.error("Error fetching books:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  return (
    <main className="grid grid-cols-1 h-screen w-full">
      <Navbar onClick={goToLoginPage} />
      <section className="flex flex-col justify-center items-center mt-32">
        <div className="flex items-center justify-between h-[350px] w-2/3">
          <div className="w-1/2 h-1/2 flex flex-col justify-around">
            <p className="text-3xl">Fiction Ebooks</p>
            <p>
              Fiction ebooks are digital versions of novels, short stories, and other
              literary works that fall within the fiction genre. These ebooks are
              characterized by imaginative narratives, creative storytelling, and
              invented characters and settings. Available in various sub-genres such
              as fantasy, science fiction, romance, mystery, and historical fiction,
              fiction ebooks cater to a wide range of reader preferences.
            </p>
          </div>
        </div>
        {Object.entries(isLoading ? {} : categories).map(
          ([category, books]) => (
            <div key={category} className="w-2/3 my-10">
              <div className="flex items-center justify-between">
                <p className="text-xl">{category} Ebooks</p>
                <Button variant="link">
                  <a href="/books/sub-category">View all</a>
                </Button>
              </div>
              <ScrollItems books={books} isLoading={isLoading} />
            </div>
          ),
        )}
      </section>
    </main>
  )
}