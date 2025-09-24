'use client';
import { ReactNode } from 'react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ClerkProvider, useAuth, SignIn } from '@clerk/clerk-react';
import {
  ConvexReactClient,
  // 通过身份验证
  Authenticated,
  // 未通过身份验证
  Unauthenticated,
  // 身份验证中
  AuthLoading
} from 'convex/react';
import { zhCN } from '@clerk/localizations';
import FullscreenLoader from '@/components/fullscreen-loader';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// 提供 Convex 客户端上下文
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      localization={zhCN}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-screen">
            {/* 登录组件 */}
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullscreenLoader label="身份验证中" />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
