"use client";

import { useState } from "react";
import { DropdownInput, DropdownItem } from "@/primitives/DropdownInput";
import Button from "@/primitives/Button";
import TextInput from "@/design-system/primitives/TextInput";
import { FlexChild, Flex } from "@/design-system/primitives/Flex";
import Text from "@/design-system/primitives/Text";
import MediaCard from "@/components/MediaCard";
import { PaginationBar } from "@/design-system/components/PaginationBar";
import { GridRow } from "@/design-system/primitives/Grid";

export default function FilterPage() {
  const mostRecentIssueNum = 60;

  const [title, setTitle] = useState("");
  const [contributor, setContributor] = useState("");
  const [date, setDate] = useState("any");
  const [sort, setSort] = useState("created_desc");

  const [issueNumber, setIssueNumber] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState<string[]>([]);

  // to handle value for uncontrolled dropdown input
  const [keys, setKeys] = useState({
    category: 0,
    issueNum: 0,
    date: 0,
    sort: 0,
  });

  const onSearch = async () => {
    setLoading(true);
    const categoryLabel: Record<string, string> = {
      all: "All categories",
      ArtificialIntelligence: "Artificial Intelligence",
      Biology: "Biology",
      Chemistry: "Chemistry",
      ComputerScience: "Computer Science",
      Culture: "Culture",
      Health: "Health",
      Environment: "Environment",
      Medicine: "Medicine",
      Newsletter: "Newsletter",
      Opinion: "Opinion",
      Physics: "Physics",
      Psychology: "Psychology",
      Science: "Science",
      Space: "Space",
      Technology: "Technology",
    };

    const dateLabel: Record<string, string> = {
      any: "Any time",
      "7d": "Last 7 days",
      "30d": "Last 30 days",
      ytd: "This year",
    };

    const sortLabel: Record<string, string> = {
      created_desc: "Most recent",
      created_asc: "Oldest",
      title_asc: "Title A–Z",
      title_desc: "Title Z–A",
    };

    const filters: string[] = [];
    if (title.trim()) filters.push(`Title: “${title.trim()}”`);
    if (contributor.trim())
      filters.push(`Contributor: “${contributor.trim()}”`);
    if (issueNumber)
       filters.push(`Issue #: ${issueNumber}`);
    if (category && category !== "all")
      filters.push(`Category: ${categoryLabel[category]}`);
    if (date !== "any") filters.push(`Date: ${dateLabel[date]}`);
    if (sort !== "created_desc") filters.push(`Sort: ${sortLabel[sort]}`);

    setApplied(filters);
    setLoading(false);
  };

  const onReset = () => {
    setTitle("");
    setContributor("");
    setDate("any");
    setSort("created_desc");
    setIssueNumber("");
    setCategory("all");
    setApplied([]);
    setKeys((k) => ({
      category: k.category + 1,
      issueNum: k.issueNum + 1,
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
          <FlexChild className="flex-col gap-1">
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
          <FlexChild className="flex-col gap-1">
            <TextInput
              variant="filled"
              size="md"
              color="white"
              label="Search by contributor"
              value={contributor}
              onChange={(value) => setContributor(value)}
              placeholder="author, photographer, etc."
            />
          </FlexChild>
          <FlexChild className="gap-2 items-end">
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
          <FlexChild className="flex-col gap-1 min-w-[16rem]">
            <Text size={12} color="black">
              Category
            </Text>
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
          <FlexChild className="flex-col gap-1">
            <Text size={12} color="black">
              Issue Number
            </Text>

            <DropdownInput
              placeholder="Select issue"
              key={keys.issueNum}
              onChange={setIssueNumber}
            >
              <>
                {Array.from(
                  { length: mostRecentIssueNum },
                  (_, i) => i + 1
                ).map((n) => (
                  <DropdownItem key={n} value={String(n)}>
                    {n}
                  </DropdownItem>
                ))}
              </>
            </DropdownInput>
          </FlexChild>
          <FlexChild className="flex-col gap-1 min-w-[12rem]">
            <Text size={12} color="black">
              Date
            </Text>
            <DropdownInput
              key={keys.date}
              placeholder="Any time"
              onChange={setDate}
            >
              <DropdownItem value="any">Any time</DropdownItem>
              <DropdownItem value="7d">Last 7 days</DropdownItem>
              <DropdownItem value="30d">Last 30 days</DropdownItem>
              <DropdownItem value="ytd">This year</DropdownItem>
            </DropdownInput>
          </FlexChild>

          <FlexChild className="flex-col gap-1 min-w-[14rem]">
            <Text size={12} color="black">
              Sort
            </Text>
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
        <Flex wrap="wrap" gap={2}>
          {applied.map((f, i) => (
            <GridRow
              key={i}
              span={1}
              className="rounded-full px-3 py-1 text-sm border border-neutral-300 bg-white"
            >
              {f}
            </GridRow>
          ))}
        </Flex>
        <Flex
          direction="row"
          gap={4}
          wrap="wrap"
          className="justify-center p-6"
        >
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
          <PaginationBar
            maxItems={5}
            activeItem={1}
            onClickFunctionGenerator={(index) => () =>
              alert(`Clicked on page ${index}`)}
            onClickLeft={() => alert("Clicked Left")}
            onClickRight={() => alert("Clicked Right")}
          ></PaginationBar>
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
