'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import FullscreenLoader from '@/components/fullscreen-loader';
import { getUsers } from './action';
import { toast } from 'sonner';

export function Room({ children }: { children: ReactNode }) {
  const params = useParams<{ documentId: string }>();

  // 定义用户类型
  type User = {
    id: string;
    name: string;
    avatar: string;
  };

  // 定义用户列表状态
  const [users, setUsers] = useState<User[]>([]);

  // 定义获取用户列表的函数，通过useMemo缓存获取用户列表的函数，避免重复创建
  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch {
        toast.error('获取用户列表失败');
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
      resolveUsers={({ userIds }) =>
        userIds.map(
          userId => users.find(user => user.id === userId) ?? undefined
        )
      }
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;
        if (text) {
          filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map(user => user.id);
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId}>
        <ClientSideSuspense
          fallback={<FullscreenLoader label="文档加载中..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
