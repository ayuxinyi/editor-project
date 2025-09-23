import '@tiptap/extension-text-style';

import { Extension } from '@tiptap/react';

// 定义扩展插件的类型
declare module '@tiptap/core' {
  // 定义扩展插件的命令类型
  interface Commands<ReturnType> {
    // 插件名称
    lineHeight: {
      // 设置行高
      setLineHeight: (lineHeight: string) => ReturnType;
      // 取消行高设置
      unsetLineHeight: () => ReturnType;
    };
  }
}

interface LineHeightOptions {
  /**
   * The types where the text align attribute can be applied.
   * @default []
   * @example ['heading', 'paragraph']
   */
  types: string[];
  /**
   * The default alignment.
   * @default normal
   * @example 'normal'
   */
  defaultLineHeight: string;
}

export const LineHeightExtension = Extension.create<LineHeightOptions>({
  name: 'lineHeight', // 插件名称
  // 插件选项
  addOptions() {
    return {
      types: ['paragraph', 'heading'], // 插件应用的节点类型
      defaultLineHeight: 'normal'
    };
  },
  // 插件全局属性
  addGlobalAttributes() {
    return [
      {
        types: this.options.types, // 插件应用的节点类型
        // 插件全局属性
        attributes: {
          // 行高，该属性可以通过editor实例的getAttributes方法获取
          lineHeight: {
            // 默认值
            default: this.options.defaultLineHeight,
            parseHTML: element =>
              element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML: attributes => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`
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
      // 设置行高
      setLineHeight:
        (lineHeight: string) =>
        ({ tr, state, dispatch }) => {
          // 获取当前选中范围
          const { selection } = state;
          // 设置选中范围
          tr = tr.setSelection(selection);
          // 遍历选中范围的节点，从中获取起始位置和结束位置
          const { from, to } = selection;
          // 遍历起始位置和结束位置之间的节点，设置行高
          state.doc.nodesBetween(from, to, (node, pos) => {
            // 如果节点的类型是字段或者heading，设置行高
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight
              });
            }
          });
          if (dispatch) dispatch(tr);
          return true;
        },
      // 取消行高设置
      unsetLineHeight:
        () =>
        ({ tr, dispatch, state }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);
          const { from, to } = selection;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight: this.options.defaultLineHeight
              });
            }
          });
          if (dispatch) dispatch(tr);
          return true;
        }
    };
  }
});
