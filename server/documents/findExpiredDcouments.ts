import prisma from "@/lib/prisma";
import { cache } from "react";

const findExpiredDocumets  = cache(async () => {
    const now = new Date();
    const expiredDocuments = await prisma.document.findMany({
      where: {
        expiry_date: {
          lt: now
        }
      }
    });
  
    return expiredDocuments;
})

export default findExpiredDocumets;