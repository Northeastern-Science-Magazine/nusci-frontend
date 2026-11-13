'use client';

import { useState } from 'react';
import Text from '@/design-system/primitives/Text/Text';
import Card from '@/design-system/primitives/Card';
import { Box } from '@/design-system/primitives/Box/Box';
import TextInput from '@/design-system/primitives/TextInput';
import Button from '@/design-system/primitives/Button';
import Checkbox from '@/design-system/primitives/Checkbox';
import { Badge } from '@/design-system/primitives/Badge/Badge';
import { Roles } from '@/lib/types/types';
import { UserRoles, apiUpdateUserRoles } from '@/lib/api/users';

const ROLE_KEYS = Object.keys(Roles) as (keyof typeof Roles)[];

// Checkboxes hold enum keys ("Author"); the backend expects enum values ("author").
function toRoleKeys(roles: string[]): string[] {
  return ROLE_KEYS.filter((key) => roles.includes(Roles[key]));
}

function toRoleValues(keys: string[]): string[] {
  return ROLE_KEYS.filter((key) => keys.includes(key)).map((key) => Roles[key]);
}

function sameRoles(a: string[], b: string[]): boolean {
  return toRoleKeys(a).join() === toRoleKeys(b).join();
}

function matchesSearch(user: UserRoles, query: string): boolean {
  const q = query.trim().toLowerCase();
  return (
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(q) ||
    user.email.toLowerCase().includes(q)
  );
}

interface RolesManagerProps {
  initialUsers: UserRoles[];
  loadError: string | null;
  myEmail: string;
}

export default function RolesManager({
  initialUsers,
  loadError,
  myEmail,
}: RolesManagerProps) {
  const [users, setUsers] = useState<UserRoles[]>(initialUsers);
  const [query, setQuery] = useState('');

  const visibleUsers = users.filter((user) => matchesSearch(user, query));

  return (
    <Box className="bg-gray min-h-screen">
      <Box className="max-w-4xl mx-auto px-4 laptop:px-8 py-12">
        <Text style="bold" size={36} color="black" className="mb-2">
          User Roles
        </Text>
        <Text style="regular" size={16} color="sage-green" className="mb-8">
          Add or remove roles for approved users. Changes take effect the next
          time they log in.
        </Text>

        <Card color="white" className="shadow-xl p-8">
          {loadError ? (
            <Text style="regular" size={16} color="red">
              Unable to load users: {loadError}
            </Text>
          ) : (
            <>
              <TextInput
                label="Search"
                placeholder="Name or email"
                value={query}
                onChange={setQuery}
                className="w-full mb-6"
              />
              {visibleUsers.length === 0 ? (
                <Text style="regular" size={16} color="black">
                  {users.length === 0
                    ? 'No users yet.'
                    : 'No users match your search.'}
                </Text>
              ) : (
                <Box className="divide-y divide-gray-200">
                  {visibleUsers.map((user) => (
                    <UserRoleRow
                      key={user.email}
                      user={user}
                      isMe={user.email.toLowerCase() === myEmail.toLowerCase()}
                      onSaved={(updated) =>
                        setUsers((current) =>
                          current.map((u) =>
                            u.email === user.email ? updated : u,
                          ),
                        )
                      }
                    />
                  ))}
                </Box>
              )}
            </>
          )}
        </Card>
      </Box>
    </Box>
  );
}

interface UserRoleRowProps {
  user: UserRoles;
  isMe: boolean;
  onSaved: (user: UserRoles) => void;
}

function UserRoleRow({ user, isMe, onSaved }: UserRoleRowProps) {
  const [selected, setSelected] = useState<string[]>(toRoleKeys(user.roles));
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isChanged = !sameRoles(toRoleValues(selected), user.roles);
  const canSave = isChanged && selected.length > 0 && !isSaving;

  const onChange = (keys: string[]) => {
    setError(null);
    setSaved(false);
    setSelected(keys);
  };

  const onSave = async () => {
    setIsSaving(true);
    setError(null);
    const response = await apiUpdateUserRoles(
      user.email,
      toRoleValues(selected),
    );
    setIsSaving(false);

    if (!response.ok) {
      setError(response.error);
      return;
    }

    setSaved(true);
    onSaved(response.data);
  };

  return (
    <Box className="py-5 space-y-3">
      <Box className="flex items-center gap-3 flex-wrap">
        <Text style="bold" size={18} color="black">
          {user.firstName} {user.lastName}
        </Text>
        {isMe && (
          <Badge color="aqua" variant="default" rounded="sm">
            You
          </Badge>
        )}
        <Text style="regular" size={14} color="sage-green">
          {user.email}
        </Text>
      </Box>

      <Box className="[&>div]:flex [&>div]:flex-wrap [&>div]:gap-x-6 [&>div]:gap-y-2 [&_label]:mb-0 [&_label]:cursor-pointer">
        <Checkbox
          options={ROLE_KEYS}
          value={selected}
          onChange={onChange}
          disabled={isMe || isSaving}
          color="forest-green"
          size="sm"
        />
      </Box>

      {isMe ? (
        <Text style="regular" size={14} color="sage-green">
          You can&apos;t change your own roles.
        </Text>
      ) : (
        <Box className="flex items-center gap-3 flex-wrap">
          <Button
            onClick={onSave}
            variant="default"
            color="forest-green"
            size="sm"
            disabled={!canSave}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          {isChanged && (
            <Button
              onClick={() => onChange(toRoleKeys(user.roles))}
              variant="outline"
              color="black"
              size="sm"
              disabled={isSaving}
            >
              Reset
            </Button>
          )}
          {selected.length === 0 && (
            <Text style="regular" size={14} color="red">
              Every user needs at least one role.
            </Text>
          )}
          {error && (
            <Text style="regular" size={14} color="red">
              {error}
            </Text>
          )}
          {saved && !isChanged && (
            <Text style="regular" size={14} color="forest-green">
              Roles saved.
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
