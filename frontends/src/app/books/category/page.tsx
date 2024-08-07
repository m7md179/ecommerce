'use client'
import Navbar from "@/app/components/Navbar"
import ScrollItems from "@/app/components/ScrollItems";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Category() {
    const router = useRouter();
    const goToLoginPage = () => {
      router.push('/login');
    };

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
                    <ScrollItems/>
                </div>
                <div className="w-2/3 my-10">
                    <div className="flex items-center justify-between">
                        <p className="text-xl">Mystery Ebooks</p>
                        <Button variant="link"><a href="/">View all</a></Button>
                    </div>
                    <ScrollItems/>
                </div>
                <div className="w-2/3 my-10">
                    <div className="flex items-center justify-between">
                        <p className="text-xl">Thriller Ebooks</p>
                        <Button variant="link"><a href="/">View all</a></Button>
                    </div>
                    <ScrollItems/>
                </div>
                
            </section>
            
        </main>
    );
}