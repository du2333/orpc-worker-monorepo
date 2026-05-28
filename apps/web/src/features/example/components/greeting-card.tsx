import { useQuery } from "@tanstack/react-query";

import { greetingsQueryOptions } from "../hooks/use-example";
import { GreetingForm } from "./greeting-form";

export function GreetingCard() {
  const greetings = useQuery(greetingsQueryOptions);

  return (
    <article>
      <span>Greeting</span>
      <strong>{greetings.data ? `${greetings.data.greetings.length} saved` : "Loading..."}</strong>
      <p>Recent greetings from D1.</p>

      <hr className="my-3 border-neutral-200" />

      <GreetingForm />

      <section className="mt-4 space-y-2">
        <h2 className="text-sm font-semibold">Recent greetings</h2>
        {greetings.isPending ? (
          <p className="text-sm text-neutral-600">Loading greetings.</p>
        ) : greetings.isError ? (
          <p className="text-sm text-red-700">Could not load greetings.</p>
        ) : greetings.data.greetings.length === 0 ? (
          <p className="text-sm text-neutral-600">No greetings saved yet.</p>
        ) : (
          <ul className="space-y-2">
            {greetings.data.greetings.map((recentGreeting) => (
              <li
                className="rounded-md border border-neutral-200 p-3 text-sm"
                key={recentGreeting.id}
              >
                <strong className="block text-neutral-950">{recentGreeting.message}</strong>
                <span className="text-neutral-600">
                  {recentGreeting.name} at {recentGreeting.createdAt}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
