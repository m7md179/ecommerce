import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import { HiOutlineBookOpen } from "react-icons/hi";
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react";



interface NavbarProps{
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
}
const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
    ({ onClick }, ref) => {
        return ( 
        <header className="w-full border-b-2 border-[#f0f0f0] bg-white border-solid fixed z-50">
            <div className="w-full h-[106px] grid grid-cols-3 items-center">
            <div className="flex items-center justify-center">
                <a href="#" className="flex items-center justify-center font-bold p-4"><HiOutlineBookOpen /> LitEars</a>
                <a href="#" className="flex items-center justify-center p-4">Ebooks</a>
                <a href="#" className="flex items-center justify-center p-4">Audiobooks</a>
            </div>
            <div className="flex items-center justify-center">
                <Input
                    type="search"
                    placeholder="Search"
                    className="flex-1 px-4 py-2 text-foreground bg-transparent border-none focus:outline-none"
                />
                <Button variant="ghost" size="icon" className="p-2 text-muted-foreground hover:bg-muted/50 rounded-md">
                    <SearchIcon className="w-5 h-5" />
                    <span className="sr-only">Search</span>
                </Button>
            </div>
            <div className="flex items-center justify-center">
                <Button onClick={onClick} className="w-[80px]">
                Login
                </Button>
            </div>
            </div>
        </header> 
        );
    }
);

export default Navbar;