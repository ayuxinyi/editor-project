import { parseAsString, useQueryState } from 'nuqs';

export function useSearchParam(key: string) {
  // 通过useQueryState可以将我们定义的搜素参数拼接到url后面，类似于home?search=xxx
  return useQueryState(
    key,
    parseAsString.withDefault('').withOptions({ clearOnDefault: true })
  );
}
