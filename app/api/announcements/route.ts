import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("session");
  if (!cookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // Fetch announcements ordered by createdAt desc
  return NextResponse.json([]);
}
export async function POST(req: NextRequest) {
  const cookie = req.cookies.get("session");
  if (!cookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    if (!body.title || !body.content) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    return NextResponse.json({ id: "1", title: body.title, content: body.content }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
