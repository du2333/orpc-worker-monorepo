import { useQuery } from "@tanstack/react-query";

import { greetingQueryOptions } from "../hooks/use-example";
import { GreetingForm } from "./greeting-form";

export function GreetingCard() {
  const greeting = useQuery(greetingQueryOptions);

  return (
    <article>
      <span>Greeting</span>
      <strong>{greeting.data?.message ?? "Loading..."}</strong>
      <p>
        {greeting.data
          ? `Requested at ${greeting.data.requestedAt}`
          : "Waiting for the API response."}
      </p>

      <hr className="my-3 border-neutral-200" />

      <GreetingForm />
    </article>
  );
}
