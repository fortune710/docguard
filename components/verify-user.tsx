import { useState } from "react"
import DrawerOrDialog from "./drawer-or-dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { resetPasswordAction } from "@/app/actions";

interface VerifyUserProps {
    open: boolean,
    onOpenChange?: (open: boolean) => any,
    userEmail: string,
    resetPassword: boolean
}

const VerifyUser = ({ userEmail, resetPassword, ...props }: VerifyUserProps) => {

    const [code, setCode] = useState<string>("");
    const { toast } = useToast();
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    const moveToWelcome = () => router.push('/welcome')

    const handleSubmitCode = async () => {
        const response = await fetch(`/api/verify?code=${code}&user_email=${userEmail}`, {
            cache: "no-store"
        })
        if (response.status === 200) {
            const { data, message } = await response.json();
            if (!data.valid) {
                return toast({
                    title: "OTP Error",
                    description: message,
                    variant: "destructive"
                })
            }
            toast({
                title: "OTP Success",
                description: message
            })
            
            return !resetPassword ? moveToWelcome() : setVerified(true)
        }

        const { data, message } = await response.json();
        return toast({
            title: "Error with OTP",
            description: message,
            variant: "destructive"
        })
        
    }

    const handleResend = async () => {
        const response = await fetch(`/api/verify/resend?user_email=${userEmail}`)
        if (response.status === 200) {
            const { message } = await response.json();
            return toast({
                description: message,
                title: "Verification Resent"
            })
        }

        const { message } = await response.json();
        return toast({
            title: "Error with Resend",
            description: message,
            variant: "destructive"
        })
    }

    const reset = async (formData: FormData) => {
        try {
            await resetPasswordAction(userEmail, formData);
            toast({
                title: "Reset Successful",
                description: "Password reset done successfully"
            })
            return moveToWelcome()
        } catch {
            toast({
                title: "Error with Reset",
                description: "Password reset failed",
                variant: "destructive"
            })
        }
    }


    return (
        <AlertDialog {...props}>
            <AlertDialogContent>
                {
                    verified && resetPassword ?
                    <form className="space-y-3 animate-in" action={reset}>
                        <p className="text-xl font-ppmori font-medium">Enter the new password you want to use for DocGuard</p>
                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">Reset Password</Button>
                    </form>
                    :
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold font-inter">Verify Your Email</h2>
                        <InputOTP 
                            maxLength={6}
                            value={code}
                            onChange={(value) => setCode(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0}/> 
                                <InputOTPSlot index={1}/>            
                                <InputOTPSlot index={2}/>            
                                <InputOTPSlot index={3}/>            
                                <InputOTPSlot index={4}/>            
                                <InputOTPSlot index={5}/>                       
                            </InputOTPGroup>
                        </InputOTP>

                        <div className="text-sm">
                            Please enter the OTP sent to you email
                        </div>

                        <div className="space-y-2">
                            <Button onClick={handleSubmitCode}>
                                Verify Code
                            </Button>

                            <Button onClick={handleResend} variant="ghost">
                                Resend OTP
                            </Button>
                        </div>
                    </div>
                }

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default VerifyUser;