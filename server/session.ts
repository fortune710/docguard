import { getServerSession as nextServerSession } from "next-auth";

import { cache } from "react";
import getUser from "./users/getUser";

export const getServerSession = cache(async () => {
    const session = await nextServerSession();
    return session;
});

export const getUserFromSession = cache(async () => {
    const session = await nextServerSession();
    const user = await getUser(session?.user.email!);
    return user;
})
