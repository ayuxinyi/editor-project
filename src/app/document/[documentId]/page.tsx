import React, { memo } from 'react';
import { Id } from '../../../../convex/_generated/dataModel';
import Document from './document';
import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';
import { api } from '../../../../convex/_generated/api';

interface DocumentIdParams {
  params: Promise<{ documentId: Id<'documents'> }>;
}

const DocumentIdPage = memo(async ({ params }: DocumentIdParams) => {
  const { documentId } = await params;
  const { getToken } = await auth();
  const token = (await getToken({ template: 'convex' })) ?? undefined;
  if (!token) {
    throw new Error('未授权');
  }
  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    {
      id: documentId
    },
    { token }
  );

  // 检查预加载的文档是否存在
  // 注意：preloadedDocument 是 Convex 的预加载查询对象，不是文档数据本身

  return <Document preloadedDocument={preloadedDocument} />;
});

export default DocumentIdPage;
