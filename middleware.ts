import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import authConfig from "./app/api/(lib)/auth/[...nextauth]/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Memeriksa apakah permintaan untuk API autentikasi
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Memeriksa apakah permintaan untuk route publik atau route yang memerlukan autentikasi
  const isPublicRoute = publicRoutes.some((route) => {
    if (route instanceof RegExp) {
      return route.test(nextUrl.pathname);
    }
    return (
      nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
    );
  });
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Jika permintaan untuk API autentikasi, lanjutkan ke middleware selanjutnya
  if (isApiAuthRoute) {
    return null;
  }

  // Handle route yang memerlukan autentikasi
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // Jika user belum login dan mengakses halaman private, maka akan mendapatkan callbackUrl untuk login berikutnya
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // Kembalikan null untuk pengguna yang sudah masuk yang mengakses public route
  return null;
});

// Regex untuk menentukan route di mana middleware tidak harus dipanggil
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
