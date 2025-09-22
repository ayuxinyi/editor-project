import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/stores/use-editor-store';
import { ChevronDownIcon } from 'lucide-react';
import React, { memo } from 'react';
import type { Level } from '@tiptap/extension-heading';

export const HeadingLevelButton = memo(() => {
  const { editor } = useEditorStore();

  const headings = [
    { label: '段落', value: 0, fontSize: '16px' },
    { label: '标题1', value: 1, fontSize: '32px' },
    { label: '标题2', value: 2, fontSize: '24px' },
    { label: '标题3', value: 3, fontSize: '20px' },
    { label: '标题4', value: 4, fontSize: '18px' },
    { label: '标题5', value: 5, fontSize: '16px' }
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive('heading', { level })) {
        return `标题 ${level}`;
      }
    }
    return '段落';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              (value === 0 && !editor?.isActive('heading')) ||
                (editor?.isActive('heading', { level: value }) &&
                  'bg-neutral-200/80')
            )}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
          >
            <span>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
