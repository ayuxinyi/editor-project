import Link from 'next/link';
import { memo } from 'react';
import NavBar from './navbar';

export default memo(function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        点击
        <Link href="/documents/321">
          <span className="text-blue-500 underline">这里</span>
        </Link>
        跳转到文档编辑页面。
      </div>
    </div>
  );
});
