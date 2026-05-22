import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/lib/api/orpc";

export const viewerQueryOptions = orpc.example.viewer.queryOptions({});

export function useViewer() {
  const viewer = useQuery(viewerQueryOptions);

  return { viewer };
}
