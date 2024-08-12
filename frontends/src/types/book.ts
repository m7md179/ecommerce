export interface Book {
  title: string;
  authors: { name: string }[];
  cover?: string;
  publish_date: string;
  number_of_pages: number;
  }
export interface IsbnBook{
  isbn: string;
}