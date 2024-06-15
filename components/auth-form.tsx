"use client";

import { Input } from "@/components/ui/input";
//import { label } from "@/components/ui/label";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { FaGoogle } from "react-icons/fa6";
import VerifyUser from "./verify-user";
import { useSearchParams } from "next/navigation";
import { emailSchema, nameSchema, passwordSchema } from "@/lib/schema";
import { ZodError } from "zod";

interface AuthFormProps {
  type: "login" | "sign-up" | "forgot-password";
}

const defaultVerificationState = {
  open: false,
  email: "",
  reset: false
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { toast } = useToast();
  const [showVerification, setShowVerification] = useState(defaultVerificationState);
  const searchParams = useSearchParams();
  const moveToWelcome = searchParams.get('next') === 'welcome';

  
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let { email: formEmail, name: formName, password: formPassword } = Object.fromEntries(formData.entries());

    try {
      
      switch (type) {
        case "login":
          let [loginEmail, loginPassword] = await Promise.all([
            await emailSchema.parseAsync(formEmail),
            await passwordSchema.parseAsync(formPassword),
          ])    
          const res = await signIn("credentials", { 
            email: loginEmail, 
            password: loginPassword, 
            callbackUrl: !moveToWelcome ? "/home" : "/welcome",
             
          });

          if (!!searchParams.get('error')) {
            return toast({
              title: "Sign In Error",
              description: searchParams.get('error') || "An error occurred",
              variant: "destructive"
            })
          }
          
          break;
        case "sign-up":
          let [signUpEmail, signUpPassword, name] = await Promise.all([
            await emailSchema.parseAsync(formEmail),
            await passwordSchema.parseAsync(formPassword),
            await nameSchema.parseAsync(formName)
          ])

          await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, password: signUpPassword, email: signUpEmail }),
            cache: "no-store",
          });
          setShowVerification({ open: true, email: signUpEmail, reset: false })
  
          toast({
            title: "Successful Sign Up",
            description: "Check your email to verify your account",
          });
          break;
        case "forgot-password":

        let [forgotPasswordEmail] = await Promise.all([
          await emailSchema.parseAsync(formEmail)
        ])

        await fetch("/api/users/forgot", {
          method: "POST",
          body: JSON.stringify({ email: forgotPasswordEmail }),
          cache: "no-store",
        });

        return setShowVerification({ open: true, email: forgotPasswordEmail, reset: true })
        default:
          throw Error("Not a valid form prop");
      }
    } catch (err: any) {
      if (err instanceof ZodError) {
        return err.errors.map((error) => {
          return toast({
            title: "Validation Error",
            description: error.message,
            variant: "destructive"
          })
        })
      }

      return toast({
        title: "Error",
        description: err.message ?? "An error occurred while sign up"
      })
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
          resetPassword={!!searchParams.get('reset')}
        />
      
      </>
    );
  } else if (type === "sign-up") {
    return (
      <>
        <form
          className="flex flex-col items-center gap-7 md:w-2/3 lg:w-1/3 md:mx-auto"
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
          resetPassword={false}
        />
      </>
    );
  }

  else if (type === "forgot-password") {
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

          </div>

          <Button className="w-full text-lg h-12">Confirm Email</Button>
        </form>
      
        <VerifyUser
          open={showVerification.open}
          userEmail={showVerification.email}
          resetPassword={showVerification.reset}
        />

      </>
    )
  }
};

export default AuthForm;
