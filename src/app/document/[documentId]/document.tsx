'use client';
import React, { memo, useEffect } from 'react';
import Editor from './editor';
import ToolBar from './toolbar';
import Navbar from './navbar';
import { Room } from './room';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';

interface DocumentParams {
  // 预加载文档数据
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export default memo(function Document({ preloadedDocument }: DocumentParams) {
  // 如果是在客户端，我们可以通过use方法获取动态路由参数，use方法是React 19推出的新的方法，可以
  // 帮助我们解析promise对象，获取promise的resolve值
  // const { documentId } = React.use(params);
  const document = usePreloadedQuery(preloadedDocument);
  const router = useRouter();

  // if (!document) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold mb-4">文档不存在</h1>
  //         <p className="text-gray-600 mb-4">该文档可能已被删除或不存在</p>
  //         <Link href="/" className="text-blue-600 hover:underline">
  //           返回首页
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  useEffect(() => {
    if (!document) {
      router.push('/');
    }
  }, [document, router]);

  if (!document) {
    return null;
  }
  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
          <Navbar data={document} />
          <ToolBar />
        </div>
        <div className="pt-[116px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
});
