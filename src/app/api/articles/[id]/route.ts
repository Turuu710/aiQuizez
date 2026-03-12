import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } },
// ) {
//   // const articleId = params.id;

//   // const quizzes = await prisma.quiz.findMany({
//   //   where: {
//   //     articleId: articleId,
//   //   },
//   // });

//   // return Response.json(quizzes);
// }

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const articles = await prisma.article.findMany();

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
