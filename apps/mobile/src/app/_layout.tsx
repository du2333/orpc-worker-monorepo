import { Stack } from "expo-router";

import { QueryProvider } from "@/integrations/tanstack-query/query-provider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack />
    </QueryProvider>
  );
}
