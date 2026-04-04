"use client";

import { useRouter } from "next/navigation";
import MediaCard from "@/design-system/components/MediaCard";
import Button from "@/primitives/Button";
import Box from "@/primitives/Box";
import Text from "@/primitives/Text";
import { Flex } from "@/primitives/Flex";

export default function LinkExpiredPage() {
  const router = useRouter();

  return (
    <Flex className="min-h-screen items-center justify-center p-4 bg-sage-green">
      <MediaCard
        mediaType="image"
        mediaDirection="right"
        imageProps={{
          src: "https://media.istockphoto.com/id/488961976/photo/exploding-nebula.jpg?s=612x612&w=0&k=20&c=QEfXvnU0ckq0SWNEXTzZnzUpjBDwmweU3a8VoIcBveA=",
          alt: "landing",
        }}
        size="lg"
        rounded="rounded"
        className="max-w-7xl w-full [&_.media-container]:flex-1"
        color="white"
      >
        <Text size={48} style="bold" color="forest-green" className="p-5 pb-0">
          This link has expired
        </Text>

        <Box className="space-y-6 mt-6 p-5">
          <Text size={16} color="black">
            Sign-in links are only valid for 15 minutes and can only be used once. Request a new email to get a fresh link.
          </Text>

          <Button
            type="button"
            variant="default"
            size="md"
            color="forest-green"
            className="w-full"
            onClick={() => router.push("/otp")}
          >
            Request a new sign-in email
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            color="forest-green"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Sign in with password
          </Button>

          <Box className="pt-2">
            <Text size={12} color="sage-green">
              <a href="/" className="underline hover:text-forest-green">
                Back to home
              </a>
            </Text>
          </Box>
        </Box>
      </MediaCard>
    </Flex>
  );
}
