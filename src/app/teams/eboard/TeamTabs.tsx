'use client';

import { useState } from 'react';
import { Box } from '@/design-system/primitives/Box/Box';
import Text from '@/design-system/primitives/Text/Text';
import { TeamMember } from '@/design-system/components/TeamMember/TeamMember';
import { TeamMemberProps } from '@/design-system/components/TeamMember';
import Button from '@/design-system/primitives/Button';
import { TeamMembersResult } from '@/lib/api/users';

interface TeamTabsProps {
  eboard: TeamMembersResult;
  editors: TeamMembersResult;
}

export default function TeamTabs({ eboard, editors }: TeamTabsProps) {
  const [activeTab, setActiveTab] = useState<'eboard' | 'editors'>('eboard');

  const current = activeTab === 'eboard' ? eboard : editors;

  return (
    <>
      <Box className="flex gap-2 mb-8">
        <Button
          onClick={() => setActiveTab('eboard')}
          className={`px-6 py-3 rounded-full text-base font-medium transition-colors`}
          color={`${activeTab === 'eboard' ? 'black' : 'white'}`}
        >
          Executive Board
        </Button>
        <Button
          onClick={() => setActiveTab('editors')}
          className={`px-6 py-3 rounded-full text-base font-medium transition-colors`}
          color={`${activeTab === 'editors' ? 'black' : 'white'}`}
        >
          Editors
        </Button>
      </Box>

      {!current.ok ? (
        <Text size={16} color="red">
          Unable to load team members.
        </Text>
      ) : current.members.length === 0 ? (
        <Text size={16} color="black">
          No members to show yet.
        </Text>
      ) : (
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {current.members.map((member: TeamMemberProps) => (
            <TeamMember
              key={`${activeTab}-${member.email}`}
              name={member.name}
              pronouns={member.pronouns}
              role={member.role}
              bio={member.bio}
              graduationYear={member.graduationYear}
              major={member.major}
              email={member.email}
              avatarUrl={member.avatarUrl}
            />
          ))}
        </Box>
      )}
    </>
  );
}
