'use client';
import React, { FC, memo, PropsWithChildren, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog';
import { Id } from '../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';

interface RemoveDialogProps {
  documentId: Id<'documents'>;
}

const RemoveDialog: FC<PropsWithChildren<RemoveDialogProps>> = memo(
  ({ documentId, children }) => {
    const remove = useMutation(api.documents.removeById);
    const [isRemoving, setIsRemoving] = useState(false);

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent onClick={e => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>你确定要删除文档吗？</AlertDialogTitle>
            <AlertDialogDescription>
              这将永久删除文档，无法恢复。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              disabled={isRemoving}
              onClick={e => {
                e.stopPropagation();
                setIsRemoving(true);
                remove({ id: documentId })
                  .then(() => {
                    toast.success('删除成功');
                  })
                  .catch((err: ConvexError<'documents'>) =>
                    toast.error(err.data)
                  )
                  .finally(() => {
                    setIsRemoving(false);
                  });
              }}
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

export default RemoveDialog;
