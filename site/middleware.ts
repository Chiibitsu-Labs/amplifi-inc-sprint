import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "./lib/config";
import { verifySessionToken } from "./lib/session";

export const config = {
  // pdfs is deliberately NOT excluded here: site/public/pdfs/ holds the five
  // real client deliverables, linked as "Download PDF" from each gated page
  // (site/content/d1.ts..d5.ts) -- they need the same session gate as the
  // pages that link them, not the same public-static treatment as fonts/logos.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logos|fonts).*)"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes — no gate. /onboard is distributed to the whole Amplifi
  // analyst team to set themselves up; a password wall on it is friction on
  // the one page where friction actually costs us (nobody onboards). It
  // contains no client data — the Drive link inside is permission-controlled
  // by Google, so access to the corpus is enforced there, not here.
  if (
    pathname === "/access" ||
    pathname === "/api/access" ||
    pathname === "/onboard"
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const ok = await verifySessionToken(token);

  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/access";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
