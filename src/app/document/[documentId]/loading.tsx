import FullscreenLoader from '@/components/fullscreen-loader';
import React, { memo } from 'react';

const Loading = memo(() => {
  return <FullscreenLoader label="文档加载中..." />;
});

export default Loading;
