import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const articleId = params.id;

  const quizzes = await prisma.quiz.findMany({
    where: {
      articleId: articleId,
    },
  });

  return Response.json(quizzes);
}
