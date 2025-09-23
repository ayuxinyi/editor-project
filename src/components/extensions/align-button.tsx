import { useEditorStore } from '@/stores/use-editor-store';
import React, { memo } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const AlignButton = memo(() => {
  const { editor } = useEditorStore();

  const alignMents = [
    {
      label: '左对齐',
      value: 'left',
      icon: AlignLeftIcon
    },
    {
      label: '居中对齐',
      value: 'center',
      icon: AlignCenterIcon
    },
    {
      label: '右对齐',
      value: 'right',
      icon: AlignRightIcon
    },
    {
      label: '两端对齐',
      value: 'justify',
      icon: AlignJustifyIcon
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignMents.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.isActive({ TextAlign: { align: value } }) &&
                'bg-neutral-200/80'
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
