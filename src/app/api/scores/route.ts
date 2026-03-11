import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const scoreData = await request.json();
    const { userId, quizId, score } = scoreData;
    const newScore = await prisma.userScore.create({
      data: {
        userId,
        quizId,
        score,
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

export async function GET(request: Request) {}
