import getUserWithEmail from "@/server/users/getUserWithEmail";
import { checkVerification } from "@/server/verification/checkVerification";
import { updateVerification } from "@/server/verification/updateVerification";
import { sendVerificationEmail } from "@/services/emails/sendVerificationEmail";
import { generateOTP } from "@/utils/functions";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const otp = generateOTP()!;
    const user_email = searchParams.get("user_email")!;

    if (!otp || !user_email) {
        return Response.json({
            data: null,
            message: "otp or user_email not present in query params"
        }, { status: 400 })
    }

    try {
        const user = await getUserWithEmail(user_email)!
        const [_, email] = await Promise.all([
            await updateVerification(user?.id!, otp),
            await sendVerificationEmail(user?.email!, otp)
        ])

        console.log(email)

        return Response.json({
            daat: null,
            message: "OTP resent successfully"
        }, { status: 200 })
    } catch (err) {
        return Response.json({
            data: null,
            message: String(err)
        }, { status: 500 })
    }

}