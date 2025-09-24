'use client';
import { memo } from 'react';
import NavBar from './navbar';
import TemplatesGallery from './templates-gallery';
import { usePaginatedQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import DocumentsTable from './documents-table';
import { useSearchParam } from '@/hooks/use-search-param';

export default memo(function Home() {
  // 获取路径中的查询参数
  const [search] = useSearchParam('search');

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        {/* 导航栏 */}
        <NavBar />
      </div>
      <div className="mt-16">
        {/* 模板列表 */}
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
});
