import { query } from './_generated/server';

export const get = query({
  // 定义查询处理函数，接收Convex上下文参数
  handler: async ctx => {
    // 查询documents表中的所有文档数据并返回结果集合
    // 使用ctx.db.query()方法查询指定表
    // collect()方法用于获取查询结果的完整集合
    return await ctx.db.query('documents').collect();
  }
});
