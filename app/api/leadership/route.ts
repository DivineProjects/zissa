import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Leadership from "@/lib/models/leadership"

/* ── GET /api/leadership ─────────────────────────────────────────── */
export async function GET() {
  try {
    await connectDB()

    const leaders = await Leadership.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: leaders,
      message: "Leadership retrieved successfully",
    })
  } catch (error) {
    console.error("[GET /api/leadership]", error)
    return NextResponse.json(
      { success: false, data: null, message: "Failed to retrieve leadership" },
      { status: 500 }
    )
  }
}

/* ── POST /api/leadership ────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()

    /* Basic validation */
    if (!body.name || !body.position || !body.biography) {
      return NextResponse.json(
        { success: false, data: null, message: "name, position, and biography are required" },
        { status: 400 }
      )
    }

    const leader = await Leadership.create(body)

    return NextResponse.json(
      { success: true, data: leader, message: "Leader created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("[POST /api/leadership]", error)
    return NextResponse.json(
      { success: false, data: null, message: "Failed to create leader" },
      { status: 500 }
    )
  }
}