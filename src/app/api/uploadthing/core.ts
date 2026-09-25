import { requireActiveContext } from "@/lib/auth/required-active-context";
import probe from "probe-image-size";
import { createUploadthing } from "uploadthing/next";
import { UploadThingError, UTFiles } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  mediaUploader: f(
    {
      image: {
        maxFileCount: 1,
        maxFileSize: "1MB",
      },
    },
    {
      awaitServerData: true,
    }
  )
    .middleware(async ({ files }) => {
      const context = await requireActiveContext();

      if (!(context.user && context.organization && context.membership)) {
        throw new UploadThingError("Unauthorized");
      }

      const overrides = files.map((file) => {
        const uuid = crypto.randomUUID();
        const ext = file.name.split(".").pop();
        const name = `${uuid}${ext ? `.${ext}` : ""}`;

        return { ...file, name };
      });

      return {
        organizationId: context.organization.organizationId,
        userId: context.user.userId,
        [UTFiles]: overrides,
      };
    })
    .onUploadComplete(async ({ file }) => {
      try {
        let width: number | undefined;
        let height: number | undefined;

        if (file.type === "image/svg+xml") {
          height = undefined;
          width = undefined;
        } else {
          const dimensions = await probe(file.ufsUrl);

          if (dimensions) {
            ({ width, height } = dimensions);
          }
        }

        // const input = insertMediaSchema.parse({
        //   height,
        //   key: file.key,
        //   mimeType: file.type,
        //   name: file.name,
        //   size: file.size,
        //   ufsUrl: file.ufsUrl,
        //   width,
        // });

        // const data = await insertMediaUserCase({
        //   input,
        //   organizationId: metadata.organizationId,
        //   userId: metadata.userId,
        // });

        // return {
        //   height: data.height,
        //   key: data.key,
        //   mediaId: data.mediaId,
        //   mimeType: data.mimeType,
        //   name: data.name,
        //   size: data.size,
        //   ufsUrl: data.ufsUrl,
        //   userId: data.uploadedBy,
        //   width: data.width,
        // };

        return {
          height,
          key: file.key,
          mimeType: file.type,
          name: file.name,
          size: file.size,
          ufsUrl: file.ufsUrl,
          width,
        };
      } catch (error) {
        throw new Error("Upload failed", {
          cause: error,
        });
      }
    }),
};

export type OurFileRouter = typeof uploadRouter;
