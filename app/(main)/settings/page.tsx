import { Button } from "@/components/ui/button";
import { getUserFromSession } from "@/server/session";

import ProfileSettings from "./profile";
import DangerZone from "./danger-zone";
import NotificationSettings from "./notifications";
import SupportSettings from "./support";
import AvatarSettings from "./avatar";

export default async function SettingsPage() {
  const user = await getUserFromSession();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4 pb-10">
        <div className="flex items-center gap-4 mt-4">
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">Settings</h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Changes</Button>
            </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-[60%_1fr] lg:gap-5">
            <ProfileSettings name={user?.name!} email={user?.email!}/>
            <AvatarSettings name={user?.name!} image={user?.image!}/>
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
  






