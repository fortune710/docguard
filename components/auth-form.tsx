'use client'

import { Input } from "@/components/ui/input";
//import { label } from "@/components/ui/label";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { Button } from "./ui/button";

interface AuthFormProps {
    type: "login"|"sign-up"|"forgot-password"
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const { email, name, password } = Object.fromEntries(formData.entries());

        switch(type) {
            case "login":
                signIn("credentials", { email, password, callbackUrl: "/home" });
                break;
            case "sign-up":
                break;
            case "forgot-password":
                break;
            default:
                throw Error("Not a valid form prop");
                break;
        }
    }


    if (type === "login") {
        return (
            <form 
                className="flex flex-col items-center gap-7" 
                onSubmit={onSubmitHandler}
            >
                <div className="flex flex-col w-full gap-5">
                    <div>
                        <label>Email</label>
                        <Input
                            placeholder="name@example.com"
                            type="email"
                            name="email"
                            className="h-11"
                        />
                    </div>
        
                    <div>
                        <label>Password</label>
                        <Input
                            type="password"
                            name="password"
                            className="h-11"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                        <Input
                            type="checkbox" 
                            name="remember-me"
                            className="w-3 h-3"
                        />
                        <label htmlFor="remember-me">
                            Remember Me
                        </label>
                    </div>

                    <Link href="/forgot-password">
                        Forgot Password
                    </Link>
                </div>

                <Button className="w-full text-lg h-12">
                    Login
                </Button>
    
            </form>
        )
    }

    else if (type === "sign-up") {
        return (
            <form
                className="flex flex-col items-center gap-7"
                onSubmit={onSubmitHandler}
            >
                <div className="flex flex-col w-full gap-5">
                    <div>
                        <label>Name</label>
                        <Input
                            placeholder="John Doe"
                            name="name"
                            className="h-11"
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <Input
                            placeholder="name@example.com"
                            type="email"
                            name="email"
                            className="h-11"
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <Input
                            type="password"
                            name="password"
                            className="h-11"
                        />
                    </div>
                </div>

                <Button className="w-full text-lg h-12">
                    Sign Up
                </Button>
            </form>
        )
    }
}

export default AuthForm;