import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";

export default memo(function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link href="/documents/321">
        <span className="text-blue-500 underline">跳转到document页面</span>
      </Link>
      <Button variant={"default"}>Click Me</Button>
      <p>Hello world</p>
    </div>
  );
});
