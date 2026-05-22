import { useEffect, useState } from "react";

import { handleORPCError } from "@/lib/api/error-handler";
import { useViewer } from "../hooks/use-viewer";

export function ViewerCard() {
  const { viewer } = useViewer();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (viewer.error) {
      handleORPCError(viewer.error, {
        defined: {
          UNAUTHORIZED: () => setErrorMessage("Authentication is required for this endpoint."),
        },
        fallback: (unknownError) => {
          setErrorMessage(
            unknownError instanceof Error ? unknownError.message : "Something went wrong.",
          );
        },
      });
    }
  }, [viewer.error]);

  return (
    <article>
      <span>Viewer (typed error demo)</span>

      {viewer.isPending ? <strong>Checking auth...</strong> : null}

      {errorMessage ? (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">{errorMessage}</p>
      ) : null}

      {viewer.data ? (
        <>
          <strong>Authenticated</strong>
          <p>
            User: {viewer.data.userId}
            {viewer.data.sessionId ? ` / Session: ${viewer.data.sessionId}` : ""}
          </p>
          <p>Scopes: {viewer.data.scopes.join(", ")}</p>
        </>
      ) : null}
    </article>
  );
}
