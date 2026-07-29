import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./service/getNewAccessToken";
import { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PUBLIC_ROUTES = ["/", "/property"];

const routeMatches = (route: string, pathName: string) =>
  pathName === route || pathName.startsWith(`${route}/`);

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
      )
    : null;
  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET as string,
      )
    : null;

  // get new access token by refresh token if token expires or corrupted
  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.accessToken;
      cookieStore.set("accessToken", result.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });
      accessToken = newAccessToken;
      decodedAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
      );
    }
  }

  let userRole = null;

  if (decodedAccessToken?.success && typeof decodedAccessToken !== "string") {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }
  console.log("🚀 ~ proxy ~ userRole:", userRole);

  // if user is authenticated but he is trying to go to auth route then redirect them
  if (
    accessToken &&
    AUTH_ROUTES.some((route) => routeMatches(route, pathName))
  ) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    } else if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard/tenant", request.url));
    } else if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/dashboard/landlord", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    routeMatches(route, pathName),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    routeMatches(route, pathName),
  );

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/auth/login", request.url);

    loginUrl.searchParams.set("redirectTo", pathName);
    return NextResponse.redirect(loginUrl);
  }

  if (pathName.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathName.startsWith("/dashboard/admin") && userRole != "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathName.startsWith("/dashboard/landlord") &&
    userRole !== "LANDLORD"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
