"use client";

import { Input } from "@/components/ui/input";
//import { label } from "@/components/ui/label";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { FaGoogle } from "react-icons/fa6";
import { sendVerificationEmail } from "@/services/emails/sendVerificationEmail";
import VerifyUser from "./verify-user";
import { useSearchParams } from "next/navigation";

interface AuthFormProps {
  type: "login" | "sign-up" | "forgot-password";
}

const defaultVerificationState = {
  open: false,
  email: ""
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { toast } = useToast();
  const [showVerification, setShowVerification] = useState(defaultVerificationState);
  const searchParams = useSearchParams();
  
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { email, name, password } = Object.fromEntries(formData.entries());

    switch (type) {
      case "login":
        await signIn("credentials", { email, password, callbackUrl: "/home" });

        break;
      case "sign-up":
        await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ name, password, email }),
          cache: "no-store",
        });
        setShowVerification({ open: true, email: email.toString() })

        toast({
          title: "Successful Sign Up",
          description: "Check your email to verify your account",
        });
        break;
      case "forgot-password":
        break;
      default:
        throw Error("Not a valid form prop");
        break;
    }
  };

  if (type === "login") {
    return (
      <>
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
              <Input type="password" name="password" className="h-11" />
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <Link href="/forgot-password">Forgot Password</Link>
          </div>

          <Button className="w-full text-lg h-12">Login</Button>

          <Button
            variant="outline"
            className="w-full text-lg h-12 gap-3"
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            type="button"
          >
            <FaGoogle />
            Sign In With Google
          </Button>
        </form>

        <VerifyUser
          open={!!searchParams.get('unauthorized')}
          userEmail={searchParams.get('email') ?? ''}
        />
      
      </>
    );
  } else if (type === "sign-up") {
    return (
      <>
        <form
          className="flex flex-col items-center gap-7"
          onSubmit={onSubmitHandler}
        >
          <div className="flex flex-col w-full gap-5">
            <div>
              <label>Name</label>
              <Input placeholder="John Doe" name="name" className="h-11" />
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
              <Input type="password" name="password" className="h-11" />
            </div>
          </div>

          <Button className="w-full text-lg h-12">Sign Up</Button>
        </form>
      
        <VerifyUser
          open={showVerification.open}
          userEmail={showVerification.email}
        />
      </>
    );
  }
};

export default AuthForm;
