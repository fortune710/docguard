import findUsersDocuments  from "@/server/documents/findUsersDocuments"
import findUsersCards from "@/server/card/findUsersCards"
import getUserWithEmail from "@/server/users/getUserWithEmail"

export type Documents = Awaited<ReturnType<typeof findUsersDocuments>> 
export type Cards = Awaited<ReturnType<typeof findUsersCards>>
export type User = Awaited<ReturnType<typeof getUserWithEmail>>

export type TUpdateUser = User & { password: string }



