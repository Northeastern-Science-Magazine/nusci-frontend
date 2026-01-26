"use client";
import Box from "@/design-system/primitives/Box";
import Button from "@/design-system/primitives/Button";
import Card from "@/design-system/primitives/Card";
import Checkbox from "@/design-system/primitives/Checkbox";
import { Form, FormField } from "@/design-system/primitives/Form";
import Text from "@/design-system/primitives/Text";
import { Roles } from "@/lib/types/types";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import EmailSearch from "./EmailSearch";

export default function InviteUser() {
  type InviteUserFormValues = {
    emails: string[];
    roles: string[];
  };

  const [roles, setRoles] = useState<string[]>([]);
  // todo: implement
  
  const canSend: boolean = false;

  // todo: implement submission
  const onSubmit: SubmitHandler<InviteUserFormValues> = (
    data: InviteUserFormValues,
  ) => {
    // for every email, create invite link?
    console.log(data);
    return null;
  };

  
  return (
    <div id="invite-user" className="mt-4 py-4 h-max">
      <Card color="sage-green" className="p-4 my-2.5 w-full align-middle">
        <Box className="space-y-8 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 w-4/5">
          <Text color="sage-green" size={36} style="bold" className="text-left">
            Invite a user
          </Text>

          <Form<InviteUserFormValues> onSubmit={onSubmit}>
            {/* <FormField<InviteUserFormValues>
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              }}
            >
              <TextInput
                variant="outline"
                size="md"
                color="black"
                label="Email"
                placeholder="johndoe@email.com"
                className="w-1/3"
                resize={true} // let's see if this does what i think it does
              />
            </FormField>
             */}
            <FormField name="emails">
              <EmailSearch></EmailSearch>
            </FormField>
            <br />
            <FormField<InviteUserFormValues>
              name="roles"
              rules={{
                required: "Please assign at least one role",
              }}
              label="Select User Roles:"
            >
              {/*flex logic taken from article submission html*/}
              <div className="[&>div]:flex [&>div]:flex-wrap [&>div]:gap-x-6 [&>div]:gap-y-2 [&_label]:mb-0 m-2">
                <Checkbox
                  options={Object.keys(Roles)}
                  size="md"
                  onChange={setRoles}
                />
              </div>
            </FormField>
            <br />
            <Button
              color={canSend ? "forest-green" : "border"}
              type="submit"
              disabled={!canSend}
            >
              Invite
            </Button>
          </Form>
        </Box>
      </Card>
    </div>
  );
}
