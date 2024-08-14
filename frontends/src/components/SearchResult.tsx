import React from "react"
import { Book } from "@/types/book"
import BookCard from "@/components/BookCard"

interface SearchResultProps {
  searchResults: Book[]
}

const SearchResult: React.FC<SearchResultProps> = ({ searchResults }) => {
  return (
    <div className="w-[80vw] mt-[106px]">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        {searchResults.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default SearchResult
