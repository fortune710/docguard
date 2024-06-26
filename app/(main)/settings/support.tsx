import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";


export default function SupportSettings() {

    return (
        <Card>
            <CardHeader>
              <CardTitle>
                Support
              </CardTitle>
              <CardDescription className="max-w-[90%]">
                Give your valued feedback on DocGuard via a short survey so we can make it a better app for you!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Button>
                Give Your Feedback
              </Button>
            </CardContent>
        </Card>
    )
  }