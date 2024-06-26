import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProfileSettingsProps {
    name: string,
    email: string
}

export default async function ProfileSettings({ name, email }: ProfileSettingsProps) {

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
                defaultValue={name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                type="email"
                className="w-full"
                defaultValue={email}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
}
