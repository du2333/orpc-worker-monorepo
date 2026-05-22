import { useQuery } from "@tanstack/react-query";

import { healthQueryOptions } from "../hooks/use-health";

export function HealthPanel() {
  const health = useQuery(healthQueryOptions);

  return (
    <article>
      <span>Status</span>
      <strong>{health.data?.ok ? "Healthy" : "Checking..."}</strong>
      <p>
        {health.data ? `${health.data.service} at ${health.data.timestamp}` : "Loading API health."}
      </p>
    </article>
  );
}
