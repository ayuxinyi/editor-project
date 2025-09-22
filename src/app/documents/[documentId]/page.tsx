import React, { memo } from 'react';
import Editor from './editor';
import ToolBar from './toolbar';

interface DocumentIdParams {
  params: Promise<{ documentId: string }>;
}

export default memo(async function DocumentIdPage({
  params
}: DocumentIdParams) {
  // 在服务器端我们可以这样获取动态路由参数
  const { documentId } = await params;
  // 如果是在客户端，我们可以通过use方法获取动态路由参数，use方法是React 19推出的新的方法，可以
  // 帮助我们解析promise对象，获取promise的resolve值
  // const { documentId } = React.use(params);
  console.log('🚀 ~ DocumentIdPage ~ documentId:', documentId);
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <ToolBar />
      <Editor />
    </div>
  );
});
