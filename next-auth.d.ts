import NextAuth, { DefaultSession, User } from "next-auth";

export type ExtendedSession = DefaultSession["user"] & {
  favoriteIds: string[];
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedSession;
  }
}
