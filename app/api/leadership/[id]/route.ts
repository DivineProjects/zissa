import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Leadership from "@/lib/models/leadership"

type Params = { params: Promise<{ id: string }> }

/* ── GET /api/leadership/[id] ───────────────────────────────────── */
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params

    const leader = await Leadership.findById(id).lean()

    if (!leader) {
      return NextResponse.json(
        { success: false, data: null, message: "Leader not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: leader,
      message: "Leader retrieved successfully",
    })
  } catch (error) {
    console.error("[GET /api/leadership/[id]]", error)
    return NextResponse.json(
      { success: false, data: null, message: "Failed to retrieve leader" },
      { status: 500 }
    )
  }
}

/* ── PUT /api/leadership/[id] ───────────────────────────────────── */
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()

    const updated = await Leadership.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean()

    if (!updated) {
      return NextResponse.json(
        { success: false, data: null, message: "Leader not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Leader updated successfully",
    })
  } catch (error) {
    console.error("[PUT /api/leadership/[id]]", error)
    return NextResponse.json(
      { success: false, data: null, message: "Failed to update leader" },
      { status: 500 }
    )
  }
}

/* ── DELETE /api/leadership/[id] ────────────────────────────────── */
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params

    /* Soft-delete: set isActive = false */
    const deleted = await Leadership.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).lean()

    if (!deleted) {
      return NextResponse.json(
        { success: false, data: null, message: "Leader not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: null,
      message: "Leader deactivated successfully",
    })
  } catch (error) {
    console.error("[DELETE /api/leadership/[id]]", error)
    return NextResponse.json(
      { success: false, data: null, message: "Failed to delete leader" },
      { status: 500 }
    )
  }
}