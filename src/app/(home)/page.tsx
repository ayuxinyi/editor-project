'use client';
import { memo } from 'react';
import NavBar from './navbar';
import TemplatesGallery from './templates-gallery';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default memo(function Home() {
  const documents = useQuery(api.documents.get);

  if (!documents) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        {/* 导航栏 */}
        <NavBar />
      </div>
      <div className="mt-16">
        {/* 模板列表 */}
        <TemplatesGallery />
        {documents &&
          documents.map(document => (
            <span key={document._id}>{document.title}</span>
          ))}
      </div>
    </div>
  );
});
