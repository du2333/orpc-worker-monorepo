import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { greetingQueryOptions } from "../hooks/use-example";

export function GreetingCard() {
  const [name, setName] = useState("Worker");
  const greeting = useQuery(greetingQueryOptions(name));

  return (
    <article>
      <span>Greeting</span>
      <strong>{greeting.data?.message ?? "Loading..."}</strong>
      <p>
        {greeting.data
          ? `Requested at ${greeting.data.requestedAt}`
          : "Waiting for the API response."}
      </p>

      <label className="mt-3 block space-y-1">
        <span className="text-xs font-medium text-neutral-500">Name</span>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </label>
    </article>
  );
}
