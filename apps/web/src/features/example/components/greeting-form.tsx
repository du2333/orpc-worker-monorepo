import { useState } from "react";

import { useGreetingMutation } from "../hooks/use-example";

export function GreetingForm() {
  const [name, setName] = useState("");
  const { mutation } = useGreetingMutation();

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate({ name });
      }}
    >
      <label className="block space-y-1">
        <span className="text-sm font-medium">Name</span>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter a name (3+ chars)"
          value={name}
        />
      </label>

      <button
        className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        disabled={mutation.isPending || name.trim().length === 0}
        type="submit"
      >
        {mutation.isPending ? "Saving..." : "Save greeting"}
      </button>

      {mutation.data ? (
        <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">
          {mutation.data.message}
        </p>
      ) : null}
    </form>
  );
}
