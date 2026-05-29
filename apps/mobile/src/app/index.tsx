import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { greetingsQueryOptions, useGreetingMutation } from "@/features/example/hooks/use-example";
import { authClient } from "@/lib/auth/client";
import { healthQueryOptions } from "@/features/health/hooks/use-health";
import { env } from "@/lib/env";

export default function Index() {
  const [name, setName] = useState("Worker");
  const [authEmail, setAuthEmail] = useState("demo@example.com");
  const [authName, setAuthName] = useState("Demo User");
  const [authPassword, setAuthPassword] = useState("password1234");
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const session = authClient.useSession();
  const health = useQuery(healthQueryOptions);
  const greeting = useGreetingMutation();
  const greetings = useQuery(greetingsQueryOptions);

  async function signInWithGitHub() {
    setAuthStatus("Opening GitHub.");
    const result = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (result.error) {
      setAuthStatus(result.error.message ?? "GitHub sign in failed.");
      return;
    }

    setAuthStatus("GitHub sign in finished.");
    await session.refetch();
  }

  async function signIn() {
    setAuthStatus(null);
    const result = await authClient.signIn.email({
      email: authEmail,
      password: authPassword,
    });

    if (result.error) {
      setAuthStatus(result.error.message ?? "Sign in failed.");
      return;
    }

    setAuthStatus("Signed in.");
    await session.refetch();
  }

  async function signUp() {
    setAuthStatus(null);
    const result = await authClient.signUp.email({
      email: authEmail,
      name: authName,
      password: authPassword,
    });

    if (result.error) {
      setAuthStatus(result.error.message ?? "Sign up failed.");
      return;
    }

    setAuthStatus("Account created.");
    await session.refetch();
  }

  async function signOut() {
    setAuthStatus(null);
    const result = await authClient.signOut();

    if (result.error) {
      setAuthStatus(result.error.message ?? "Sign out failed.");
      return;
    }

    setAuthStatus("Signed out.");
    await session.refetch();
  }

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <View style={styles.section}>
        <Text style={styles.label}>API URL</Text>
        <Text style={styles.muted}>{env.EXPO_PUBLIC_API_URL}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Auth</Text>
        <Text style={styles.body}>
          {session.isPending
            ? "Checking session..."
            : session.data
              ? `Signed in as ${session.data.user.email}`
              : "Signed out."}
        </Text>

        {session.data ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => void signOut()}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Sign out</Text>
          </Pressable>
        ) : (
          <>
            <Pressable
              accessibilityRole="button"
              onPress={() => void signInWithGitHub()}
              style={styles.githubButton}
            >
              <Text style={styles.githubButtonText}>Sign in with GitHub</Text>
            </Pressable>
            <TextInput
              autoCapitalize="words"
              onChangeText={setAuthName}
              placeholder="Name"
              style={styles.input}
              value={authName}
            />
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setAuthEmail}
              placeholder="Email"
              style={styles.input}
              value={authEmail}
            />
            <TextInput
              onChangeText={setAuthPassword}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              value={authPassword}
            />
            <View style={styles.row}>
              <Pressable
                accessibilityRole="button"
                onPress={() => void signIn()}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Sign in</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => void signUp()}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>Sign up</Text>
              </Pressable>
            </View>
          </>
        )}

        {authStatus ? <Text style={styles.muted}>{authStatus}</Text> : null}
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.title}>Health</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void health.refetch()}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Refetch</Text>
          </Pressable>
        </View>

        <Text style={styles.body}>
          {health.isPending
            ? "Checking API..."
            : health.isError
              ? health.error instanceof Error
                ? health.error.message
                : "Health check failed."
              : `${health.data.service} is healthy at ${health.data.timestamp}`}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Greeting</Text>
        <TextInput
          autoCapitalize="words"
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
          value={name}
        />
        <Pressable
          accessibilityRole="button"
          disabled={greeting.isPending}
          onPress={() => greeting.mutate({ name })}
          style={[styles.primaryButton, greeting.isPending && styles.disabledButton]}
        >
          <Text style={styles.primaryButtonText}>
            {greeting.isPending ? "Sending..." : "Send greeting"}
          </Text>
        </Pressable>

        {greeting.data ? <Text style={styles.body}>{greeting.data.message}</Text> : null}
        {greeting.isError ? (
          <Text style={styles.error}>
            {greeting.error instanceof Error ? greeting.error.message : "Greeting failed."}
          </Text>
        ) : null}

        <View style={styles.list}>
          <Text style={styles.subtitle}>Recent greetings</Text>
          {greetings.isPending ? (
            <Text style={styles.muted}>Loading greetings.</Text>
          ) : greetings.isError ? (
            <Text style={styles.error}>Could not load greetings.</Text>
          ) : greetings.data.greetings.length === 0 ? (
            <Text style={styles.muted}>No greetings saved yet.</Text>
          ) : (
            greetings.data.greetings.map((recentGreeting) => (
              <View key={recentGreeting.id} style={styles.listItem}>
                <Text style={styles.listItemTitle}>{recentGreeting.message}</Text>
                <Text style={styles.muted}>
                  {recentGreeting.name} at {recentGreeting.createdAt}
                </Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7f7f8",
  },
  container: {
    gap: 24,
    justifyContent: "center",
    minHeight: "100%",
    padding: 24,
  },
  section: {
    gap: 12,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4b5563",
    textTransform: "uppercase",
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: "#1f2937",
  },
  muted: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6b7280",
  },
  error: {
    fontSize: 16,
    lineHeight: 22,
    color: "#b91c1c",
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  primaryButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  githubButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#111827",
    paddingHorizontal: 16,
  },
  githubButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  secondaryButton: {
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 14,
    backgroundColor: "#ffffff",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },
  list: {
    gap: 10,
    paddingTop: 4,
  },
  listItem: {
    gap: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#ffffff",
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
});
