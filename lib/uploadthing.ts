import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  leadershipImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      /* Add auth here if needed — e.g. check session */
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      /* Called server-side after upload succeeds.
         Return value is forwarded to the client via onClientUploadComplete. */
      return { url: file.ufsUrl, key: file.key }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter