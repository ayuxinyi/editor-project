'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParam } from '@/hooks/use-search-param';
import { SearchIcon, XIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, memo, useRef, useState } from 'react';

const SearchInput = memo(() => {
  const [value, setValue] = useState<string>('');
  const [search, setSearch] = useSearchParam('search');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  const handleClear = () => {
    setValue('');
    setSearch('');
    inputRef.current?.blur();
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          placeholder="搜索..."
          value={value}
          onChange={handleChange}
          ref={inputRef}
          className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus-visible:bg-white"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full cursor-pointer"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full cursor-pointer"
            onClick={handleClear}
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
});

export default SearchInput;
