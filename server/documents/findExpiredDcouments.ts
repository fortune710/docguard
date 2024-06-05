import prisma from "@/lib/prisma";
import { cache } from "react";

const findExpiredDocumets  = cache(async (userId: string) => {
    const now = new Date();
    const expiredDocuments = await prisma.document.findMany({
      where: {
        user_id: userId,
        expiry_date: {
          lt: now
        }
      }
    });
  
    return expiredDocuments;
})

export default findExpiredDocumets;