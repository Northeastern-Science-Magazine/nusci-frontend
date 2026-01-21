import React from "react";
import { Box } from "@/primitives/Box/Box";
import { Avatar } from "@/primitives/Avatar/Avatar";
import Text from "@/primitives/Text";
import { Badge } from "@/primitives/Badge/Badge";
import Icon from "@/primitives/Icon";

export interface TeamMemberProps {
    name: string;
    pronouns: string;
    role?: string;
    bio: string;
    graduationYear: number;
    major: string;
    email?: string;
    avatarUrl: string;
}

export function TeamMember(props: TeamMemberProps) {
    return (
        <Box className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
            <Box className="flex items-center gap-4">
                <Avatar
                    src={props.avatarUrl}
                    alt={`${props.name}'s avatar`}
                    fallback={props.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    size="lg"
                />
                <Box className="flex flex-col gap-1 items-start">
                    <Box className="flex items-center gap-2 flex-wrap">
                        <Text style="bold" size={20} color="black">
                            {props.name}
                        </Text>
                        <Text size={14} color="neutral">
                            ({props.pronouns})
                        </Text>
                    </Box>
                    {props.role && (
                        <Badge color="aqua" variant="default" rounded="sm">
                            {props.role}
                        </Badge>
                    )}
                </Box>
            </Box>

            <Box className="flex flex-wrap gap-2">
                <Badge color="sage-green" variant="outline" rounded="sm">
                    Class of {props.graduationYear}
                </Badge>
                <Badge color="forest-green" variant="outline" rounded="sm">
                    {props.major}
                </Badge>
            </Box>

            {props.bio && (
                <Text size={14} color="neutral" className="leading-relaxed">
                    {props.bio}
                </Text>
            )}

            {props.email && (
                <Box className="flex items-center gap-2 pt-2 border-t border-neutral/20">
                    <Icon icon="email" size="sm" color="neutral" />
                    <Text size={12} color="neutral">
                        {props.email}
                    </Text>
                </Box>
            )}
        </Box>
    );
}

export default TeamMember;