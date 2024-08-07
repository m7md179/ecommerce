'use client'
import React, { useEffect, useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getBookInfo } from "@/services/bookService";
import { Book } from "@/types/book";
import BookCard from './components/BookCard';
import Navbar from '@/app/components/Navbar';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 12;
const thrillerIsbns = [
    '9780385533225',
    '9780262033848',
    '9780679783268',
    '9780316015844',
    '9780451524935',
    '9780553382563',
    '9780060935467',
    '9780307346605',
    '9780767908184',
    '9780385490818',
    '9780743496704',
    '9780062316097',
    '9781400032716',
    '9780060838676',
    '9780812981605',
    '9780316769488',
    '9780316024990',
    '9780767922711',
    '9780375703768',
    '9780679785897',
    '9781400079273',
    '9781638581284',
    '9780385533225',
    '9780262033848',
    '9780679783268',
    '9780316015844',
    '9780451524935',
    '9780553382563',
    '9780060935467',
    '9780307346605',
    '9780767908184',
    '9780385490818',
    '9780743496704',
    '9780062316097',
    '9781400032716',
    '9780060838676',
    '9780812981605',
    '9780316769488',
    '9780316024990',
    '9780767922711',
    '9780375703768',
    '9780679785897',
    '9781400079273',
    '9781638581284',
    '9780385533225',
    '9780262033848',
    '9780679783268',
    '9780316015844',
    '9780451524935',
    '9780553382563',
    '9780060935467',
    '9780307346605',
    '9780767908184',
    '9780385490818',
    '9780743496704',
    '9780062316097',
    '9781400032716',
    '9780060838676',
    '9780812981605',
    '9780316769488',
    '9780316024990',
    '9780767922711',
    '9780375703768',
    '9780679785897',
    '9781400079273',
    '9781638581284',
    '9780385533225',
    '9780262033848',
    '9780679783268',
    '9780316015844',
    '9780451524935',
    '9780553382563',
    '9780060935467',
    '9780307346605',
    '9780767908184',
    '9780385490818',
    '9780743496704',
    '9780062316097',
    '9781400032716',
    '9780060838676',
    '9780812981605',
    '9780316769488',
    '9780316024990',
    '9780767922711',
    '9780375703768',
    '9780679785897',
    '9781400079273',
    '9781638581284',
  ];
  


function SubCategory() {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchBooks() {
            setIsLoading(true);
            setError(null);
            try {
                const startIndex = currentPage * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                const isbnsToFetch = thrillerIsbns.slice(startIndex, endIndex);
                
                const bookPromises = isbnsToFetch.map(isbn => getBookInfo(isbn));
                const booksData = await Promise.all(bookPromises);
                setBooks(booksData.filter((book): book is Book => book !== null));
            } catch (err) {
                setError('Failed to fetch books. Please try again later.');
                console.error('Error fetching books:', err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBooks();
    }, [currentPage]);

    const totalPages = Math.ceil(thrillerIsbns.length / ITEMS_PER_PAGE);

    const goToLoginPage = () => {
        router.push('/login');
    };
    return (
        <main>
            <Navbar onClick={goToLoginPage}/>
            <div className='h-[200px]'></div>
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
                            {books.map((book, i) => (
                                <BookCard key={i} book={book} />
                            ))}
                        </div>
                        <div className="my-14">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious 
                                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                            aria-disabled={currentPage === 0}
                                        />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                href="#"
                                                onClick={() => setCurrentPage(i)}
                                                aria-current={currentPage === i ? 'page' : undefined}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext 
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                            aria-disabled={currentPage === totalPages - 1}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default SubCategory;