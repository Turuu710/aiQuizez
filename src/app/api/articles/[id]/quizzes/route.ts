// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(request: Request, { params }: { params: { id: string } }) {
//   const { id } = params;
//   try {
//     const article = await prisma.article.findUnique({
//       where: { id },
//     });
//     if (!article) {
//       return NextResponse.json({ error: "Article not found" }, { status: 404 });
//     }
//     // Continue with quiz creation logic
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 });
//   }
// }
