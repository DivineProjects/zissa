import { generateReactHelpers } from "@uploadthing/react"
import type { OurFileRouter } from "@/lib/uploadthing"

/**
 * Typed React helpers for UploadThing.
 * Import useUploadThing in any client component that needs to upload files.
 *
 * Usage:
 *   const { startUpload, isUploading } = useUploadThing("leadershipImage", {
 *     onClientUploadComplete: (res) => { ... },
 *     onUploadError: (err) => { ... },
 *   })
 */
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()