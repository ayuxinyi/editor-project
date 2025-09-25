'use client';
import React, { memo } from 'react';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TableKit } from '@tiptap/extension-table';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import { useEditorStore } from '@/stores/use-editor-store';
import { TextStyle, FontFamily, Color } from '@tiptap/extension-text-style';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { FontSizeExtension, LineHeightExtension } from '@/extensions';
import Ruler from './ruler';
import { Threads } from './threads';
import { useStorage } from '@liveblocks/react/suspense';

// 在Next.js中，默认所有组件都是服务器组件，如果想要在客户端使用Tiptap，需要将组件标记为"use client"
// 这将告诉Next.js将该组件渲染为客户端组件，而不是服务器组件

const Editor = memo(() => {
  // 通过zustand store提供的setEditor方法，将editor实例设置到store中
  const { setEditor } = useEditorStore();

  // 从存储中获取文档的左侧和右侧边距
  const leftMargin = useStorage(root => root.leftMargin);
  const rightMargin = useStorage(root => root.rightMargin);

  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    // 当editor实例创建时，将其设置到store中
    onCreate: ({ editor }) => setEditor(editor),
    // 当editor实例销毁时，将store中的editor实例设置为null
    onDestroy: () => setEditor(null),
    // 当editor实例更新时，将其设置到store中
    onUpdate: ({ editor }) => setEditor(editor),
    // 当editor实例的selection更新时，将其设置到store中
    onSelectionUpdate: ({ editor }) => setEditor(editor),
    // 当editor实例获得焦点时，将其设置到store中
    onFocus: ({ editor }) => setEditor(editor),
    // 当editor实例失去焦点时，将其设置到store中
    onBlur: ({ editor }) => setEditor(editor),
    // 当editor实例的content内容发生错误时，将其设置到store中
    onContentError: ({ editor }) => setEditor(editor),
    // 当editor实例的执行事务时，将其设置到store中
    onTransaction: ({ editor }) => setEditor(editor),
    editorProps: {
      attributes: {
        style: `padding-left:${leftMargin ?? 56}px;padding-right:${
          rightMargin ?? 56
        }px;`,
        class:
          'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text'
      }
    },
    extensions: [
      liveblocks as unknown as Extension,
      StarterKit,
      Heading,
      TaskList,
      TaskItem.configure({
        nested: true
      }),
      TableKit.configure({
        table: { resizable: true }
      }),
      Image,
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({
        // 开启多颜色高亮
        multicolor: true
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      FontSizeExtension,
      LineHeightExtension,
      ImageResize
    ],
    content: '',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false
  });

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
});

export default Editor;
