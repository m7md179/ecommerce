'use client'
import { useRouter } from "next/navigation";
import { HiOutlineBookOpen } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
export default function Home() {

  const router = useRouter();
  const goToLoginPage = () => {
    router.push('/login');
  };
  return (
    <main>
      <header className="border-b-2 border-[#f0f0f0] border-solid">
        <div className="w-[100vw] h-[106px] grid grid-cols-3 items-center">
          <div className="flex items-center justify-center">
            <a href="#" className="flex items-center justify-center font-bold p-4"><HiOutlineBookOpen /></a>
            <a href="#" className="flex items-center justify-center p-4">ABOUT</a>
          </div>
          <div className="flex items-center justify-center ">
            <input type="text" className="w-[500px] h-[35px] rounded-2xl p-2 bg-gray-200" placeholder="Search..." />
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={goToLoginPage} className="w-[80px]">
              Login
            </Button>
          </div>
        </div>
      </header>
      <section className=" flex flex-col items-center justify-center">
          <div className="w-full h-[600px] bg-slate-200">

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
