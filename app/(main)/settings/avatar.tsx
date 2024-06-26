import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash, Upload } from "lucide-react";

interface AvatarSettingsProps {
    image: string,
    name: string
}

export default function AvatarSettings({ name, image }: AvatarSettingsProps) {

    return (
        <Card>
            <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
                Accepted Formats: JPG, PNG, JPEG
            </CardDescription>
            </CardHeader>
            <CardContent className="py-0 flex items-center justify-between">
                <Avatar className="h-28 w-28">
                    <AvatarImage src={image!}/>
                    <AvatarFallback>{name?.at(0) || "D"}</AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-6">
                    <Button className="gap-2">
                        <Upload size={15}/>
                        Upload
                    </Button>
                    <Button className="gap-2" variant="outline">
                        <Trash size={15}/>
                        Delete
                    </Button>
                </div>

            </CardContent>
        </Card>
    )
}
