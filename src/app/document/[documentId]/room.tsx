'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';

export function Room({ children }: { children: ReactNode }) {
  const params = useParams<{ documentId: string }>();

  return (
    <LiveblocksProvider
      publicApiKey={
        'pk_dev_44QEFdWGZ7U_wKXArWV-nF3vPOzUxLdLdsneZkGu5BtJsgFJm5GEv6NCzcAUBuS2'
      }
    >
      <RoomProvider id={params.documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
