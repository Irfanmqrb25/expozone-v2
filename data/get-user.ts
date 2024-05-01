import { auth } from "@/app/api/(lib)/auth/[...nextauth]/auth";

export const getCurrentUser = async () => {
  const session = await auth();

  return session?.user;
};
