'use client'
import Navbar from "@/app/components/Navbar"
import ScrollItems from "@/app/components/ScrollItems";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getBookInfo } from "../../../services/bookService";
import { useState,useEffect } from "react";
import { Book } from "@/types/book";
import BookScroll from "./components/BookScroll";
const isbnList = [
    // Romance Ebooks
    '9780385533225',
    '9780262033848',
    '9780131103627',
    '9781451673319',
    '9780316769488',
    '9780743273565',
    '9781501175565',
    '9780385545969',
    '9780140283297',
    '9780061120084',
  
    // Mystery Ebooks
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
  
    // Thriller Ebooks
    '9781400032716',
    '9780060838676',
    '9780812981605',
    '9780316769488', // Duplicated for demonstration purposes; replace with a different ISBN if needed
    '9780316024990',
    '9780767922711',
    '9780375703768',
    '9780679785897',
    '9781400079273',
    '9780062024039'
  ];
  

export default function Category() {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [romanceBooks, setRomanceBooks] = useState<Book[]>([]);
    const [mysteryBooks, setMysteryBooks] = useState<Book[]>([]);
    const [thrillerBooks, setThrillerBooks] = useState<Book[]>([]);

    const goToLoginPage = () => {
      router.push('/login');
    };

    useEffect(() => {
        async function fetchBooks() {
            const bookPromises = isbnList.map(isbn => getBookInfo(isbn));
            const booksData = await Promise.all(bookPromises);
            const filteredBooks = booksData.filter(book => book !== null) as Book[];
            // For simplicity, divide the fetched books into categories
            setBooks(filteredBooks);
            setRomanceBooks(filteredBooks.slice(0, 10));
            setMysteryBooks(filteredBooks.slice(10, 20));
            setThrillerBooks(filteredBooks.slice(20, 30));
        }
        fetchBooks();
    }, []);

    return (
        <main className="grid grid-cols-1 h-screen w-full ">
            <Navbar onClick={goToLoginPage}/>
            <section className="flex flex-col justify-center items-center mt-32">
                <div className="flex items-center justify-between h-[350px] w-2/3">
                    <div className="w-1/2 h-1/2  flex flex-col justify-around">
                        <p className="text-3xl">Fiction Ebooks</p>
                        <p>Fiction ebooks are digital versions of novels, short stories, and other literary works that fall within the fiction genre. These ebooks are characterized by imaginative narratives, creative storytelling, and invented characters and settings. Available in various sub-genres such as fantasy, science fiction, romance, mystery, and historical fiction, fiction ebooks cater to a wide range of reader preferences.</p>
                    </div>
                </div>
                <div className="w-2/3 my-10">
                    <div className="flex items-center justify-between">
                        <p className="text-xl">Romance Ebooks</p>
                        <Button variant="link"><a href="/">View all</a></Button>
                    </div>
                    <ScrollItems books={romanceBooks}/>
                </div>
                <div className="w-2/3 my-10">
                    <div className="flex items-center justify-between">
                        <p className="text-xl">Mystery Ebooks</p>
                        <Button variant="link"><a href="/">View all</a></Button>
                    </div>
                    <ScrollItems books={mysteryBooks}/>
                </div>
                <div className="w-2/3 my-10">
                    <div className="flex items-center justify-between">
                        <p className="text-xl">Thriller Ebooks</p>
                        <Button variant="link"><a href="/books/sub-category">View all</a></Button>
                    </div>
                    <ScrollItems books={thrillerBooks}/>
                </div>
                
            </section>
            
        </main>
    );
}