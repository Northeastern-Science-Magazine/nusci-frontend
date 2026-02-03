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
import { Controller } from "react-hook-form";

export default function InviteUser() {
  type InviteUserFormValues = {
    emails: string[];
    roles: string[];
  };

  const [emails, setEmails] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  const canSend: boolean = emails.length !== 0 && roles.length !== 0;

  // todo: implement submission
  const onSubmit: SubmitHandler<InviteUserFormValues> = (
    values: InviteUserFormValues,
  ) => {
    values.emails = emails;
    values.roles = roles;
  };

  return (
    <div id="invite-user" className="bg-sage-green size-full py-8">
        <Box className="space-y-8 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 w-4/5">
          <Text
            color="sage-green"
            size={36}
            style="bold"
            className="text-left p-2"
          >
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
            <FormField
              name="emails"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              }}
            >
              <EmailSearch emails={emails} setEmails={setEmails}></EmailSearch>
            </FormField>

            <div id="roles" className="scroll-mt-[80px] m-2">
              <Controller
                name="roles"
                render={({ field }) => (
                  <div>
                    <label>{"Categories"}</label>
                    <div className="[&>div]:flex [&>div]:flex-wrap [&>div]:gap-x-6 [&>div]:gap-y-2 [&_label]:mb-0">
                      <Checkbox
                        options={Object.keys(Roles)}
                        value={field.value || []}
                        onChange={(newValue: string[]) => {
                          field.onChange(newValue);
                          setRoles(newValue);
                        }}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
            <Button
              color={canSend ? "forest-green" : "border"}
              type="submit"
              disabled={!canSend}
            >
              Invite
            </Button>
          </Form>
        </Box>
    </div>
  );
}
