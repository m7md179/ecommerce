import axios from 'axios';
import { Book } from '@/types/book';

export async function getBookInfo(isbn: string): Promise<Book | null> {
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

  try {
    const response = await axios.get(url);
    const bookData = response.data[`ISBN:${isbn}`];

    if (!bookData) {
      console.log("Book not found");
      return null;
    }
    const bookInfo: Book = {
      title: bookData.title,
      authors: bookData.authors,
      cover: bookData.cover ? bookData.cover.large : undefined,
      publish_date: bookData.publish_date,
      number_of_pages: bookData.number_of_pages,
    };

    return bookInfo;
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }

}
