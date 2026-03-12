import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function POST(request: Request) {

//   const articles = await prisma.article.findMany();
//   return NextResponse.json(articles, { status: 200 });
//   // const { id } = params;
//   // try {
//   //   const article = await prisma.article.findUnique({
//   //     where: { id },
//   //   });
//   //   return NextResponse.json({ article }, { status: 200 });
//   // } catch (error) {
//   //   return NextResponse.json(
//   //     { error: "Failed to create quiz" },
//   //     { status: 500 },
//   //   );
//   // }
// }


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const articles = await prisma.article.findMany();

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}