import { NextResponse } from "next/server";
import connectDB  from "@/libs/db";
import Task from "@/models/taskModel";

//function get data by id
export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectDB();
    const data = await Task.findById(id);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

//function edit data
export async function PUT(req, { params }) {
  const { id } = params;
  const {
    judulBaru: judul,
    deskripsiBaru: deskripsi,
    statusBaru: status,
  } = await req.json();
  try {
    await Task.findByIdAndUpdate(id, { judul, deskripsi, status });
    return NextResponse.json({ message: "Task updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

//function delete data
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
