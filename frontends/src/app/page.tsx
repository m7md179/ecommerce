'use client'
import { useRouter } from "next/navigation";
import { HiOutlineBookOpen } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import  banner from "@/images/banner.jpg"
import ScrollItems from "./components/ScrollItems"
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
          <ScrollItems/>
        </div>
      </section>
    </main>
  );
}
