import { Button } from "@/components/ui/button";
import { Trash, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUserFromSession } from "@/server/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

export default async function SettingsPage() {
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4 pb-10">
                <div className="flex items-center gap-4 mt-4">
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
                        Settings
                    </h1>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button variant="outline" size="sm">
                            Discard
                        </Button>
                        <Button size="sm">Save Changes</Button>
                    </div>
                </div>

                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-[60%_1fr] lg:gap-5">
                    <ProfileSettings/>
                    <AvatarSettings/>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                    <NotificationSettings/>
                    <SupportSettings/>
                  </div>
                  <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-[60%_1fr] lg:gap-8">
                    <DangerZone/>
                  </div>
                </div>

            </div>
        </main>
    )
}
  
export async function ProfileSettings() {
    const user = await getUserFromSession();

    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Edit Your Profile Details
          </CardDescription>
        </CardHeader>
        <CardContent className="py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                defaultValue={user?.name!}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                type="email"
                className="w-full"
                defaultValue={user?.email!}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
}

export async function AvatarSettings() {
    const user = await getUserFromSession();

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
                    <AvatarImage src={user?.image!}/>
                    <AvatarFallback>{user?.name?.at(0) || "D"}</AvatarFallback>
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

export async function NotificationSettings() {
  const user = await getUserFromSession();

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

export async function SupportSettings() {

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


export async function DangerZone() {

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