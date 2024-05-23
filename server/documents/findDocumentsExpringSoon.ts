import prisma from "@/lib/prisma";
import { cache } from "react";

const findDocumentsExpiringSoon = cache(async () => {
  const now = new Date();
  const sixMonthsFromNow = new Date(now.setMonth(now.getMonth() + 6));

  const expiringSoonDocuments = await prisma.document.findMany({
    where: {
      expiry_date: {
        lt: sixMonthsFromNow,
      },
    },
  });
  console.log(expiringSoonDocuments);
  return expiringSoonDocuments;
});

export default findDocumentsExpiringSoon;
