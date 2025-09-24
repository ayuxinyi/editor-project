import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVertical,
  TrashIcon
} from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import RemoveDialog from '@/components/remove-dialog';
import RenameDialog from '@/components/rename-dialog';

interface DocumentMenuProps {
  documentId: Id<'documents'>;
  title: string;
  onNewTab: (id: Id<'documents'>) => void;
}

const DocumentMenu = memo(
  ({ documentId, title, onNewTab }: DocumentMenuProps) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <RenameDialog documentId={documentId} initialTitle={title ?? ''}>
            <DropdownMenuItem
              onSelect={e => e.preventDefault()}
              onClick={e => e.stopPropagation()}
            >
              <FilePenIcon className="size-4 mr-2" />
              重命名
            </DropdownMenuItem>
          </RenameDialog>
          <RemoveDialog documentId={documentId}>
            <DropdownMenuItem
              onSelect={e => e.preventDefault()}
              onClick={e => e.stopPropagation()}
            >
              <TrashIcon className="size-4 mr-2" />
              删除
            </DropdownMenuItem>
          </RemoveDialog>
          <DropdownMenuItem onClick={() => onNewTab(documentId)}>
            <ExternalLinkIcon className="size-4 mr-2" />
            新标签页打开
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

export default DocumentMenu;
