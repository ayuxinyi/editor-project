import { Liveblocks } from '@liveblocks/node';
import { auth, currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

// 初始化Convex客户端
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
// 初始化Liveblocks客户端
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!
});

export async function POST(req: Request) {
  // 获取当前用户的sessionClaims
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response('未登录', { status: 401 });
  }

  // 获取当前用户的信息
  const user = await currentUser();
  if (!user) {
    return new Response('用户不存在', { status: 401 });
  }

  // 程序被包裹在LiveblocksProvider上下文中，该上下文会将roomId添加到请求中。
  const { room } = await req.json();
  // liveblocks是将文档的id作为roomId使用的
  const document = await convex.query(api.documents.getById, { id: room });
  if (!document) {
    return new Response('文档不存在', { status: 401 });
  }

  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === sessionClaims.o.id
  );

  if (!isOwner && !isOrganizationMember) {
    return new Response('很抱歉，您没有权限访问此文档', { status: 401 });
  }

  // 为Liveblocks会话创建一个会话
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? 'Anonymous',
      avatar: user.imageUrl
    }
  });
  // 为Liveblocks会话添加权限
  session.allow(room, session.FULL_ACCESS);
  // 为Liveblocks会话授权
  const { body, status } = await session.authorize();
  // 返回Liveblocks会话的授权结果
  return new Response(body, { status });
}
