import findUsersDocuments  from "@/server/documents/findUsersDocuments"
import findUsersCards from "@/server/card/findUsersCards"

export type Documents = Awaited<ReturnType<typeof findUsersDocuments>> 
export type Cards = Awaited<ReturnType<typeof findUsersCards>>

