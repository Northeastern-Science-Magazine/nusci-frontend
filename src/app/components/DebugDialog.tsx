"use client";

import { useState, useEffect } from "react";
import * as RDialog from "@radix-ui/react-dialog";
import TextInput from "@/design-system/primitives/TextInput";
import Button from "@/design-system/primitives/Button";
import Box from "@/design-system/primitives/Box";
import Text from "@/design-system/primitives/Text";
import { Flex } from "@/design-system/primitives/Flex";
import { api } from "@/lib/api/api";
import Icon from "@/design-system/primitives/Icon";

export default function DebugDialog() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [jsonBody, setJsonBody] = useState("");
  const [method, setMethod] = useState<"GET" | "POST" | "PATCH" | "PUT" | "DELETE">("GET");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Listen for "q" key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input/textarea
      if (e.key === "q" && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA" && target.isContentEditable !== true) {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleExecute = async () => {
    setLoading(true);
    setError("");
    setResponse("");

    try {
      // Parse JSON body if provided
      let body: any = undefined;
      if (jsonBody.trim()) {
        try {
          body = JSON.parse(jsonBody);
        } catch (e) {
          setError("Invalid JSON in body");
          setLoading(false);
          return;
        }
      }

      // Extract endpoint from URL (remove base URL if present)
      let endpoint = url.trim();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (endpoint.startsWith(apiUrl)) {
        endpoint = endpoint.replace(apiUrl, "");
      }
      if (!endpoint.startsWith("/")) {
        endpoint = `/${endpoint}`;
      }

      const result = await api(method, endpoint, body);

      if (result.ok) {
        setResponse(JSON.stringify(result.data, null, 2));
      } else {
        setError(result.error || "Request failed");
        if (result.headers) {
          setResponse(JSON.stringify({ error: result.error, headers: Object.fromEntries(result.headers.entries()) }, null, 2));
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RDialog.Root open={open} onOpenChange={setOpen}>
      <RDialog.Portal>
        <RDialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <RDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto z-50">
          <Box className="p-6">
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Text size={24} style="bold">
                  API Debug Tool
                </Text>
                <RDialog.Close asChild>
                  <button className="p-2 hover:bg-neutral/10 rounded-full transition-colors">
                    <Icon icon="x" size="md" />
                  </button>
                </RDialog.Close>
              </div>

              {/* Method Selector */}
              <Box>
                <Text size={12} className="mb-2 opacity-70">
                  Method
                </Text>
                <Flex direction="row" gap={2}>
                  {(["GET", "POST", "PATCH", "PUT", "DELETE"] as const).map((m) => (
                    <Button
                      key={m}
                      variant={method === m ? "default" : "outline"}
                      size="sm"
                      color="forest-green"
                      onClick={() => setMethod(m)}
                    >
                      {m}
                    </Button>
                  ))}
                </Flex>
              </Box>

              {/* URL Input */}
              <Box>
                <TextInput
                  variant="outline"
                  size="md"
                  color="black"
                  label="URL Endpoint"
                  value={url}
                  onChange={setUrl}
                  placeholder="/user/login or full URL"
                  className="w-full"
                />
              </Box>

              {/* JSON Body Input */}
              {(method === "POST" || method === "PATCH" || method === "PUT") && (
                <Box>
                  <TextInput
                    variant="outline"
                    size="md"
                    color="black"
                    label="JSON Body"
                    value={jsonBody}
                    onChange={setJsonBody}
                    placeholder='{"key": "value"}'
                    multiline
                    rows={6}
                    className="w-full font-mono text-sm"
                  />
                </Box>
              )}

              {/* Execute Button */}
              <Button
                variant="default"
                size="md"
                color="forest-green"
                onClick={handleExecute}
                disabled={loading || !url.trim()}
                className="w-full"
              >
                {loading ? "Executing..." : "Execute Request"}
              </Button>

              {/* Error Display */}
              {error && (
                <Box className="p-4 bg-red-50 border border-red-200 rounded">
                  <Text size={14} color="red" style="bold" className="mb-1">
                    Error
                  </Text>
                  <Text size={14} color="red">
                    {error}
                  </Text>
                </Box>
              )}

              {/* Response Display */}
              {response && (
                <Box>
                  <Text size={14} style="bold" className="mb-2">
                    Response
                  </Text>
                  <Box className="p-4 bg-neutral/5 border border-neutral/20 rounded overflow-auto max-h-96">
                    <pre className="text-xs font-mono whitespace-pre-wrap break-words">{response}</pre>
                  </Box>
                </Box>
              )}
            </div>
          </Box>
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}
