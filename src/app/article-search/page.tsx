"use client";

import { DropdownInput, DropdownItem } from "@/primitives/DropdownInput";
import Button from "@/primitives/Button";
import TextInput from "@/design-system/primitives/TextInput";
import { FlexChild, Flex } from "@/design-system/primitives/Flex";
import Text from "@/design-system/primitives/Text";

export default function FilterPage() {
  return (
    <Flex direction="col" gap={6}>
      <Flex
        direction="col"
        gap={6}
        className="bg-sage-green rounded-xl p-6 shadow-sm"
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
              placeholder="Enter article title..."
            />
          </FlexChild>
          <FlexChild className="flex gap-2 items-end">
            <Button variant="default" size="md" color="forest-green">
              Search
            </Button>
            <Button variant="default" size="md" color="forest-green">
              Reset
            </Button>
          </FlexChild>
        </Flex>

        <Flex direction="row" wrap="wrap" gap={4} className="justify-center">
          <FlexChild className="flex flex-col gap-1 min-w-[16rem]">
            <Text className="text-sm text-neutral-600">Category</Text>
            <DropdownInput placeholder="Select category">
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
            <DropdownInput placeholder="Select status">
              <DropdownItem value="all">All statuses</DropdownItem>
              <DropdownItem value="pending">Pending</DropdownItem>
              <DropdownItem value="print">Print</DropdownItem>
              <DropdownItem value="online">Online</DropdownItem>
              <DropdownItem value="cancelled">Cancelled</DropdownItem>
            </DropdownInput>
          </FlexChild>
          <FlexChild className="flex flex-col gap-1 min-w-[12rem]">
            <Text className="text-sm text-neutral-600">Date</Text>
            <DropdownInput placeholder="Any time">
              <DropdownItem value="any">Any time</DropdownItem>
              <DropdownItem value="7d">Last 7 days</DropdownItem>
              <DropdownItem value="30d">Last 30 days</DropdownItem>
              <DropdownItem value="ytd">This year</DropdownItem>
            </DropdownInput>
          </FlexChild>

          <FlexChild className="flex flex-col gap-1 min-w-[14rem]">
            <Text className="text-sm text-neutral-600">Sort</Text>
            <DropdownInput placeholder="Most recent">
              <DropdownItem value="created_desc">Most recent</DropdownItem>
              <DropdownItem value="created_asc">Oldest</DropdownItem>
              <DropdownItem value="title_asc">Title A–Z</DropdownItem>
              <DropdownItem value="title_desc">Title Z–A</DropdownItem>
            </DropdownInput>
          </FlexChild>
        </Flex>
      </Flex>
      <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral p-6 text-sm text-neutral-500">
        Articles filter here.
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
