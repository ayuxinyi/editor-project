import { type Editor } from '@tiptap/react';
import { create } from 'zustand';

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

// 通过zustand提供的create函数创建一个zustand store，其中set函数用于更新store中的状态
// 导出useEditorStore，其他组件可以通过useEditorStore来访问和更新editor状态
export const useEditorStore = create<EditorState>(set => ({
  editor: null, // 初始时editor为null
  setEditor: editor => set({ editor }) // 定义setEditor方法，用于更新editor状态
}));
