import { Skeleton } from "@/components/ui/skeleton"

interface SearchResultProps {
  searchResults: any[]
  isLoading: boolean
}

const SearchResult: React.FC<SearchResultProps> = ({ searchResults, isLoading }) => {
  return (
    <div className="w-[80vw] mt-[106px]">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg p-4 animate-pulse">
                <div className="h-[180px] bg-gray-300 rounded"></div>
                <div className="mt-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))
          : searchResults.map((book) => (
              <div key={book.key} className="border p-4 rounded-md">
                <h3 className="font-bold">{book.title}</h3>
                <p>
                  Author:{" "}
                  {book.author_name ? book.author_name.join(", ") : "Unknown"}
                </p>
                {book.cover_i && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
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
