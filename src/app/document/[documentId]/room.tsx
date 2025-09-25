'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import FullscreenLoader from '@/components/fullscreen-loader';
import { getDocuments, getUsers } from './action';
import { toast } from 'sonner';
import { Id } from '../../../../convex/_generated/dataModel';
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';

export function Room({ children }: { children: ReactNode }) {
  const params = useParams<{ documentId: string }>();

  // 定义用户类型
  type User = {
    id: string;
    name: string;
    avatar: string;
    color: string;
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
      authEndpoint={async () => {
        const endpoint = '/api/liveblocks-auth';
        const room = params.documentId as string;

        const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({ room })
        });
        return await response.json();
      }}
      throttle={16}
      // 定义用户列表解析函数，用于根据用户ID列表获取用户信息
      // 展示用户具体的姓名，头像
      resolveUsers={({ userIds }) =>
        userIds.map(
          userId => users.find(user => user.id === userId) ?? undefined
        )
      }
      // 定义提及建议解析函数，用于根据输入文本获取提及建议用户ID列表，
      // 这里根据用户名称进行模糊匹配，当用户@时，根据输入的文本进行匹配，返回匹配的用户ID列表
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;
        if (text) {
          filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map(user => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<'documents'>[]);
        return documents.map(document => ({
          id: document.id,
          name: document.name
        }));
      }}
    >
      <RoomProvider
        id={params.documentId}
        // 定义房间初始存储，用于设置文档的左侧和右侧边距
        initialStorage={{
          leftMargin: LEFT_MARGIN_DEFAULT,
          rightMargin: RIGHT_MARGIN_DEFAULT
        }}
      >
        <ClientSideSuspense
          fallback={<FullscreenLoader label="会话加载中..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
