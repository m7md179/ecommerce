'use client'
import { useRouter } from "next/navigation";
import { HiOutlineBookOpen } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import  banner from "@/images/banner.jpg"
import { 
  Card ,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import{
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel"
import Navbar from "./components/Navbar";
import Image from "next/image";
export default function Home() {

  const router = useRouter();
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
          <Carousel
            opts={{ align: "start"}}
            className="w-full"
          >
            <CarouselContent>
            {Array.from({length: 10}).map((_, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
                <Card className="h-[300px] bg-slate-200 shadow-md rounded-2xl p-4 flex items-center justify-between flex-col">
                  <CardHeader className="space-y-10">
                    <CardTitle>Header</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      Pic
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center flex-col space-y-4 p-3">
                    <CardDescription>
                      Description
                    </CardDescription>
                    <Button>Add to cart</Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>
        </div>
      </section>
    </main>
  );
}
