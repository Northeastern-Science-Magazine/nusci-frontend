"use client";

import { useState } from "react";
import { DropdownInput, DropdownItem } from "@/primitives/DropdownInput";
import Button from "@/primitives/Button";
import TextInput from "@/design-system/primitives/TextInput";
import { FlexChild, Flex } from "@/design-system/primitives/Flex";
import Text from "@/design-system/primitives/Text";
import MediaCard from "@/components/MediaCard";

type Article = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  status: string;
};

export default function FilterPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("any");
  const [sort, setSort] = useState("created_desc");

  const [issueNumber, setIssueNumber] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<string>("all");

  const [results, setResults] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(false);
  
  // to handle value for uncontrolled dropdown input
  const [keys, setKeys] = useState({
    category: 0,
    status: 0,
    date: 0,
    sort: 0,
  });

  // need to connect to articles
  const onSearch = async () => {
    setLoading(true);
  };

  const onReset = () => {
    setTitle("");
    setStatus("all");
    setDate("any");
    setSort("created_desc");
    setIssueNumber("");
    setSlug("");
    setCategory("");
    setKeys((k) => ({
      category: k.category + 1,
      status: k.status + 1,
      date: k.date + 1,
      sort: k.sort + 1,
    }));
  };

  return (
    <Flex direction="col" gap={6}>
      <Flex
        direction="col"
        gap={6}
        className="mx-auto bg-sage-green rounded-xl p-6 shadow-sm"
      >
        <Flex
          direction="row"
          wrap="wrap"
          gap={4}
          className="justify-center items-end"
        >
          <FlexChild className="flex flex-col gap-1">
            <TextInput
              variant="filled"
              size="md"
              color="white"
              label="Title"
              value={title}
              onChange={(value) => setTitle(value)}
              placeholder="Enter article title..."
            />
          </FlexChild>
          <FlexChild className="flex flex-col gap-1">
            <TextInput
              variant="filled"
              size="md"
              color="white"
              type="number"
              label="Issue #"
              value={issueNumber}
              onChange={(value) => setIssueNumber(value)}
              placeholder="e.g. 42"
            />
          </FlexChild>

          <FlexChild className="flex gap-2 items-end">
            <Button
              variant="default"
              size="md"
              color="forest-green"
              onClick={onSearch}
            >
              Search
            </Button>
            <Button
              variant="default"
              size="md"
              color="forest-green"
              onClick={onReset}
            >
              Reset
            </Button>
          </FlexChild>
        </Flex>

        <Flex direction="row" wrap="wrap" gap={4} className="justify-center">
          <FlexChild className="flex flex-col gap-1 min-w-[16rem]">
            <Text className="text-sm text-neutral-600">Category</Text>
            <DropdownInput
              placeholder="Select category"
              key={keys.category}
              onChange={setCategory}
            >
              <DropdownItem value="all">All categories</DropdownItem>
              <DropdownItem value="ArtificialIntelligence">
                Artificial Intelligence
              </DropdownItem>
              <DropdownItem value="Biology">Biology</DropdownItem>
              <DropdownItem value="Chemistry">Chemistry</DropdownItem>
              <DropdownItem value="ComputerScience">
                Computer Science
              </DropdownItem>
              <DropdownItem value="Culture">Culture</DropdownItem>
              <DropdownItem value="Health">Health</DropdownItem>
              <DropdownItem value="Environment">Environment</DropdownItem>
              <DropdownItem value="Medicine">Medicine</DropdownItem>
              <DropdownItem value="Newsletter">Newsletter</DropdownItem>
              <DropdownItem value="Opinion">Opinion</DropdownItem>
              <DropdownItem value="Physics">Physics</DropdownItem>
              <DropdownItem value="Psychology">Psychology</DropdownItem>
              <DropdownItem value="Science">Science</DropdownItem>
              <DropdownItem value="Space">Space</DropdownItem>
              <DropdownItem value="Technology">Technology</DropdownItem>
            </DropdownInput>
          </FlexChild>

          <FlexChild className="flex flex-col gap-1 min-w-[12rem]">
            <Text className="text-sm text-neutral-600">Status</Text>
            <DropdownInput
              key={keys.status}
              placeholder="Select status"
              onChange={setStatus}
            >
              <DropdownItem value="all">All statuses</DropdownItem>
              <DropdownItem value="pending">Pending</DropdownItem>
              <DropdownItem value="print">Print</DropdownItem>
              <DropdownItem value="online">Online</DropdownItem>
            </DropdownInput>
          </FlexChild>

          <FlexChild className="flex flex-col gap-1 min-w-[12rem]">
            <Text className="text-sm text-neutral-600">Date</Text>
            <DropdownInput
              key="keys.date"
              placeholder="Any time"
              onChange={setDate}
            >
              <DropdownItem value="any">Any time</DropdownItem>
              <DropdownItem value="7d">Last 7 days</DropdownItem>
              <DropdownItem value="30d">Last 30 days</DropdownItem>
              <DropdownItem value="ytd">This year</DropdownItem>
            </DropdownInput>
          </FlexChild>

          <FlexChild className="flex flex-col gap-1 min-w-[14rem]">
            <Text className="text-sm text-neutral-600">Sort</Text>
            <DropdownInput
              key={keys.sort}
              placeholder="Most recent"
              onChange={setSort as any}
            >
              <DropdownItem value="created_desc">Most recent</DropdownItem>
              <DropdownItem value="created_asc">Oldest</DropdownItem>
              <DropdownItem value="title_asc">Title A–Z</DropdownItem>
              <DropdownItem value="title_desc">Title Z–A</DropdownItem>
            </DropdownInput>
          </FlexChild>
        </Flex>
      </Flex>
      <div className="mx-auto max-w-[1216px] rounded-xl border bg-neutral p-6">
        <Flex direction="row" gap={4} wrap="wrap" className="justify-center">
          <MediaCard
            className="h-full"
            mediaType="image"
            mediaDirection="top"
            rounded="rounded"
            border="bordered"
            title="Vertical Top"
            size="sm"
            subtitle={""}
            description={""}
            imageProps={{
              src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
              alt: "Sample image",
            }}
          ></MediaCard>
          <MediaCard
            className="h-full"  
            mediaType="image"
            mediaDirection="top"
            rounded="rounded"
            border="bordered"
            title="Vertical Top"
            size="sm"
            subtitle={""}
            description={""}
            imageProps={{
              src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
              alt: "Sample image",
            }}
          ></MediaCard>
          <MediaCard
            className="h-full"
            mediaType="image"
            mediaDirection="top"
            rounded="rounded"
            border="bordered"
            title="Vertical Top"
            size="sm"
            subtitle={""}
            description={""}
            imageProps={{
              src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
              alt: "Sample image",
            }}
          ></MediaCard>
          <MediaCard
            className="h-full"
            mediaType="image"
            mediaDirection="top"
            rounded="rounded"
            border="bordered"
            title="Vertical Top"
            size="sm"
            subtitle={""}
            description={""}
            imageProps={{
              src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
              alt: "Sample image",
            }}
          ></MediaCard>
          <MediaCard
            className="h-full"  
            mediaType="image"
            mediaDirection="top"
            rounded="rounded"
            border="bordered"
            title="Vertical Top"
            size="sm"
            subtitle={""}
            description={""}
            imageProps={{
              src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
              alt: "Sample image",
            }}
          ></MediaCard>
        </Flex>
      </div>

      <Flex
        direction="row"
        gap={2}
        className="justify-center items-center mt-6"
      >
        <FlexChild>
          <Button
            variant="outline"
            size="sm"
            aria-label="Previous page"
            className="px-3 disabled:opacity-50"
          >
            ‹
          </Button>
        </FlexChild>

        <FlexChild className="gap-2">
          <Button
            variant="outline"
            size="sm"
            className="px-3"
            aria-current="page"
          >
            1
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            2
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            3
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            4
          </Button>
          <span className="px-2 text-neutral-400 select-none">…</span>
          <Button variant="outline" size="sm" className="px-3">
            10
          </Button>
        </FlexChild>

        <FlexChild>
          <Button
            variant="outline"
            size="sm"
            aria-label="Next page"
            className="px-3"
          >
            ›
          </Button>
        </FlexChild>
      </Flex>
    </Flex>
  );
}
