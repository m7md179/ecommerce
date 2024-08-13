import { Button } from "@/components/ui/button"
import { forwardRef, useState } from "react"
import { HiOutlineBookOpen } from "react-icons/hi"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { bookService } from "@/services/bookService"
import { Book } from "@/types/book"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import ShoppingCart from "./ShoppingCart"

interface NavbarProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSearch: (query: string) => Promise<void>
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  ({ onClick, onSearch }, ref) => {
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = async () => {
      if (searchQuery.trim() === "") return
      onSearch(searchQuery)
    }

    return (
      <header className="w-full border-b-2 border-[#f0f0f0] bg-white border-solid fixed z-50">
        <div className="w-full h-[106px] grid grid-cols-3 items-center">
          <div className="flex items-center justify-center">
            <a href="/" className="flex items-center justify-center font-bold p-4">
              <HiOutlineBookOpen /> LitEars
            </a>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Ebook</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-1">
                      <li>Categories:</li>
                      <div className="flex items-center justify-start gap-10 ml-8">
                        <div>
                          <li className="row-span-3">
                            <a href="/books/category">Fiction</a>
                          </li>
                          <li className="row-span-3">
                            <a href="/">Literary Fiction</a>
                          </li>
                          <li className="row-span-3">
                            <a href="/">Literary Fiction</a>
                          </li>
                          <li className="row-span-3">
                            <a href="/">Literary Fiction</a>
                          </li>
                        </div>
                        <div>
                          <li className="row-span-3">
                            <a href="/">Literary Fiction</a>
                          </li>
                          <li className="row-span-3">
                            <a href="/">Literary Fiction</a>
                          </li>
                          <li className="row-span-3">
                            <a href="/">Literary Fiction</a>
                          </li>
                          <li className="row-span-3">
                            <a href="/">Literary Fiction</a>
                          </li>
                        </div>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <a href="#" className="flex items-center justify-center p-4">
              Audiobooks
            </a>
          </div>
          <div className="flex items-center justify-center">
            <Input
              type="search"
              placeholder="Search"
              className="flex-1 px-4 py-2 text-foreground bg-transparent border-none focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={onClick} className="w-[80px]">
              Login
            </Button>
            <ShoppingCart />
          </div>
        </div>
      </header>
    )
  },
)

export default Navbar
