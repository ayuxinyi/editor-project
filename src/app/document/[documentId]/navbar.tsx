'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';
import DocumentInput from './document-input';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSubTrigger,
  MenubarSub,
  MenubarSubContent
} from '@/components/ui/menubar';
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon
} from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import { useEditorStore } from '@/stores/use-editor-store';
import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react';
import Avatars from './avatars';
import Inbox from './inbox';
import { Doc } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import RemoveDialog from '@/components/remove-dialog';
import RenameDialog from '@/components/rename-dialog';

interface NavbarProps {
  data: Doc<'documents'>;
}

const Navbar = memo(({ data }: NavbarProps) => {
  const { editor } = useEditorStore();
  const router = useRouter();

  const mutation = useMutation(api.documents.create);

  const onNewDocument = () => {
    mutation({ title: 'Untitled Document', initialContent: '' })
      .then(id => {
        toast.success('文档创建成功');
        router.push(`/document/${id}`);
      })
      .catch(() => {
        toast.error('文档创建失败');
      });
  };

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const FileDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJson = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json'
    });
    FileDownload(blob, `${data.title}.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: 'text/html'
    });
    FileDownload(blob, `${data.title}.html`);
  };

  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([JSON.stringify(content)], {
      type: 'text/plain'
    });
    FileDownload(blob, `${data.title}.txt`);
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          {/* DOcumentInput */}
          <DocumentInput title={data.title} id={data._id} />
          {/* MenuBar */}
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  文件
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => onSaveJson()}>
                        <FileJsonIcon className="size-4" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={() => onSaveHTML()}>
                        <GlobeIcon className="size-4" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="size-4" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={() => onSaveText()}>
                        <FileTextIcon className="size-4" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={onNewDocument}>
                    <FilePlusIcon className="size-4" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                    <MenubarItem
                      onSelect={e => {
                        e.preventDefault();
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      <FilePenIcon className="size-4" />
                      Rename
                    </MenubarItem>
                  </RenameDialog>
                  <RemoveDialog documentId={data._id}>
                    <MenubarItem
                      onSelect={e => {
                        e.preventDefault();
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      <TrashIcon className="size-4" />
                      Remove
                    </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4" />
                    Print<MenubarShortcut>Ctrl+P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className="size-4" />
                    Undo<MenubarShortcut>Ctrl+Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className="size-4" />
                    Redo<MenubarShortcut>Ctrl+Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => insertTable({ cols: 1, rows: 1 })}
                      >
                        1 x 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 2, cols: 2 })}
                      >
                        2 x 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 3, cols: 3 })}
                      >
                        3 x 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 4, cols: 4 })}
                      >
                        4 x 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className="size-4" />
                        Bold<MenubarShortcut>Ctrl+B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className="size-4" />
                        Italic<MenubarShortcut>Ctrl+I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className="size-4" />
                        Underline<MenubarShortcut>Ctrl+U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className="size-4" />
                        <span>Strikethrough &nbsp;&nbsp;</span>
                        <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="size-4" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center pl-6">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          // 这可以确保我们每次创建组织、退出组织、选择组织或个人后都回到首页，从而刷新我们的jwt令牌
          // 创建组织后回到首页
          afterCreateOrganizationUrl="/"
          // 退出组织后回到首页
          afterLeaveOrganizationUrl="/"
          // 选择组织或个人后回到首页
          afterSelectOrganizationUrl="/"
          // 选择个人后回到首页
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
});

export default Navbar;
