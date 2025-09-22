'use client';
import { cn } from '@/lib/utils';
import { LucideIcon, Undo2Icon } from 'lucide-react';
import React, { memo } from 'react';

interface ToolBarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

type ToolSectionType = ToolBarButtonProps & { label: string };

const ToolBarButton = ({
  onClick,
  isActive,
  icon: Icon
}: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'cursor-pointer text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const ToolBar = memo(() => {
  const sections: ToolSectionType[][] = [
    [{ label: '撤销', icon: Undo2Icon, onClick: () => console.log('撤销') }]
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map(item => (
        <ToolBarButton key={item.label} {...item} />
      ))}
    </div>
  );
});

export default ToolBar;
