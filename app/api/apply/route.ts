import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { jobTitle, company, name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  // Mock : log la candidature dans la console sans SMTP
  console.log("[EMAIL]", { subject: `Candidature : ${jobTitle} chez ${company}`, from: name, email, message });

  return NextResponse.json({ success: true });
}
