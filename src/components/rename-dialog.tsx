'use client';
import { FC, FormEvent, memo, PropsWithChildren, useState } from 'react';

import { Id } from '../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface RenameDialogProps {
  documentId: Id<'documents'>;
  initialTitle: string;
}

const RenameDialog: FC<PropsWithChildren<RenameDialogProps>> = memo(
  ({ documentId, initialTitle, children }) => {
    const update = useMutation(api.documents.updateById);
    const [isUpdating, setIsUpdating] = useState(false);

    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);

    const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      setIsUpdating(true);
      update({ id: documentId, title: title.trim() || '未命名' })
        .then(() => setOpen(false))
        .finally(() => {
          setIsUpdating(false);
        });
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent onClick={e => e.stopPropagation()}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>重命名文档</DialogTitle>
              <DialogDescription>请输入新的文档名称</DialogDescription>
            </DialogHeader>
            <div className="my-4">
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="请输入文档名称"
                onClick={e => e.stopPropagation()}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={e => {
                  e.stopPropagation();
                  setOpen(false);
                }}
              >
                取消
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                onClick={e => e.stopPropagation()}
              >
                保存
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);

export default RenameDialog;
