import getUserWithEmail from "@/server/users/getUserWithEmail";
import { checkVerification } from "@/server/verification/checkVerification";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const otp = searchParams.get("code")!;
    const user_email = searchParams.get("user_email")!;

    if (!otp || !user_email) {
        return Response.json({
            data: null,
            message: "otp or user_email not present in query params"
        }, { status: 400 })
    }

    try {
        const user = await getUserWithEmail(user_email)!
        const { valid, message } = await checkVerification(user?.id!, otp);
        return Response.json({
            data: { valid },
            message
        }, { status: 200 })
    } catch (err) {
        return Response.json({
            data: null,
            message: String(err)
        }, { status: 500 })
    }

}