import UserDropdown from "./user-dropdown";

interface ProfilePictureProps {
    profilePicture: string,
    name: string
}

export default async function ProfilePicture({ profilePicture, name }: ProfilePictureProps) {


    return (
        <UserDropdown
            image={profilePicture}
            name={name}
        />
    )
}