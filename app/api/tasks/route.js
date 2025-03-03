import connectDB from "@/libs/db";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  if (!body.judul || !body.deskripsi || !body.status) {
    return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
  }

  try {
    await connectDB();
    const data = await Task.create(body);
    return NextResponse.json({ message: "data berhasil dibuat", data }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  try {
    await connectDB();
    const data = await Task.find();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}