import { memo } from 'react';
import NavBar from './navbar';
import TemplatesGallery from './templates-gallery';

export default memo(function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        {/* 导航栏 */}
        <NavBar />
      </div>
      <div className="mt-16">
        {/* 模板列表 */}
        <TemplatesGallery />
      </div>
    </div>
  );
});
