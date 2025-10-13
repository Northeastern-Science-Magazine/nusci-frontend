"use client";

import { GridCol, Grid } from "@/design-system/primitives/Grid/Grid";
import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import Text from "@/design-system/primitives/Text/Text";
import { Image } from "@/design-system/primitives/Image/Image";
import Card from "@/design-system/primitives/Card";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Box } from "@/design-system/primitives/Box/Box";
import { Form, FormField } from "@/design-system/primitives/Form";
import TextInput from "@/design-system/primitives/TextInput";
import { useState } from "react";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  pronouns: string;
  graduationYear: number;
  major: string;
  location: string;
  profileImage: string;
  bannerImage: string;
  bio: string;
  email: string;
  phone: string;
}

export default function PrivateProfilePage() {
  const initialData: ProfileFormValues = {
    firstName: "John",
    lastName: "Doe",
    pronouns: "He/Him",
    graduationYear: 2027,
    major: "Computer Science",
    location: "Boston",
    profileImage: "https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg",
    bannerImage: "https://cdn2.picryl.com/photo/2018/03/17/boston-skyline-46674726272-fcd26e-1024.jpg",
    bio: `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`,
    email: "jdoe@northeastern.edu",
    phone: "+1 (617) 555-0123",
  };

  const roles = ["Author"]; // Not editable
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState<ProfileFormValues>(initialData);

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("Saving profile data:", data);
    setCurrentData(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Card color="white" className="shadow-xl ml-36 mr-36">
      <Form<ProfileFormValues>
        onSubmit={onSubmit}
        options={{
          defaultValues: currentData,
        }}
      >
        {/* Action Buttons */}
        <Box className="flex justify-end gap-4 p-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-aqua text-white rounded-md hover:bg-aqua-dark transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-aqua text-white rounded-md hover:bg-aqua-dark transition-colors"
              >
                Save Changes
              </button>
            </>
          )}
        </Box>

        {/* Banner and Avatar Section */}
        <Box className="relative w-full">
          <Image
            src={currentData.bannerImage}
            alt="Banner"
            width="w-full"
            ratio={18 / 4}
            rounded={"rounded"}
          />
          <Box className="absolute bottom-20 left-20">
            <Avatar
              src={currentData.profileImage}
              alt="Profile avatar"
              fallback={`${currentData.firstName[0]}${currentData.lastName[0]}`}
              size={"lg"}
            />
          </Box>
        </Box>

        {/* Edit Image URLs Section (only shown in edit mode) */}
        {isEditing && (
          <Box className="mb-6 px-10">
            <Grid col span={2} gap={4}>
              <GridCol span={1}>
                <FormField<ProfileFormValues>
                  name="bannerImage"
                  rules={{ required: "Banner image URL is required" }}
                >
                  <TextInput
                    label="Banner Image URL"
                    placeholder="Enter banner image URL"
                    className="w-full"
                  />
                </FormField>
              </GridCol>
              <GridCol span={1}>
                <FormField<ProfileFormValues>
                  name="profileImage"
                  rules={{ required: "Profile image URL is required" }}
                >
                  <TextInput
                    label="Profile Image URL"
                    placeholder="Enter profile image URL"
                    className="w-full"
                  />
                </FormField>
              </GridCol>
            </Grid>
          </Box>
        )}

        <Grid col span={3} gap={2} className={isEditing ? "mt-4" : "-mt-40"}>
          {/* Left Column - Personal Details */}
          <GridCol span={1} className="mb-10">
            <Card color="white" className="mt-24 shadow-xl">
              {isEditing ? (
                <Box className="space-y-4">
                  <FormField<ProfileFormValues>
                    name="firstName"
                    rules={{ required: "First name is required" }}
                  >
                    <TextInput label="First Name *" placeholder="Enter first name" className="w-full" />
                  </FormField>

                  <FormField<ProfileFormValues>
                    name="lastName"
                    rules={{ required: "Last name is required" }}
                  >
                    <TextInput label="Last Name *" placeholder="Enter last name" className="w-full" />
                  </FormField>

                  <FormField<ProfileFormValues> name="pronouns">
                    <TextInput label="Pronouns" placeholder="He/Him, She/Her, They/Them" className="w-full" />
                  </FormField>

                  <FormField<ProfileFormValues>
                    name="graduationYear"
                    rules={{
                      required: "Graduation year is required",
                      min: { value: 2020, message: "Year must be 2020 or later" },
                      max: { value: 2030, message: "Year must be 2030 or earlier" },
                    }}
                  >
                    <TextInput label="Graduation Year *" placeholder="2027" className="w-full" />
                  </FormField>

                  <FormField<ProfileFormValues> name="major">
                    <TextInput label="Major" placeholder="Computer Science" className="w-full" />
                  </FormField>

                  <FormField<ProfileFormValues> name="location">
                    <TextInput label="Location" placeholder="Boston, MA" className="w-full" />
                  </FormField>

                  <FormField<ProfileFormValues>
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email" },
                    }}
                  >
                    <TextInput label="Email *" placeholder="name@northeastern.edu" className="w-full" />
                  </FormField>

                  <FormField<ProfileFormValues> name="phone">
                    <TextInput label="Phone" placeholder="+1 (617) 555-0123" className="w-full" />
                  </FormField>
                </Box>
              ) : (
                <>
                  <Text style="regular" size={20} color="aqua">
                    Pronouns: {currentData.pronouns}
                  </Text>
                  <Text style="regular" size={20} color="aqua">
                    Graduation Year: {currentData.graduationYear}
                  </Text>
                  <Text style="regular" size={20} color="aqua">
                    Major: {currentData.major}
                  </Text>
                  <Text style="regular" size={20} color="aqua">
                    Location: {currentData.location}
                  </Text>
                  <Text style="regular" size={20} color="aqua">
                    Email: {currentData.email}
                  </Text>
                  <Text style="regular" size={20} color="aqua">
                    Phone: {currentData.phone}
                  </Text>
                </>
              )}
            </Card>
          </GridCol>

          {/* Right Column - Name, Roles, and Bio */}
          <GridCol span={2}>
            <Box className="flex items-center gap-6 ml-10 mb-4">
              <Text style="bold" size={72} color="aqua-light">
                {currentData.firstName} {currentData.lastName}
              </Text>
              {roles.map((role, index) => (
                <Badge key={index} color="aqua" variant="default" className="mt-4">
                  {role}
                </Badge>
              ))}
            </Box>

            {isEditing ? (
              <Box className="mr-10 ml-10">
                <FormField<ProfileFormValues>
                  name="bio"
                  rules={{
                    required: "Bio is required",
                    minLength: { value: 50, message: "Bio must be at least 50 characters" },
                  }}
                >
                  <textarea
                    placeholder="Tell us about yourself..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aqua min-h-[150px]"
                    rows={6}
                  />
                </FormField>
                <Text size={12} color="sage-green" className="mt-1">
                  Bio * - Tell us about yourself (minimum 50 characters)
                </Text>
              </Box>
            ) : (
              <Text style="regular" size={16} color="black" className="mr-10 ml-10">
                {currentData.bio}
              </Text>
            )}
          </GridCol>
        </Grid>
      </Form>

      {/* Articles Section */}
      <Card color="white" className="shadow-xl flex justify-center">
        <Text style="underline" color="aqua" size={48}>
          Articles
        </Text>
      </Card>
    </Card>
  );
}