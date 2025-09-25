import React, { ChangeEvent, FormEvent, memo, useRef, useState } from 'react';
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
import { Id } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';
import { useStatus } from '@liveblocks/react/suspense';
import { LoaderIcon } from 'lucide-react';

interface DocumentInputProps {
  title: string;
  id: Id<'documents'>;
}

const DocumentInput = memo(({ title, id }: DocumentInputProps) => {
  const status = useStatus();

  const [value, setValue] = useState(title);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const mutate = useMutation(api.documents.updateById);

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;
    setIsPending(true);
    mutate({ id, title: newValue })
      .then(() => {
        toast.success('文档名称更新成功');
      })
      .catch(() => {
        toast.error('文档名称更新失败');
      })
      .finally(() => {
        setIsPending(false);
      });
  });

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.target.value;
    setValue(newValue);
    // 防抖更新
    debounceUpdate(newValue);
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (value === title) return;
    setIsPending(true);
    mutate({ id, title: value })
      .then(() => {
        toast.success('文档名称更新成功');
        setIsEditing(false);
      })
      .catch(() => {
        toast.error('文档名称更新失败');
        setIsError(true);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const showLoader =
    isPending || status === 'connecting' || status === 'reconnecting';
  const showError = isError || status === 'disconnected';

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form className="relative w-fit max-w-[50ch]" onSubmit={handleSubmit}>
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || ''}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4 text-red-500" />}
      {!showError && !showLoader && <BsCloudCheck />}
      {showLoader && (
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
});

export default DocumentInput;
