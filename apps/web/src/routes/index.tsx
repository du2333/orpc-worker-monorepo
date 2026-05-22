import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { orpc } from "@/lib/api/orpc";

const healthQueryOptions = orpc.health.check.queryOptions();
const greetingQueryOptions = orpc.example.greeting.queryOptions({
  input: {
    name: "Worker",
  },
});

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
  const health = useQuery(healthQueryOptions);
  const greeting = useQuery(greetingQueryOptions);

  return (
    <main className="app-shell">
      <section className="panel">
        <p className="eyebrow">Contract-first API boundary</p>
        <h1>oRPC Worker Monorepo</h1>
        <p className="summary">
          TanStack Start is calling an independent Cloudflare Worker API over HTTP through a shared
          oRPC contract and a thin client package.
        </p>
      </section>

      <section className="grid">
        <article>
          <span>Status</span>
          <strong>{health.data?.ok ? "Healthy" : "Checking..."}</strong>
          <p>
            {health.data
              ? `${health.data.service} at ${health.data.timestamp}`
              : "Loading API health."}
          </p>
        </article>

        <article>
          <span>Greeting</span>
          <strong>{greeting.data?.message ?? "Loading..."}</strong>
          <p>
            {greeting.data
              ? `Requested at ${greeting.data.requestedAt}`
              : "Waiting for the API response."}
          </p>
        </article>
      </section>
    </main>
  );
}
