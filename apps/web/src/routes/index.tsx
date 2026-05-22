import { createFileRoute } from "@tanstack/react-router";

import { GreetingCard } from "@/features/example/components/greeting-card";
import { HealthPanel } from "@/features/health/components/health-panel";
import { healthQueryOptions } from "@/features/health/hooks/use-health";
import { greetingQueryOptions } from "@/features/example/hooks/use-example";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(healthQueryOptions),
      context.queryClient.ensureQueryData(greetingQueryOptions),
    ]);
  },
  component: Home,
});

function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 p-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">oRPC Worker Monorepo</h1>
        <p className="text-sm text-neutral-600">
          TanStack Start calling an independent Cloudflare Worker API via oRPC contract.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <HealthPanel />
        <GreetingCard />
      </section>
    </div>
  );
}
