'use client';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
    Card ,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs";
import Link from "next/link";
export default function Login() {
    const router = useRouter();
  const goToHomePage = () => {
    router.push('/');
  };
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">
                        Login
                    </TabsTrigger>
                    <TabsTrigger value="register">
                        Register
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card className=" bg-slate-200 shadow-md rounded-2xl p-4">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-10">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="mb-2">User Name</Label>
                                <Input id="username" type="text" className="w-full h-[35px] rounded-2xl p-2"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="mb-2">Password</Label>
                                <Input id="password" type="password" className="w-full h-[35px] rounded-2xl p-2"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={goToHomePage} className="w-full space-y-4">
                                <Link href="/">
                                    Login
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>        
                </TabsContent>
                <TabsContent value="register">
                    <Card className=" bg-slate-200 shadow-md rounded-2xl p-4">
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-10">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="mb-2">User Name</Label>
                                <Input id="username" type="text" className="w-full h-[35px] rounded-2xl p-2"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="mb-2">Email</Label>
                                <Input id="email" type="email" className="w-full h-[35px] rounded-2xl p-2"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="mb-2">Password</Label>
                                <Input id="password" type="password" className="w-full h-[35px] rounded-2xl p-2"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={goToHomePage} className="w-full space-y-4">
                                    Register
                            </Button>
                        </CardFooter>
                    </Card>        
                </TabsContent>
            </Tabs>
        </div>
    );
}