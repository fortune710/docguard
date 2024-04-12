import findUsersDocuments  from "@/server/documents/findUsersDocuments"

export type Documents = Awaited<ReturnType<typeof findUsersDocuments>> 

