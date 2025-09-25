'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui';
import {
  ClientSideSuspense,
  useInboxNotifications
} from '@liveblocks/react/suspense';
import { BellIcon } from 'lucide-react';
import React, { memo } from 'react';

const InboxMenu = memo(() => {
  // 获取收件箱通知列表
  const { inboxNotifications } = useInboxNotifications();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative" size="icon">
            <BellIcon className="size-5" />
            {inboxNotifications?.length > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map(notification => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                />
              ))}
            </InboxNotificationList>
          ) : (
            <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">
              暂无通知
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="h-6!" />
    </>
  );
});

const Inbox = memo(() => {
  return (
    <ClientSideSuspense
      fallback={
        <>
          <Button variant="ghost" disabled className="relative" size="icon">
            <BellIcon className="size-5" />
          </Button>
          <Separator orientation="vertical" className="h-6!" />
        </>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
});

export default Inbox;
