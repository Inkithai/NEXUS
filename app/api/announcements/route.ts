import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const announcementSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(2000),
});

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const announcements = await prisma.announcement.findMany({
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(announcements);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("session");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = announcementSchema.parse(body);

    const announcement = await prisma.announcement.create({
      data: {
        title: validated.title,
        content: validated.content,
        authorId: session.value,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
  }
}
