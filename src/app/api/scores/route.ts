import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const quiz = await prisma.quiz.create({
      data: {
        id: Date.now().toString(),
        question: "",
        options: [],
        answer: "",
        articleId: "",
      },
    });
    return NextResponse.json(
      { message: "Quiz create success", quiz },
      { status: 200 },
    );
  } catch (error) {
    return new Response("Not available to create user!!!", { status: 400 });
  }
}

export async function GET(request: Request) {}
