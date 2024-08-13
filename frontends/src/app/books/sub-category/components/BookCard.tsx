import { Book } from "@/types/book";
import { 
    Card,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const BookCard: React.FC<{ book: Book }> = ({ book }) => (
    <Card className="h-[320px] bg-slate-200 shadow-md rounded-2xl p-4 flex items-center justify-between flex-col">
        <CardHeader className="space-y-5">
            <CardTitle><p className="text-sm">{book.title}</p></CardTitle>
        </CardHeader>
        <CardContent>
            {book.cover ? (
                <img src={book.cover} alt={`Cover of ${book.title}`} width="80" height="120" />
            ) : (
                <div style={{ width: '80px', height: '120px', backgroundColor: '#ccc' }} aria-label="No cover available" />
            )}
        </CardContent>
        <CardFooter className="flex items-center flex-col space-y-4 p-3">
            <CardDescription>
                {book.authors.map(author => author.name).join(', ')}
            </CardDescription>
            <Button>Add to cart</Button>
        </CardFooter>
    </Card>
);

export default BookCard;