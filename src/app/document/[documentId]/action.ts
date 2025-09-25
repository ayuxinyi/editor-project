'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getUsers() {
  // 获取当前的会话信息
  const { sessionClaims } = await auth();
  //  获取clerk客户端
  const clerk = await clerkClient();
  // 获取组织下的所有用户
  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims?.o?.id as string]
  });
  const users = response.data.map(user => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',
    avatar: user.imageUrl
  }));
  return users;
}

export async function getDocuments(ids: Id<'documents'>[]) {
  return await convex.query(api.documents.getByIds, { ids });
}
