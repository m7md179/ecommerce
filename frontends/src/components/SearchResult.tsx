import React from "react"
import { Book } from "@/types/book"
import Image from "next/image"

interface SearchResultProps {
  searchResults: Book[]
}

const SearchResult: React.FC<SearchResultProps> = ({ searchResults }) => {
  return (
    <div className="w-[80vw] mt-[106px]">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((book) => (
          <div key={book.id} className="border p-4 rounded-md">
            <h3 className="font-bold">{book.title}</h3>
            <p>Authors: {book.authors.join(", ")}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Price: ${book.price}</p>
            <p>Stock: {book.stock}</p>
            {book.cover && (
              <Image
                src={book.cover}
                alt={`Cover of ${book.title}`}
                width={100}
                height={150}
                className="mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResult
