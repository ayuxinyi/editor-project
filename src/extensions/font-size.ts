import '@tiptap/extension-text-style';

import { Extension } from '@tiptap/react';

// 定义扩展插件的类型
declare module '@tiptap/core' {
  // 定义扩展插件的命令类型
  interface Commands<ReturnType> {
    // 插件名称
    fontSize: {
      // 设置字体大小
      setFontSize: (size: string) => ReturnType;
      // 取消字体大小设置
      unsetFontSize: () => ReturnType;
    };
  }
}

interface FontSizeOptions {
  /**
   * The types where the font size attribute can be applied.
   * @default ['textStyle']
   * @example ['textStyle']
   */
  types: string[];
}

export const FontSizeExtension = Extension.create<FontSizeOptions>({
  name: 'fontSize', // 插件名称
  // 插件选项
  addOptions() {
    return {
      types: ['textStyle'] // 插件应用的节点类型
    };
  },
  // 插件全局属性
  addGlobalAttributes() {
    return [
      {
        types: this.options.types, // 插件应用的节点类型
        // 插件全局属性
        attributes: {
          // 字体大小，该属性可以通过editor实例的getAttributes方法获取
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize || null,
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`
              };
            }
          }
        }
      }
    ];
  },

  // 配置插件命令
  addCommands() {
    return {
      // 设置字体大小
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },
      // 取消字体大小设置
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark('textStyle', { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        }
    };
  }
});
