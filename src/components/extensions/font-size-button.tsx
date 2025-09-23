import { useEditorStore } from '@/stores/use-editor-store';
import { MinusIcon, PlusIcon } from 'lucide-react';
import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';

export const FontSizeButton = memo(() => {
  const { editor } = useEditorStore();

  // 获取当前字体大小
  const currentFontSize = editor?.getAttributes('textStyle')?.fontSize
    ? editor.getAttributes('textStyle').fontSize.replace('px', '')
    : '16';

  // 记录字体大小
  const [fontSize, setFontSize] = useState(currentFontSize);
  // 记录输入框中的字体大小
  const [inputValue, setInputValue] = useState(fontSize);
  // 记录是否正在编辑字体大小
  const [isEditing, setIsEditing] = useState(false);

  // 更新字体大小
  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize, 10);
    if (!isNaN(size) && size > 0) {
      // 更新编辑器中选中的文本的字体大小
      editor?.chain().focus().setFontSize(`${size}px`).run();
      // 更新字体大小状态
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  // 处理输入框中的字体大小变化
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
  };

  // 处理输入框失去焦点时，更新字体大小
  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  // 处理输入框中的键盘事件
  const handleKeyDown = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      updateFontSize(inputValue);
      // 失去焦点后，将焦点重新设置到编辑器中
      editor?.commands?.focus();
    }
  };

  // 增加字体大小
  const increment = () => {
    const newSize = parseInt(fontSize, 10) + 1;
    updateFontSize(newSize.toString());
  };

  // 减少字体大小
  const decrement = () => {
    const newSize = parseInt(fontSize, 10) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
        onClick={decrement}
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          className="h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent focus:outline-none focus:right-0"
          autoFocus
          value={inputValue}
          placeholder="请输入字体大小"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <button
          className="h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm hover:bg-neutral-200/80 cursor-pointer"
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
        >
          {currentFontSize}
        </button>
      )}
      <button
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
        onClick={increment}
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
});
