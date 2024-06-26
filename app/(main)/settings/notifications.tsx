import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch";
 

export default function NotificationSettings() {
  
    return (
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Notification Settings
                <Switch checked />
              </CardTitle>
              <CardDescription className="max-w-[90%]">
                Choose if you want to receive notifications via email from the DocGuard app about document expiration. 
                This setting is turned on by default.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <p>Email Notifications are currently</p>
              <span className="bg-black/20 text-black px-1.5 py-0.5 text-sm font-bold rounded-md">ON</span>
            </CardContent>
        </Card>
    )
  }