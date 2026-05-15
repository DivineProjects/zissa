import { NextRequest, NextResponse } from "next/server"
import { UTApi } from "uploadthing/server"
import { connectDB } from "@/lib/db"
import Leadership from "@/lib/models/leadership"

const utapi = new UTApi()

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

    /*
      If a new image is being set and the old imageKey differs,
      delete the old UploadThing file before saving the new one.
    */
    if (body.imageKey) {
      const existing = await Leadership.findById(id).select("imageKey").lean()
      if (existing?.imageKey && existing.imageKey !== body.imageKey) {
        try {
          await utapi.deleteFiles(existing.imageKey)
        } catch (e) {
          console.warn("[PUT] Old image deletion failed:", e)
        }
      }
    }

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

/* ── DELETE /api/leadership/[id] ────────────────────────────────────
   Steps:
   1. Fetch the record to get the UploadThing imageKey
   2. Delete the file from UploadThing via UTApi
   3. Hard-delete the MongoDB document
─────────────────────────────────────────────────────────────────── */
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params

    const leader = await Leadership.findById(id)
    if (!leader) {
      return NextResponse.json(
        { success: false, data: null, message: "Leader not found" },
        { status: 404 }
      )
    }

    /* Delete image from UploadThing if a key is stored */
    if (leader.imageKey) {
      try {
        await utapi.deleteFiles(leader.imageKey)
      } catch (e) {
        /* Log but don't block the DB delete — file may already be gone */
        console.warn("[DELETE] UploadThing file removal failed:", e)
      }
    }

    /* Hard-delete from MongoDB */
    await Leadership.findByIdAndDelete(id)

    return NextResponse.json({
      success: true,
      data: null,
      message: "Leader and image deleted successfully",
    })
  } catch (error) {
    console.error("[DELETE /api/leadership/[id]]", error)
    return NextResponse.json(
      { success: false, data: null, message: "Failed to delete leader" },
      { status: 500 }
    )
  }
}