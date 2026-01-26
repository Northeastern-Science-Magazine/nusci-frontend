"use client";
import Button from "@/design-system/primitives/Button";
import Card from "@/design-system/primitives/Card";
import { Grid, GridCol } from "@/design-system/primitives/Grid";
import Icon from "@/design-system/primitives/Icon";
import Text from "@/design-system/primitives/Text";
import TextInput from "@/design-system/primitives/TextInput";
import { Dispatch, SetStateAction, useState } from "react";

export default function EmailSearch({
  emails,
  setEmails,
}: {
  emails: string[];
  setEmails: Dispatch<SetStateAction<string[]>>;
}) {
  const [email, setEmail] = useState<string>("");

  const addEmail = () => {
    if (!email.trim()) return;

    setEmails((prev) => [...prev, email.trim()]);
    setEmail("");
  };

  const renderEmailBadge = (email: string) => {
    return (
      <GridCol span={2}>
        <Card color="white" className="rounded-3xl size-fit">
          <Grid span={4} gap={2} col>
            <GridCol span={3}>
              <Text
                as="span"
                className="justify-self-center align-middle h-fit"
                size={16}
              >
                {email}
              </Text>
            </GridCol>
            <GridCol span={1} className="align-middle text-left pr-2 w-fit h-full">
              <Button
                color="black"
                type="button"
                className="rounded-full "
                size="sm"
                onClick={() => {
                  emails.splice(emails.indexOf(email), 1);
                  setEmails(emails);
                }}
              >
                <Icon
                  size="sm"
                  color="white"
                  className="p-0 m-0"
                  icon="x"
                ></Icon>
              </Button>
            </GridCol>
          </Grid>
        </Card>
      </GridCol>
    );
  };

  const renderedEmails = emails.map(renderEmailBadge);

  return (
    <div>
      <div className="email-search p-2">
        <TextInput
          size="lg"
          label="Email"
          placeholder="Enter email(s)"
          value={email}
          onChange={setEmail}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addEmail();
            }
          }}
        />
      </div>
      {/* put in flex grid eventually */}
      <Grid col span={8} gap={2}>
        {renderedEmails}
      </Grid>
    </div>
  );
}
