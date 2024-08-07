'use client'
import { useRouter } from "next/navigation";

import Link from "next/link";
import  banner from "@/images/banner.jpg"
import Navbar from "./components/Navbar";
import ScrollItems from "@/app/components/ScrollItems";
import Image from "next/image";
import { useEffect,useState } from "react";
import { Book } from "@/types/book";
import { getBookInfo } from "@/services/bookService";


const isbnList = [
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
  '9780062024039',
  '9781638581284',
];

export default function Home() {

  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();
    
    useEffect(() => {
        async function fetchBook() {
          const bookPromises = isbnList.map(isbn => getBookInfo(isbn));
          const booksData = await Promise.all(bookPromises);
          setBooks(booksData.filter(book => book !== null) as Book[]);
        }
        fetchBook();
    }, [isbnList]);
  const goToLoginPage = () => {
    router.push('/login');
  };
  return (
    <main>
      <Navbar onClick={goToLoginPage}/>
      <section className="flex flex-col items-center justify-center p-8">
        <div className="grid grid-cols-2 items-center h-[700px] text-center">
          
          <h2 className="">Description: words words words words words</h2>           
            <Image                    
                alt="banner"
                src={banner}
                className="w-full h-full"
                layout="responsive"
              />
        </div>
        <div className="w-[80vw] h-[100vh] flex justify-center items-center mt-[-100px]">   
          <ScrollItems books={books}/>
        </div>
      </section>
    </main>
  );
}


