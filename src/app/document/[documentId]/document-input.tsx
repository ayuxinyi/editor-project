import React, { memo } from 'react';
import { BsCloudCheck } from 'react-icons/bs';

const DocumentInput = memo(() => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        Untitled Document
      </span>
      <BsCloudCheck />
    </div>
  );
});

export default DocumentInput;
