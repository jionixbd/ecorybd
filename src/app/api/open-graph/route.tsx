import { ImageResponse } from "next/og";
import { connection } from "next/server";

export async function GET() {
  await connection();
  try {
    return new ImageResponse(
      <div tw="flex w-full h-full bg-slate-300 p-2">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(248,250,252,0.5) 10%, rgba(248,250,252,0.6) 100%), url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(9 9 11 / .3)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e)",
          }}
          tw="w-full h-full p-8 flex flex-col items-start justify-between flex-wrap rounded-lg"
        >
          <div tw="flex flex-col items-start justify-start">
            <div
              style={{
                fontFamily: "geist-bold",
              }}
              tw="text-9xl tracking-tighter text-slate-800 uppercase"
            >
              AletheiaSpire
            </div>
            <div
              style={{
                fontFamily: "geist-regular",
              }}
              tw="text-2xl tracking-wide text-slate-700 uppercase"
            >
              A platform for aspiring developers to learn and grow.
            </div>
          </div>

          <div tw="flex items-center justify-between ml-1.5">
            {/* GITHUB */}
            <div tw="flex items-center mr-8">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title tw="hidden">GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>

              <span
                style={{
                  fontFamily: "geist-mono-regular",
                }}
                tw="text-2xl leading-6 text-slate-800 ml-2"
              >
                sizarcorpse
              </span>
            </div>

            {/* X */}
            <div tw="flex items-center mr-8">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title tw="hidden">X</title>
                <path
                  d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                  xmlns="http://www.w3.org/2000/svg"
                />
              </svg>

              <span
                style={{
                  fontFamily: "geist-mono-regular",
                }}
                tw="text-2xl leading-6 text-slate-800 ml-2"
              >
                sizarcorpse
              </span>
            </div>

            {/* WEBSITE */}
            <div tw="flex items-center">
              <svg
                fill="none"
                role="img"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title tw="hidden">LinkedIn</title>
                <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                <circle cx="12" cy="12" r="10" />
              </svg>

              <span
                style={{
                  fontFamily: "geist-mono-regular",
                }}
                tw="text-2xl leading-6 text-slate-800 ml-2"
              >
                sizar.dev
              </span>
            </div>
          </div>
        </div>
      </div>,
      {
        height: 630,
        width: 1200,
      }
    );
  } catch {
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
