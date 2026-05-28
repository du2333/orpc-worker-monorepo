import type { SubmitEvent } from "react";
import { useState } from "react";

import { authClient } from "@/lib/auth/client";

type AuthMode = "sign-in" | "sign-up";

export function AuthPanel() {
  const session = authClient.useSession();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("demo@example.com");
  const [name, setName] = useState("Demo User");
  const [password, setPassword] = useState("password1234");
  const [status, setStatus] = useState<string | null>(null);

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const result =
      mode === "sign-in"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ email, name, password });

    if (result.error) {
      setStatus(result.error.message ?? "Authentication failed.");
      return;
    }

    setStatus(mode === "sign-in" ? "Signed in." : "Account created.");
    await session.refetch();
  }

  async function signOut() {
    setStatus(null);
    const result = await authClient.signOut();

    if (result.error) {
      setStatus(result.error.message ?? "Sign out failed.");
      return;
    }

    setStatus("Signed out.");
    await session.refetch();
  }

  return (
    <article>
      <span>Auth</span>
      <strong>
        {session.isPending ? "Checking..." : session.data ? session.data.user.email : "Signed out"}
      </strong>
      <p>{session.data ? `User ${session.data.user.id}` : "Better Auth email/password."}</p>

      <hr className="my-3 border-neutral-200" />

      {session.data ? (
        <button
          className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
          onClick={() => void signOut()}
          type="button"
        >
          Sign out
        </button>
      ) : (
        <form className="space-y-3" onSubmit={(event) => void submit(event)}>
          <div className="flex gap-2">
            <button
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                mode === "sign-in" ? "bg-neutral-950 text-white" : "border border-neutral-300"
              }`}
              onClick={() => setMode("sign-in")}
              type="button"
            >
              Sign in
            </button>
            <button
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                mode === "sign-up" ? "bg-neutral-950 text-white" : "border border-neutral-300"
              }`}
              onClick={() => setMode("sign-up")}
              type="button"
            >
              Sign up
            </button>
          </div>

          {mode === "sign-up" ? (
            <label className="block space-y-1">
              <span className="text-sm font-medium">Name</span>
              <input
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </label>
          ) : null}

          <label className="block space-y-1">
            <span className="text-sm font-medium">Email</span>
            <input
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Password</span>
            <input
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />
          </label>

          <button
            className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
            type="submit"
          >
            {mode === "sign-in" ? "Sign in" : "Create account"}
          </button>
        </form>
      )}

      {status ? <p className="mt-3 text-sm text-neutral-600">{status}</p> : null}
    </article>
  );
}
