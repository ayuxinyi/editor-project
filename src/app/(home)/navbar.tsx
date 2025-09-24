import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';
import SearchInput from './search-input';
import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react';

const NavBar = memo(() => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <div className="flex gap-3 items-center pl-6">
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

export default NavBar;
