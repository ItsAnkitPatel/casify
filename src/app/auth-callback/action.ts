"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id || !user.email) {
    throw new Error("Invalid user data");
  }
  //check if the user exists in the database or not
  const existingUser = await db.user.findFirst({
    where: { id: user.id },
  });

  //create new entry in database
  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    });
  }
  return { success: true };
};
