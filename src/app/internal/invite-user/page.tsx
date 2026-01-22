"use client";
import Box from "@/design-system/primitives/Box";
import Button from "@/design-system/primitives/Button";
import Card from "@/design-system/primitives/Card";
import Checkbox from "@/design-system/primitives/Checkbox";
import { Form, FormField } from "@/design-system/primitives/Form";
import Text from "@/design-system/primitives/Text";
import TextInput from "@/design-system/primitives/TextInput";
import { useState } from "react";
import { SubmitHandler, Controller } from "react-hook-form";
import { Grid, GridCol } from "@/design-system/primitives/Grid";

export default function InviteUser() {

  type InviteUserFormValues = {
    email: string;
    roles: string[];
  };

  // todo: implement
  const canSend: boolean = false;

  // todo: implement submission
  const onSubmit: SubmitHandler<InviteUserFormValues> = () => {
    return null;
  };

  return (
      <Card color="sage-green" className="p-4 my-4 w-full h-full">
        <Box
        className="space-y-8 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5">
          <Text
            color="sage-green"
            size={36}
            style="bold"
            className="text-left"
          >
            Invite a user
          </Text>
          <Form<InviteUserFormValues>
            onSubmit={onSubmit}
          >
            <FormField<InviteUserFormValues>
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
                placeholder="name@company.com"
                className="w-1/3"
              />
            </FormField>
            
            <br />

            <Text className="text-left pt-2 pb-2" size={20}>
              Select User Roles:
            </Text>

            <FormField<InviteUserFormValues> name="roles"
                rules={{
                    required: "Please assign at least one role",
                }}>
              <Checkbox
                options={["Author", "Editor", "other option", "etc", "blah", "blah", "how am i going to make this populate automatically"]}
                value={[]}
              />
            </FormField>

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
  );
}
