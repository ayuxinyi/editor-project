'use client';
import React, { memo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TableKit } from '@tiptap/extension-table';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';

// 在Next.js中，默认所有组件都是服务器组件，如果想要在客户端使用Tiptap，需要将组件标记为"use client"
// 这将告诉Next.js将该组件渲染为客户端组件，而不是服务器组件

const Editor = memo(() => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: 'padding-left:56px;padding-right:56px;',
        class:
          'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text'
      }
    },
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true
      }),
      TableKit.configure({
        table: { resizable: true }
      }),
      ImageResize,
      Image
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false
  });

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
});

export default Editor;
