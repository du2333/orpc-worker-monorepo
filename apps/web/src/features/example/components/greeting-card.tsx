import { useQuery } from "@tanstack/react-query";
import { greetingQueryOptions } from "../hooks/use-example";

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
    </article>
  );
}
