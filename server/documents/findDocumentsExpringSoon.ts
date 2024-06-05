import prisma from "@/lib/prisma";
import { cache } from "react";

const findDocumentsExpiringSoon = cache(async (userId: string) => {
  const now = new Date();
  const sixMonthsFromNow = new Date(now.setMonth(now.getMonth() + 6));

  const expiringSoonDocuments = await prisma.document.findMany({
    where: {
      user_id: userId,
      expiry_date: {
        lt: sixMonthsFromNow,
      },
    },
  });
  return expiringSoonDocuments;
});

export default findDocumentsExpiringSoon;
