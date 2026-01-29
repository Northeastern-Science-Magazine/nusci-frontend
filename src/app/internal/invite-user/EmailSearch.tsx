"use client";
import Button from "@/design-system/primitives/Button";
import Card from "@/design-system/primitives/Card";
import { Grid, GridCol } from "@/design-system/primitives/Grid";
import Icon from "@/design-system/primitives/Icon";
import Text from "@/design-system/primitives/Text";
import TextInput from "@/design-system/primitives/TextInput";
import { Dispatch, SetStateAction, useState } from "react";
import Badge from "@/design-system/primitives/Badge";

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
      <div key={email} className="m-2">
        <Badge variant="outline" color="black">
          <Text
            as="span"
            color="black"
            className="justify-self-center align-middle pb-2"
            size={16}
          >
            {email}
          </Text>
          <Button
            color="black"
            type="button"
            className="rounded-full ml-3"
            size="sm"
            onClick={() => {
              emails.splice(emails.indexOf(email), 1);
              setEmails(emails);
            }}
          >
            <Icon size="sm" color="white" className="p-0 m-0" icon="x"></Icon>
          </Button>
        </Badge>
        {/* <GridCol span={2}>
          <Card color="white" className="rounded-3xl size-fit">
            <Grid span={4} gap={2} col>
              <GridCol span={3}>
                
                  
              </GridCol>
              <GridCol
                span={1}
                className="align-middle text-left pr-2 w-fit h-full"
              >
                
              </GridCol>
            </Grid>
          </Card>
        </GridCol> */}
      </div>
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
          resize
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
      <div className="[&>div]:flex [&>div]:flex-wrap [&>div]:gap-x-6 [&>div]:gap-y-2 [&_label]:mb-0">
        {renderedEmails}
      </div>
    </div>
  );
}
