import { useEditorStore } from '@/stores/use-editor-store';
import React, { memo } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import { ListIcon, ListOrderedIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ListButton = memo(() => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: '无序列表',
      value: 'bullet',
      icon: ListIcon,
      isActive: () => editor?.isActive('bulletList'),
      onClick: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
      label: '有序列表',
      value: 'ordered',
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive('orderedList'),
      onClick: () => editor?.chain().focus().toggleOrderedList().run()
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, value, icon: Icon, isActive, onClick }) => (
          <button
            key={value}
            onClick={onClick}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              isActive() && 'bg-neutral-200/80'
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
