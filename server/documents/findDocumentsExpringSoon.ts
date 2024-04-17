import prisma from "@/lib/prisma";
import { cache } from "react";

const findDocumentsExpiringSoon = cache(async () => {
  const now = new Date();
  const threeMonthsFromNow = new Date(now.setMonth(now.getMonth() + 3));

  const expiringSoonDocuments = await prisma.document.findMany({
    where: {
      expiry_date: {
        lt: threeMonthsFromNow,
        gte: now
      }
    }
  });

  return expiringSoonDocuments;
})

export default findDocumentsExpiringSoon;