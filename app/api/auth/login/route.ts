import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.email || !body.password) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    // Auth logic: validate, compare hash, set cookie
    const res = NextResponse.json({ ok: true });
    res.cookies.set("session", "token", { httpOnly: true, secure: true, sameSite: "strict" });
    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
