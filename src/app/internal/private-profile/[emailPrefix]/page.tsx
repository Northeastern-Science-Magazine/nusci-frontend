"use client";

import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import Text from "@/design-system/primitives/Text/Text";
import Card from "@/design-system/primitives/Card";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Box } from "@/design-system/primitives/Box/Box";
import { Form, FormField } from "@/design-system/primitives/Form";
import TextInput from "@/design-system/primitives/TextInput";
import Button from "@/design-system/primitives/Button";
import MediaCard from "@/design-system/components/MediaCard";
import ImageUpload from "@/design-system/components/ImageUpload";
import { useState } from "react";
import { Controller } from "react-hook-form";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  pronouns: string;
  graduationYear: number;
  major: string;
  location: string;
  profileImage?: File;
  bannerImage?: File;
  bio: string;
  email: string;
  phone: string;
}

export default function PrivateProfilePage() {
  const initialData: ProfileFormValues = {
    firstName: "Jonathan",
    lastName: "Doemeterez",
    pronouns: "He/Him",
    graduationYear: 2027,
    major: "Computer Science",
    location: "Boston",
    profileImage: undefined,
    bannerImage: undefined,
    bio: `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`,
    email: "jdoe@northeastern.edu",
    phone: "+1 (617) 555-0123",
  };

  // Default images (URLs for display when no file is uploaded)
  const defaultProfileImage = "/profil.png";
  const defaultBannerImage = "/icy.png";

  const roles = ["Author", "Designer", "Editor"]; // Not editable
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState<ProfileFormValues>(initialData);
  
  // Store image previews
  const [profileImagePreview, setProfileImagePreview] = useState<string>(defaultProfileImage);
  const [bannerImagePreview, setBannerImagePreview] = useState<string>(defaultBannerImage);

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("Saving profile data:", data);
    console.log("Banner image file:", data.bannerImage?.name);
    console.log("Profile image file:", data.profileImage?.name);
    
    // Update previews if new images were uploaded
    if (data.bannerImage) {
      setBannerImagePreview(URL.createObjectURL(data.bannerImage));
    }
    if (data.profileImage) {
      setProfileImagePreview(URL.createObjectURL(data.profileImage));
    }
    
    setCurrentData(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const hasArticles = roles.includes("Author") || roles.includes("Editor");

  return (
    <Form<ProfileFormValues>
      onSubmit={onSubmit}
      options={{
        defaultValues: currentData,
      }}
    >
      {/* Banner */}
      <Box className="relative w-full h-[300px] overflow-hidden">
        <img src={bannerImagePreview} alt="Banner" className="w-full h-full object-cover" />
        {isEditing && (
          <Box className="absolute top-4 right-4 bg-white rounded-lg p-4 shadow-lg max-w-md border-2 border-aqua/20">
            <Box className="flex items-center justify-between gap-4">
              <Text style="regular" size={14} color="black" className="whitespace-nowrap">
                Change Banner Image
              </Text>
              <Controller
                name="bannerImage"
                render={({ field }) => (
                  <ImageUpload value={field.value} onChange={field.onChange} />
                )}
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* Header: Avatar, Name and Role */}
      <Box className="bg-white relative shadow-md">
        {/* Edit Buttons */}
        <Box className="absolute top-4 right-4 laptop:right-8 flex gap-3 z-20">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="default"
              color="aqua"
              size="md"
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                onClick={handleCancel}
                variant="outline"
                color="black"
                size="md"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                color="forest-green"
                size="md"
              >
                Save Changes
              </Button>
            </>
          )}
        </Box>

        <Box className="max-w-6xl mx-auto px-4 laptop:px-8 pt-8 pb-10">
          <Box className="grid grid-cols-1 laptop:grid-cols-12 gap-8 items-end">
            {/* Left column: Avatar */}
            <Box className="col-span-1 laptop:col-span-4 flex justify-center">
              <Box className="-mt-40 laptop:-mt-40 flex-shrink-0 z-10 relative flex flex-col items-center">
                <Avatar
                  src={profileImagePreview}
                  alt="Profile avatar"
                  fallback={`${currentData.firstName[0]}${currentData.lastName[0]}`}
                  size={"xl"}
                />
                {isEditing && (
                  <Box className="mt-4 bg-white rounded-lg p-4 shadow-lg w-full max-w-sm border-2 border-aqua/20">
                    <Box className="flex items-center justify-between gap-4">
                      <Text style="regular" size={14} color="black" className="whitespace-nowrap">
                        Change Profile Image
                      </Text>
                      <Controller
                        name="profileImage"
                        render={({ field }) => (
                          <ImageUpload value={field.value} onChange={field.onChange} />
                        )}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            {/* Right column: Name and roles */}
            <Box className="col-span-1 laptop:col-span-8 pb-2 pl-4">
              <Box className="flex items-center gap-4 flex-wrap mb-3">
                <Text style="bold" size={48} color="black" className="tracking-tight laptop:text-[56px]">
                  {currentData.firstName} {currentData.lastName}
                </Text>
              </Box>
              <Box className="flex items-center gap-2 flex-wrap">
                {roles.map((role, index) => (
                  <Badge color="aqua" variant="default" className="capitalize" key={index}>
                    {role}
                  </Badge>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main content grid */}
      <Box className="bg-gray">
        <Box className="max-w-6xl mx-auto px-4 laptop:px-8 py-8">
          <Box className="grid grid-cols-1 laptop:grid-cols-12 gap-8 items-stretch">
            {/* Left column: Auxiliary info */}
            <Box className="col-span-1 laptop:col-span-4 flex">
              <Card color="white" className="shadow-xl p-8 sticky top-8 w-full flex flex-col">
                <Box className="space-y-6 flex-1">
                  {isEditing ? (
                    <>
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
                          min: { value: 2020, message: "Year must be 2020 or later" }
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
                    </>
                  ) : (
                    <>
                      <Box>
                        <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                          Pronouns
                        </Text>
                        <Text style="regular" size={18} color="black">
                          {currentData.pronouns}
                        </Text>
                      </Box>
                      <Box>
                        <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                          Graduation Year
                        </Text>
                        <Text style="regular" size={18} color="black">
                          {currentData.graduationYear}
                        </Text>
                      </Box>
                      <Box>
                        <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                          Major
                        </Text>
                        <Text style="regular" size={18} color="black">
                          {currentData.major}
                        </Text>
                      </Box>
                      <Box>
                        <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                          Location
                        </Text>
                        <Text style="regular" size={18} color="black">
                          {currentData.location}
                        </Text>
                      </Box>
                      <Box>
                        <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                          Email
                        </Text>
                        <Text style="regular" size={18} color="black" className="break-all">
                          {currentData.email}
                        </Text>
                      </Box>
                      <Box>
                        <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                          Phone
                        </Text>
                        <Text style="regular" size={18} color="black">
                          {currentData.phone}
                        </Text>
                      </Box>
                    </>
                  )}
                </Box>
              </Card>
            </Box>

            {/* Right column: Bio */}
            <Box className="col-span-1 laptop:col-span-8 flex">
              <Card color="white" className="shadow-xl p-8 w-full flex flex-col">
                <Text style="regular" size={14} color="sage-green" className="uppercase tracking-wide mb-1">
                  Biography
                </Text>
                {isEditing ? (
                  <Box className="flex-1">
                    <FormField<ProfileFormValues>
                      name="bio"
                      rules={{
                        required: "Bio is required",
                        minLength: { value: 50, message: "Bio must be at least 50 characters" },
                      }}
                    >
                      <TextInput
                        label=""
                        placeholder="Tell us about yourself..."
                        multiline
                        rows={8}
                        variant="outline"
                        color="black"
                        size="md"
                        className="w-full"
                      />
                    </FormField>
                    <Text size={12} color="sage-green" className="mt-2">
                      Minimum 50 characters
                    </Text>
                  </Box>
                ) : (
                  <Text style="regular" size={16} color="black" className="leading-relaxed flex-1">
                    {currentData.bio}
                  </Text>
                )}
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Articles Section */}
      {hasArticles && (
        <Box className="bg-white shadow-md-top">
          <Box className="max-w-6xl mx-auto px-4 laptop:px-8 py-16">
            <Text style="bold" color="black" size={36} className="tracking-tight mb-8">
              Articles
            </Text>
            <Box className="flex flex-col gap-6">
              {/* Top row: 3 articles */}
              <Box className="flex flex-col laptop:flex-row gap-6">
                <Box className="flex-1">
                  <MediaCard
                    mediaType="image"
                    imageProps={{ src: "/icy.png", alt: "Icy texture" }}
                    subtitle="Research Spotlight"
                    title="Siberian Permafrost"
                    description="A photo-led story about the science (and spectacle) behind ice—built to read like a print spread."
                    mediaDirection="top"
                    size="sm"
                    rounded="none"
                    shadow="none"
                    color="white"
                    className="w-full max-w-none border border-black/10"
                  />
                </Box>
                <Box className="flex-1">
                  <MediaCard
                    mediaType="image"
                    imageProps={{ src: "/succulent.png", alt: "Succulent plant" }}
                    subtitle="Science + Society"
                    title="Urban Heat Islands, Explained"
                    description="How cities trap heat and what we can do about it—a deep dive into urban climate science."
                    mediaDirection="top"
                    size="sm"
                    rounded="none"
                    shadow="none"
                    color="white"
                    className="w-full max-w-none border border-black/10"
                  />
                </Box>
                <Box className="flex-1">
                  <MediaCard
                    mediaType="image"
                    imageProps={{ src: "/moss.png", alt: "Green moss texture" }}
                    subtitle="Quick Read"
                    title="5 Questions About CRISPR"
                    description="A concise guide to understanding gene editing technology."
                    mediaDirection="top"
                    size="sm"
                    rounded="none"
                    shadow="none"
                    color="white"
                    className="w-full max-w-none border border-black/10"
                  />
                </Box>
              </Box>
              {/* Bottom row: 1 article */}
              <Box className="flex flex-col laptop:flex-row gap-6">
                <Box className="flex-1 laptop:max-w-[calc(33.333%-1rem)]">
                  <MediaCard
                    mediaType="image"
                    imageProps={{ src: "/eclipse-image.png", alt: "Solar eclipse" }}
                    subtitle="Opinion"
                    title="Why Science Needs Better Stories"
                    description="How narrative can bridge the gap between research and public understanding."
                    mediaDirection="top"
                    size="sm"
                    rounded="none"
                    shadow="none"
                    color="white"
                    className="w-full max-w-none border border-black/10"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Form>
  );
}