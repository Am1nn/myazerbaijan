import { NextResponse } from "next/server";
import { Resend } from "resend";

const recipient = "aminbennayevv@gmail.com";
const emailPattern = /^\S+@\S+\.\S+$/;
const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    const fields = [name, email, subject, message].map((value) => typeof value === "string" ? value.trim() : "");
    if (fields.some((value) => !value) || !emailPattern.test(fields[1])) return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
    const resend = new Resend(process.env.RESEND_API_KEY);
    const [safeName, safeEmail, safeSubject, safeMessage] = fields.map(escapeHtml);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "MyAzerbaijan <onboarding@resend.dev>", to: recipient, replyTo: fields[1],
      subject: `[MyAzerbaijan] ${fields[2].slice(0, 150)}`,
      html: `<h2>Yeni əlaqə mesajı</h2><p><strong>Ad:</strong> ${safeName}</p><p><strong>E-poçt:</strong> ${safeEmail}</p><p><strong>Mövzu:</strong> ${safeSubject}</p><p><strong>Mesaj:</strong></p><p>${safeMessage.replaceAll("\n", "<br>")}</p>`,
      text: `Ad: ${fields[0]}\nE-poçt: ${fields[1]}\nMövzu: ${fields[2]}\n\n${fields[3]}`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ delivered: true });
  } catch (error) {
    console.error("Contact email delivery failed:", error);
    return NextResponse.json({ error: "Message delivery failed" }, { status: 500 });
  }
}
