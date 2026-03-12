import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId, quizId, score } = await request.json();
    // const { userId, quizId, score } = scoreData;
    const newScore = await prisma.userScore.create({
      data: {
        userId: "",
        quizId: "",
        score: 0,
      },
    });
    return NextResponse.json(newScore, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create score" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get("quizId");
    if (!quizId) {
      return NextResponse.json({ error: "Missing quizId" }, { status: 400 });
    }
    const scores = await prisma.userScore.findMany({
      where: { quizId },
      orderBy: { score: "desc" },
      take: 10,
    });
    return NextResponse.json(scores, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 },
    );
  }
}
