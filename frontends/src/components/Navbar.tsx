import React, { useState, useEffect, forwardRef } from "react"
import { categories } from "@/utils/categories"
import { Button } from "@/components/ui/button"
import { HiOutlineBookOpen } from "react-icons/hi"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import ShoppingCart from "./ShoppingCart"
import { useRouter } from "next/navigation"
import { isLoggedIn, logout } from "@/services/auth.service"
import { Book } from "@/types/book"

interface NavbarProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSearch: (query: string) => Promise<void>
  searchBooks: (query: string) => Promise<Book[]>
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  ({ onClick, onSearch, searchBooks }, ref) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [searchResults, setSearchResults] = useState<Book[]>([])
    const [showDropdown, setShowDropdown] = useState(false)
    const router = useRouter()

    useEffect(() => {
      setIsUserLoggedIn(isLoggedIn())
    }, [])

    const handleSearch = async () => {
      if (searchQuery.trim() === "") return
      onSearch(searchQuery)
      setShowDropdown(false)
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      setSearchQuery(query)
      if (query.trim() !== "") {
        const results = await searchBooks(query)
        setSearchResults(results.slice(0, 5))
        setShowDropdown(true)
      } else {
        setSearchResults([])
        setShowDropdown(false)
      }
    }

    const handleResultClick = (book: Book) => {
      router.push(`/book/${book.id}`)
      setShowDropdown(false)
    }

    const handleLogout = () => {
      logout()
      setIsUserLoggedIn(false)
      router.push("/")
    }

    return (
      <header className="w-full border-b-2 border-[#f0f0f0] bg-white border-solid fixed z-50">
        <div className="w-full h-[106px] grid grid-cols-3 items-center">
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="flex items-center justify-center font-bold p-4"
            >
              <HiOutlineBookOpen /> LitEars
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Ebooks</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[70vw] h-[400px] overflow-auto">
                      <div className="p-4">
                        <div className="grid grid-cols-4 gap-4">
                          {Object.entries(categories).map(
                            ([mainCategory, subCategories]) => (
                              <div key={mainCategory} className="space-y-2">
                                <h3 className="font-bold">{mainCategory}</h3>
                                <ul className="space-y-1">
                                  {Object.entries(subCategories).map(
                                    ([subCategory, code]) => (
                                      <li key={code}>
                                        <Link
                                          href={`/books/category/${mainCategory}/${subCategory}`}
                                          className="text-sm hover:underline"
                                        >
                                          {subCategory}
                                        </Link>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center justify-center relative">
            <Input
              type="search"
              placeholder="Search"
              className="flex-1 px-4 py-2 text-foreground bg-transparent border-none focus:outline-none"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              variant="ghost"
              size="icon"
              className="p-2 text-muted-foreground hover:bg-muted/50 rounded-md"
              onClick={handleSearch}
            >
              <SearchIcon className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Button>
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-md">
                {searchResults.map((book) => (
                  <div
                    key={book.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleResultClick(book)}
                  >
                    {book.title}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            {isUserLoggedIn ? (
              <Button onClick={handleLogout} className="w-[80px]">
                Logout
              </Button>
            ) : (
              <Button onClick={onClick} className="w-[80px]">
                Login
              </Button>
            )}
            <ShoppingCart />
          </div>
        </div>
      </header>
    )
  },
)

Navbar.displayName = "Navbar"

export default Navbar
