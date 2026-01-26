"use client";
import Button from "@/design-system/primitives/Button";
import Card from "@/design-system/primitives/Card";
import { Grid, GridCol } from "@/design-system/primitives/Grid";
import Icon from "@/design-system/primitives/Icon";
import Text from "@/design-system/primitives/Text";
import TextInput from "@/design-system/primitives/TextInput";
import { useState } from "react";

export default function EmailSearch() {
  const [emails, setEmails] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");

  const addEmail = () => {
    if (!email.trim()) return;

    setEmails((prev) => [...prev, email.trim()]);
    setEmail("");
  };

  const renderEmailBadge = (email: string) => {
    return (
      <GridCol>
        <Card color="white" className="rounded-3xl size-fit m-2">
          <Grid span={2} gap={2} col>
            <GridCol>
              <Text
                as="span"
                className="justify-self-center align-middle"
                size={16}
              >
                {email}
              </Text>
            </GridCol>
            <GridCol>
              <Button
                color="black"
                className="rounded-full justify-self-center"
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
      <div className="email-search">
        <TextInput
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
      {renderedEmails}
    </div>
  );
}
