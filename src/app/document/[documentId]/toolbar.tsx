'use client';
import { Separator } from '@/components/ui/separator';
import {
  AlignButton,
  FontFamilyButton,
  FontSizeButton,
  HeadingLevelButton,
  ListButton,
  HighLightColorButton,
  ImageButton,
  LinkButton,
  TextColorButton,
  LineHeightButton
} from '@/components/extensions';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/stores/use-editor-store';
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
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
  icon: Icon,
  label
}: ToolSectionType) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            'cursor-pointer text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
            isActive && 'bg-neutral-200/80'
          )}
        >
          <Icon className="size-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{label}</span>
      </TooltipContent>
    </Tooltip>
  );
};

const ToolBar = memo(() => {
  const { editor } = useEditorStore();

  const sections: ToolSectionType[][] = [
    [
      {
        label: '撤销',
        icon: Undo2Icon,
        onClick: () => editor?.chain().undo().run()
      },
      {
        label: '重做',
        icon: Redo2Icon,
        onClick: () => editor?.chain().redo().run()
      },
      {
        label: '打印',
        icon: PrinterIcon,
        onClick: () => window.print()
      },
      {
        label: '拼写检查',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck');
          editor?.view.dom.setAttribute(
            'spellcheck',
            current === 'true' ? 'false' : 'true'
          );
        }
      }
    ],
    [
      {
        label: '粗体',
        icon: BoldIcon,
        // 检查当前是否为粗体
        isActive: editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run()
      },
      {
        label: '斜体',
        icon: ItalicIcon,
        // 检查当前是否为斜体
        isActive: editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run()
      },
      {
        label: '下划线',
        icon: UnderlineIcon,
        // 检查当前是否为下划线
        isActive: editor?.isActive('underline'),
        onClick: () => editor?.chain().focus().toggleUnderline().run()
      }
    ],
    [
      {
        label: '评论',
        icon: MessageSquarePlusIcon,
        // @ts-expect-error 类型“ChainedCommands”上不存在属性“addPendingComment”。
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive('liveblocksCommentMark')
      },
      {
        label: '列表',
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        // 检查当前是否为列表
        isActive: editor?.isActive('taskList')
      },
      {
        label: '格式化',
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run()
      }
    ]
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map(item => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6! bg-neutral-300" />
      {/* Font family */}
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6! bg-neutral-300" />
      {/* Heading */}
      <Separator orientation="vertical" className="h-6! bg-neutral-300" />
      {/* Font size */}
      <FontSizeButton />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6! bg-neutral-300" />
      {sections[1].map(item => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6! bg-neutral-300" />
      {/* Text color */}
      <TextColorButton />
      <Separator orientation="vertical" className="h-6! bg-neutral-300" />
      {/* Highlight color */}
      <HighLightColorButton />
      <Separator orientation="vertical" className="h-6! bg-neutral-300" />
      {/* Link */}
      <LinkButton />
      {/* Image */}
      <ImageButton />
      {/* Align */}
      <AlignButton />
      {/* Line height */}
      <LineHeightButton />
      {/* List */}
      <ListButton />
      {sections[2].map(item => (
        <ToolBarButton key={item.label} {...item} />
      ))}
    </div>
  );
});

export default ToolBar;
