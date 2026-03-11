import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create quiz" },
      { status: 500 },
    );
  }
}
