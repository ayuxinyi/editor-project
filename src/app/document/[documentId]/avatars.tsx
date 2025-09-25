'use client';
import { Separator } from '@/components/ui/separator';
import {
  ClientSideSuspense,
  useOthers,
  useSelf
} from '@liveblocks/react/suspense';
import Image from 'next/image';
import React, { memo } from 'react';

const AvatarStack = memo(() => {
  // 从Liveblocks获取其他用户
  const users = useOthers();
  // 从Liveblocks获取当前用户
  const currentUser = useSelf();

  if (users.length === 0) return null;

  return (
    <>
      <div className="flex items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatar name="You" src={currentUser.info.avatar} />
          </div>
        )}
        <div className="flex">
          {users.map(({ connectionId, info }) => (
            <Avatar key={connectionId} src={info.avatar} name={info.name} />
          ))}
        </div>
      </div>
      <Separator orientation="vertical" className="h-6!" />
    </>
  );
});

const AVATAR_SIZE = 36;

interface AvatarProps {
  name: string;
  src: string;
}

const Avatar = memo(({ name, src }: AvatarProps) => {
  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
    >
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 whitespace-nowrap transition-opacity">
        {name}
      </div>
      <Image
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        src={src}
        alt={name}
        className="size-full rounded-full"
      />
    </div>
  );
});

const Avatars = memo(() => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
});

export default Avatars;
