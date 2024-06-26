import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";


export default function DangerZone() {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-red-500">
                    Danger Zone
                </CardTitle>
                <CardDescription className="max-w-[90%] text-red-500">
                    Anything done at this point is most likey irreversible. Be sure about your decision before you proceed. Contact me at {" "}
                <a href="mailto:fortunealebiosu710@gmail.com" className="font-semibold">fortunealebiosu710@gmail.com</a> for any questions
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
                <Button variant="destructive">
                    Delete Your Account
                </Button>
            </CardContent>
        </Card>
    )
}