import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import { HiOutlineBookOpen } from "react-icons/hi";
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"

interface NavbarProps{
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
}
const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
    ({ onClick }, ref) => {
        return ( 
        <header className="w-full border-b-2 border-[#f0f0f0] bg-white border-solid fixed z-50">
            <div className="w-full h-[106px] grid grid-cols-3 items-center">
            <div className="flex items-center justify-center">
                <a href="/" className="flex items-center justify-center font-bold p-4"><HiOutlineBookOpen /> LitEars</a>
                <div className="flex items-center justify-center p-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger> EBooks </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                            <a
                                                className=""
                                                href="/"
                                            >
                                                book
                                            </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                            <a
                                                className=""
                                                href="/"
                                            >
                                                book
                                            </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                            <a
                                                className=""
                                                href="/"
                                            >
                                                book
                                            </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                            <a
                                                className=""
                                                href="/"
                                            >
                                                book
                                            </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                            <a
                                                className=""
                                                href="/"
                                            >
                                                book
                                            </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                            <a
                                                className=""
                                                href="/"
                                            >
                                                book
                                            </a>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
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