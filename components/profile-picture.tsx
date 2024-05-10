import { getUserFromSession } from "@/server/session"
import UserDropdown from "./user-dropdown";


export default async function ProfilePicture() {

    const user = await getUserFromSession();

    return (
        <UserDropdown
            image={user?.image!}
            name={user?.name!}
        />
    )
}