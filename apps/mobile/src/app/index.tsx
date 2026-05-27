import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { useGreetingMutation } from "@/features/example/hooks/use-example";
import { healthQueryOptions } from "@/features/health/hooks/use-health";
import { env } from "@/lib/env";

export default function Index() {
  const [name, setName] = useState("Worker");
  const health = useQuery(healthQueryOptions);
  const greeting = useGreetingMutation();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>API URL</Text>
        <Text style={styles.muted}>{env.EXPO_PUBLIC_API_URL}</Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f7f7f8",
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
});
