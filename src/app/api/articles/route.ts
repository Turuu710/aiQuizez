import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { OpenAI } from "openai";
type Event = {
  type: string;
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email_addresses: { email_address: string }[];
  };
};
export async function GET(req: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing webhook secret" },
      { status: 400 },
    );
  }
  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-signature");
  const svixSignature = req.headers.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing headers" }, { status: 400 });
  }
  const webhook = new Webhook(webhookSecret);
  const body = await req.text();
  try {
    const event = webhook.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as Event;
    if (event.type !== "user.created") {
      return NextResponse.json({ error: "Ignore event" }, { status: 400 });
    }
    const { email_addresses, first_name, last_name, id } = event.data;
    await prisma.user.create({
      data: {
        email: email_addresses[0].email_address,
        name: `${first_name}${last_name}`,
        clerkId: id,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const article = await prisma.article.create({
      data: {
        title: "",
        content: "",
        summary: "",
        userId: "",
        id: Date.now().toString(),
      },
    });
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        input: `Extract the dish name and ingredients from: "${prompt}",`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HF API error:", response.status, errorText);
      return NextResponse.json(
        { error: errorText },
        {
          status: response.status,
        },
      );
    }
    const data = await response.json();
    const text = data.output[0].content[0].text;
    const formattedText = text.replace(/\\n/g, "");
    await prisma.article.update({
      where: { id: article.id },
      data: { content: formattedText },
    });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
